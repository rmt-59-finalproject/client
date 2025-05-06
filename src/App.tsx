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
import AllRequestOutlet from "./pages/outlet/AllRequestOutlet";
import SummaryStatusPageDriver from "./pages/driver/SummaryStatusPageDriver";
import SummaryStatusPageOutlet from "./pages/outlet/SummaryStatusPageOutlet";
import { AnimationProvider } from "./contexts/animation-context";
import InventoryPage from "./pages/warehouse/inventory/InventoryPage";

const App = () => {
  return (
    <BrowserRouter>
      <AnimationProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<AuthLayout />}>
            {/* desain layout dengan navbar + sesudah dapat auth */}
            {/* WAREHOUSE ROUTE */}
            <Route path="/warehouse/dashboard" element={<DashboardPage />} />
            <Route path="/warehouse/register" element={<RegisterPage />} />
            <Route path="/warehouse/drivers" element={<DriverPage />} />
            <Route path="/warehouse/outlets" element={<OutletPage />} />
            <Route path="/warehouse/orders" element={<AllOrderPage />} />
            <Route path="/warehouse/assign" element={<AssignOrderPage />} />
            <Route path="/warehouse/request-order" element={<CreateOrderPage />} />
            <Route path="/warehouse/inventories" element={<InventoryPage />} />
            
            {/* DRIVER ROUTE */}
            <Route path="/driver/home" element={<LandingPageDriver />} />
            <Route path="/driver/orders" element={<AllOrderDriver />} />
            <Route
              path="/status-driver/:orderId"
              element={<SummaryStatusPageDriver />}
            />
            <Route
              path="/verify-driver/:orderId"
              element={<VerifyOrderDriver />}
            />
            {/* OUTLET ROUTE */}
            <Route path="/outlet" element={<LandingPageOutlet />} />
            <Route path="/summary-order" element={<SummaryOrderPage />} />
            <Route path="/outlet-orders" element={<AllRequestOutlet />} />
            <Route
              path="/status-outlet/:orderId"
              element={<SummaryStatusPageOutlet />}
            />
            <Route
              path="/verify-outlet/:orderId"
              element={<VerifyOrderOutlet />}
            />
            <Route path="/orders/:orderId" element={<DetailOrderPage />} />
          </Route>
          {/* PUBLIC ROUTE */}
          {/* desain layout tanpa navbar + sebelum dapat auth */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Toaster />
      </AnimationProvider>
    </BrowserRouter>
  );
};

export default App;
