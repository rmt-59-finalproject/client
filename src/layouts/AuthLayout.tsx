// import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { Outlet } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function AuthLayout() {
  useEffect(() => {
    guardLogin();
  }, []);
  function guardLogin() {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      console.log("Token di localstorage tidak ada");
    }
  }
  return (
    <>
      <div className="font-[family-name:Space_Mono]  flex flex-col min-h-dvh w-full">
        <SidebarProvider>
          {/* sidebar */}
          <AppSidebar />
          <SidebarInset>
            {/* trigger sidebar */}
            <SidebarTrigger className="-ml-1" />
            {/* page */}
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  );
}
