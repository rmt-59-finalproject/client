import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Box, Store, Truck } from "lucide-react";
import { useNavigate } from "react-router";

export default function OnboardingPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-dvh bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')]">
      <div className="w-full">
        <Navbar />
        {/* Hero Section */}
        <section className="pt-40 pb-16 px-4 text-center ">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet, Stockify.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect warehouses, drivers, and outlets in one seamless platform
            </p>
            <Button onClick={() => navigate("/login")} size={"lg"}>
              Get Started <span className="ml-2">→</span>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Warehouse Management Card */}
              <Card>
                <CardContent>
                  <Box className="h-10 w-10 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    Warehouse Management
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Manage inventory, create orders, and track deliveries
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Order creation and assignmen
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Driver assignment
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Order status monitoring
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Driver Portal Card */}
              <Card>
                <CardContent>
                  <Truck className="h-10 w-10 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Driver Portal</h2>
                  <p className="text-gray-600 mb-6">
                    Manage deliveries and update order status
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      View assigned deliveries
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Confirm pickups and deliveries
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  {/* Outlet Management Card */}
                  <Store className="h-10 w-10 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Outlet Management</h2>
                  <p className="text-gray-600 mb-6">
                    Receive and verify incoming deliveries
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      View incoming deliveries
                    </li>

                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Cross-check delivery items
                    </li>

                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Accept or reject items
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      View order history
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Submit delivery confirmations
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-gray-500">
            <p>© 2025 Stockify. Semua hak dilindungi.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
