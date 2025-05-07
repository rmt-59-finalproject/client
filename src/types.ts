import { LucideProps } from "lucide-react";
import { Statistics } from "./components/CardDriverAndOutlet";

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
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checkedByDriver: boolean;
  driverCheckTime: string | null;
  checkedByOutlet: boolean;
  outletCheckTime: string | null;
};

export interface OrderType {
  _id: string;
  orderId: string;
  driver: {
    _id: string;
    username: string;
    name: string;
    role: "driver";
  };
  outlet: {
    _id: string;
    username: string;
    name: string;
    role: "outlet";
  };
  status: OrderStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
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
  | "requested"
  | "approved"
  | "delivery"
  | "completed"
  | "rejected";

export type UserType = {
  _id?: string;
  username: string;
  name: string;
  role: string;
  statistics?: Statistics;
};
