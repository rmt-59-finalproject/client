import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
type InventoryItem = {
  id: number;
  name: string;
  category: string;
  stock: number;
  unit: string;
};

type OrderItem = InventoryItem & {
  quantity: number;
};

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Premium Coffee Beans",
    category: "Food & Beverage",
    stock: 250,
    unit: "boxes",
  },
  {
    id: 2,
    name: "Organic Tea Assortment",
    category: "Food & Beverage",
    stock: 180,
    unit: "boxes",
  },
  {
    id: 3,
    name: "Ceramic Coffee Mugs",
    category: "Kitchenware",
    stock: 75,
    unit: "units",
  },
  {
    id: 4,
    name: "Coffee Filters",
    category: "Supplies",
    stock: 120,
    unit: "packs",
  },
  {
    id: 5,
    name: "Branded Tote Bags",
    category: "Merchandise",
    stock: 120,
    unit: "units",
  },
];

export default function CreateOrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  function handleAdd(item: InventoryItem) {
    setOrderItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }
  function handleQuantityChange(id: number, qty: string) {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(qty || "0") } : item
      )
    );
  }
  function handleRemove(id: number) {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  }

  function totalOrder() {
    console.log(orderItems);
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full ">
      <div className="flex flex-col max-w-6xl justify-center items-center w-full">
        <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Request Order</h1>
          </div>
          {/* <div className="flex gap-2">
            <Button>Create New Driver</Button>
          </div> */}
        </div>
        {/*  */}
      </div>
      <div className=" px-5 py-2.5 max-w-6xl font-bold text-lg w-full">
        <h1>Inventory</h1>
        <Input />
      </div>
      <ScrollArea className="h-80 max-w-6xl  w-full">
        <div className="p-5 w-full flex flex-col gap-2 min-h-screen">
          {initialInventory.map((item) => {
            return (
              <Card key={item.id} className="w-full">
                <div className="flex flex-row justify-between items-center">
                  <CardContent>
                    <div className="flex flex-col">
                      <h1 className="font-bold">{item.name}</h1>
                      <h1 className="text-[12px]">
                        {item.category} • In stock: {item.stock} {item.unit}
                      </h1>
                    </div>
                  </CardContent>
                  <CardContent>
                    <Button onClick={() => handleAdd(item)}>
                      Add to order
                    </Button>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/*  */}
      <div className="p-5 flex max-w-6xl flex-col justify-center items-start w-full">
        <h1 className="text-2xl font-bold">Order Items</h1>
      </div>

      {/*  */}
      {orderItems.length > 0 && (
        <div className="w-full max-w-6xl">
          <ScrollArea className="h-84 w-full ">
            <div className="p-5 w-full flex flex-col gap-2 min-h-screen">
              {orderItems.map((item) => (
                <Card key={item.id} className="w-full">
                  <div className="flex flex-row justify-between items-center">
                    <CardContent className="flex flex-col">
                      <h1 className="font-bold">{item.name}</h1>
                      <div>
                        <label className="text-sm text-gray-600">
                          Quantity
                        </label>
                        <Input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          className="w-20 border rounded px-2 py-1 text-center mt-1"
                        />
                      </div>
                    </CardContent>
                    <CardContent>
                      <Button onClick={() => handleRemove(item.id)}>
                        Remove
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      <div className="fixed bottom-4 flex justify-center items-center left-0 right-0 px-4">
        <Button onClick={totalOrder} className="w-full max-w-6xl">
          Review Order
        </Button>
      </div>
    </div>
  );
}
