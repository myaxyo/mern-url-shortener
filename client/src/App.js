import React from "react";
import "./App.css";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import "materialize-css";
import { Loader } from "./components/Loader";

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthed = !!token;
  const routes = useRoutes(isAuthed);
  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthed,
      }}
    >
      <Router>
        {isAuthed && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
