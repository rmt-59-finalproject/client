import { ComponentProps, useEffect } from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LogOut,
  LayoutDashboard,
  Car,
  Store,
  ScrollText,
  Boxes,
  Ambulance,
  UserPlus,
  SquareTerminal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router";
import { NavType } from "@/types";
import stockifyLogoLite from "../assets/stockify.png";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { http } from "@/helpers/axios";
import { toast } from "sonner";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  let navMain: NavType[] = [];

  if (role === "warehouse") {
    navMain = [
      {
        title: "Dashboard",
        url: "/warehouse/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Drivers",
        url: "/warehouse/drivers",
        icon: Car,
        isActive: true,
      },
      {
        title: "Outlets",
        url: "/warehouse/outlets",
        icon: Store,
        isActive: true,
      },
      {
        title: "Orders",
        url: "/warehouse/orders",
        icon: ScrollText,
        isActive: true,
      },
      {
        title: "Inventory",
        url: "/warehouse/inventory",
        icon: Boxes,
        isActive: true,
      },
      {
        title: "Assign Order",
        url: "/warehouse/assign",
        icon: Ambulance,
        isActive: true,
      },
      {
        title: "User",
        url: "/warehouse/register",
        icon: UserPlus,
        isActive: true,
      },
    ];
  } else if (role === "driver") {
    navMain = [
      {
        title: "Home",
        url: "/driver",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "All Order History",
        url: "/driver-orders",
        icon: SquareTerminal,
        isActive: true,
      },
    ];
  } else if (role === "outlet") {
    navMain = [
      {
        title: "Home",
        url: "/outlet",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Request Order",
        url: "/request-order",
        icon: SquareTerminal,
        isActive: true,
      },

      {
        title: "History Request Order",
        url: "/outlet-orders",
        icon: SquareTerminal,
        isActive: true,
      },
    ];
  }

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain,
  };

  const { state } = useSidebar();

  useEffect(() => console.log(state), [state]);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="font-[family-name:Montserrat]"
    >
      <SidebarHeader>
        <div className="flex items-center justify-center">
          <img
            src={stockifyLogoLite}
            alt="stockify-logo-lite"
            className={cn(
              state === "expanded" ? "size-8 md:size-12" : "size-8",
              "flex aspect-square items-center justify-center rounded-base"
            )}
          />
          <p className="truncate text-sm md:text-3xl font-bold tracking-wide">
            Stockify
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* MENU */}
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive ? "group active" : "group"
                  }
                >
                  <SidebarMenuButton
                    className="hover:cursor-pointer group-[.active]:bg-main data-[state=open]:bg-main data-[state=open]:outline-border data-[state=open]:text-main-foreground md:text-base"
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    {item.title}
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-around items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png?size=40" alt="CN" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 mx-2 text-left text-sm md:text-base leading-tight">
            <span className="truncate font-heading">
              {sessionStorage.getItem("name")}
            </span>
            <span className="truncate text-xs md:text-sm">
              {sessionStorage.getItem("role")}
            </span>
          </div>
          <Button
            onClick={async () => {
              const { data } = await http.get("/logout");

              sessionStorage.clear();
              toast.success(data.message);

              navigate("/login");
            }}
            className={state === "expanded" ? "visible" : "hidden"}
          >
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
