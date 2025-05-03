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
