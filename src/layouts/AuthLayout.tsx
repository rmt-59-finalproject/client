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
    <div className="flex flex-col bg-gray-200 min-h-dvh w-full">
      <SidebarProvider>
        {/* sidebar */}
        <AppSidebar />
        <SidebarInset>
          {/* trigger sidebar */}
          <header className="sticky bg-white top-0 z-50 p-3 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <SidebarTrigger />
          </header>

          {/* page */}
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
