export type InventoryItem = {
  id: number;
  name: string;
  category: string;
  stock: number;
  unit: string;
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
