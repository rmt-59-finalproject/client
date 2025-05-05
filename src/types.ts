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
  driver: {
    _id: string;
    username: string;
    name: string;
    role: string;
  };
  outlet: {
    _id: string;
    username: string;
    name: string;
    role: string;
  };
  status:
    | "requested"
    | "approved"
    | "in_transit"
    | "delivered"
    | "completed"
    | "rejected";
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
  | "required"
  | "approved"
  | "in_transit"
  | "delivered"
  | "completed"
  | "rejected";
