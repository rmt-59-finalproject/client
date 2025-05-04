import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import DashboardPage from "./pages/DashboardPage";
import DriverPage from "./pages/warehouse/DriverPage";
import OutletPage from "./pages/warehouse/OutletPage";
import CreateOrderPage from "./pages/outlet/CreateOrderPage";
import SummaryOrderPage from "./pages/outlet/SummaryOrderPage";
import AllOrderPage from "./pages/warehouse/AllOrderPage";
import AllOrderDriver from "./pages/driver/AllOrderDriver";
import DetailOrderPage from "./pages/warehouse/DetailOrderPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "sonner";
import AssignOrderPage from "./pages/warehouse/AssignOrderPage";
import VerifyOrderDriver from "./pages/driver/VerifyOrderDriver";
import LandingPageDriver from "./pages/driver/LandingPageDriver";
import LandingPageOutlet from "./pages/outlet/LandingPageOutlet";
import VerifyOrderOutlet from "./pages/outlet/VerifyOrderOutlet";
import OrderDetailStatusPage from "./pages/outlet/SummaryStatusPage";
import AllRequestOutlet from "./pages/outlet/AllRequestOutlet";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<AuthLayout />}>
          {/* desain layout dengan navbar + sesudah dapat auth */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/driver" element={<LandingPageDriver />} />
          <Route path="/outlet" element={<LandingPageOutlet />} />
          <Route path="/all-drivers" element={<DriverPage />} />
          <Route path="/all-outlets" element={<OutletPage />} />
          <Route path="/request-order" element={<CreateOrderPage />} />
          <Route path="/summary-order" element={<SummaryOrderPage />} />
          <Route path="/orders" element={<AllOrderPage />} />
          <Route path="/assign" element={<AssignOrderPage />} />
          <Route path="/driver-orders" element={<AllOrderDriver />} />
          <Route path="/outlet-orders" element={<AllRequestOutlet />} />
          <Route path="/orders/:orderId" element={<DetailOrderPage />} />
          <Route
            path="/status-order/:orderId"
            element={<OrderDetailStatusPage />}
          />
          <Route
            path="/verify-outlet/:orderId"
            element={<VerifyOrderOutlet />}
          />
          <Route
            path="/verify-driver/:orderId"
            element={<VerifyOrderDriver />}
          />
        </Route>

        {/* desain layout tanpa navbar + sebelum dapat auth */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
