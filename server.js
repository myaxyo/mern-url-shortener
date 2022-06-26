const express = require("express");
const createHttpErrors = require("http-errors");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json({ extended: true }));
const PORT = process.env.PORT || 3010;

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  }
  );
}


async function start() {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/base")
      .then(() => console.log("Database connected"));
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
