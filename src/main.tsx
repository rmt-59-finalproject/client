// import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import DashboardPage from "./pages/DashboardPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import DriverPage from "./pages/DriverPage";
import OutletPage from "./pages/OutletPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import InventoryOrder from "./pages/InventoryOrder";
import SummaryOrderPage from "./pages/SummaryOrderPage";
import DetailOrderPage from "./pages/DetailOrderPage";
import AllOrderPage from "./pages/AllOrderPage";

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
        <Route path="/summary-order" element={<SummaryOrderPage />} />
        <Route path="/orders" element={<AllOrderPage />} />
        <Route path="/orders/:orderId" element={<DetailOrderPage />} />
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
