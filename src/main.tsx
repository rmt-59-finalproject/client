// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import DashboardPage from "./pages/DashboardPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import { Toaster } from "./components/ui/sonner";
import DriverPage from "./pages/DriverPage";
import OutletPage from "./pages/OutletPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import InventoryOrder from "./pages/InventoryOrder";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //TODO: IMPLEMENT INDEX ROUTES
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        {/* desain layout dengan navbar + sesudah dapat auth */}

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/drivers" element={<DriverPage />} />
        <Route path="/outlets" element={<OutletPage />} />
        <Route path="/request-order" element={<CreateOrderPage />} />
        <Route path="/mockup" element={<InventoryOrder />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceDetailPage />} />
      </Route>

      {/* desain layout tanpa navbar + sebelum dapat auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
  // </StrictMode>,
);
