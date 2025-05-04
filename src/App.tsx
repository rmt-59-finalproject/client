import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import DashboardPage from "./pages/DashboardPage";
import DriverPage from "./pages/DriverPage";
import OutletPage from "./pages/OutletPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import SummaryOrderPage from "./pages/SummaryOrderPage";
import AllOrderPage from "./pages/AllOrderPage";
import AllOrderDriver from "./pages/AllOrderDriver";
import DetailOrderPage from "./pages/DetailOrderPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "sonner";
import AssignOrderPage from "./pages/AssignOrderPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<AuthLayout />}>
          {/* desain layout dengan navbar + sesudah dapat auth */}

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/driver" element={<DriverPage />} />
          <Route path="/outlet" element={<OutletPage />} />
          <Route path="/request-order" element={<CreateOrderPage />} />
          <Route path="/summary-order" element={<SummaryOrderPage />} />
          <Route path="/orders" element={<AllOrderPage />} />
          <Route path="/assign" element={<AssignOrderPage />} />
          <Route path="/driver-orders" element={<AllOrderDriver />} />
          <Route path="/orders/:orderId" element={<DetailOrderPage />} />
        </Route>

        {/* desain layout tanpa navbar + sebelum dapat auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
