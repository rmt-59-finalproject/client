import { LucideProps } from "lucide-react";

export type InventoryItem = {
  _id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = InventoryItem & {
  quantity: number;
};

export type ItemOrder = {
  productId: string;
  quantity: number;
  checkedByDriver: boolean;
  driverCheckTime: string | null;
  checkedByOutlet: boolean;
  outletCheckTime: string | null;
};

export interface OrderType {
  _id: string;
  status: "requested" | "approved" | "in_transit" | "delivered" | "completed";
  createdAt: string;
  updatedAt: string;
  driver: {
    _id: string;
    username: string;
    role: "driver";
  };
  outlet: {
    _id: string;
    username: string;
    role: "outlet";
  };
  items: ItemOrder[];
}

export type NavType = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
};

export type OrderStatus =
  | "required"
  | "approved"
  | "in_transit"
  | "delivered"
  | "completed";
