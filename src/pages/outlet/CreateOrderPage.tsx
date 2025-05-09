import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { http } from "@/helpers/axios";
import { InventoryItem, OrderItem } from "@/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

// ini adalah halaman request order dari outlet
export default function CreateOrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [inventories, setInventories] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const summaryOrderItems = location.state;

  useEffect(() => {
    handleOrderStateBeforeSummary();
    fetchInventories();
  }, [search]);

  async function fetchInventories() {
    try {
      const data = await http.get(`/inventory?search=${search}`, {
        withCredentials: true,
      });
      console.log(data.data.products);
      const inventoryJson = data.data.products;
      console.log(inventoryJson);

      setInventories(inventoryJson);
    } catch (error) {
      console.log(error);
    }
  }
  function handleOrderStateBeforeSummary() {
    if (summaryOrderItems) {
      console.log(summaryOrderItems, "<-- stateOrderFromSummaryPage");
      setOrderItems(summaryOrderItems);
    }
  }

  function handleAdd(item: InventoryItem) {
    setOrderItems((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }
  function handleQuantityChange(_id: string, qty: string) {
    setOrderItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity: parseInt(qty || "0") } : item
      )
    );
  }
  function handleRemove(_id: string) {
    setOrderItems((prev) => prev.filter((item) => item._id !== _id));
  }

  function totalOrder() {
    console.log(orderItems, "<--- totalOrder");
    navigate("/outlet/summary-order", { state: orderItems });
  }

  return (
    <div className="bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] font-[family-name:Montserrat] flex flex-col justify-start items-center min-h-screen w-full ">
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
        <h1>Inventories</h1>
        <Input onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ScrollArea className="h-80 max-w-6xl w-full">
        <div className="p-5 w-full flex flex-col gap-2">
          {inventories.map((item) => {
            return (
              <Card key={item._id} className="w-full">
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
                    <Button onClick={() => handleAdd(item)}>Add Order</Button>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/*  */}
      <div className="p-5 flex max-w-6xl flex-col justify-center items-start w-full">
        <h1 className="text-2xl font-bold">Item Order</h1>
      </div>

      {/*  */}
      {orderItems.length > 0 && (
        <div className="w-full max-w-6xl">
          <div className="p-5 w-full flex flex-col gap-2">
            {orderItems.map((item) => (
              <Card key={item._id} className="w-full">
                <div className="flex flex-row justify-between items-center">
                  <CardContent className="flex flex-col">
                    <h1 className="font-bold">{item.name}</h1>
                    <div>
                      <label className="text-sm text-gray-600">Quantity</label>
                      <Input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item._id, e.target.value)
                        }
                        className="w-20 border rounded px-2 py-1 text-center mt-1"
                      />
                    </div>
                  </CardContent>
                  <CardContent>
                    <Button onClick={() => handleRemove(item._id)}>
                      Remove
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {orderItems.length === 0 && (
        <>
          <div className="flex flex-row justify-center items-center p-5 w-full">
            <h1>Your bag is empty</h1>
          </div>
        </>
      )}
      <div className="pb-5 w-full bottom-4 flex justify-center items-center left-0 right-0 px-4">
        <Button
          onClick={totalOrder}
          disabled={orderItems.length === 0 && true}
          className="w-full max-w-6xl"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
}
