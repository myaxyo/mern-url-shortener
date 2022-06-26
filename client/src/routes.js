import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { LinksPage } from "./pages/LinksPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" exact element={<AuthPage />} />
      <Route path="/" element={<Navigate path="/" />} />
    </Routes>
  );
};
