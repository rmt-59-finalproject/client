// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import DashboardPage from "./pages/DashboardPage";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />}>
        {/* desain layout dengan navbar + sesudah dapat auth */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      {/* desain layout tanpa navbar + sebelum dapat auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>,
);
