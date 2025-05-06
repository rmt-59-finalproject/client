import { Navigate, Outlet } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function AuthLayout() {
  const role = sessionStorage.getItem("role");

  if (!role) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="flex flex-col bg-gray-200 min-h-dvh w-full">
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
