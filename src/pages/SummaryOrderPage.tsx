import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrderItem } from "@/types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function SummaryOrderPage() {
  const location = useLocation();
  let orderItems: OrderItem[] = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(orderItems, "<--- summaryPage");
  }, []);

  function submitOrder() {
    console.log(location.state, "submitOrderClicked");
  }

  function backEditOrder() {
    navigate("/request-order", { state: orderItems });
  }
  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full ">
      <div className="flex flex-col max-w-6xl justify-center items-center w-full">
        <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Summary Order</h1>
            <h1 className="text-lg opacity-50">
              Review your order before submitting
            </h1>
          </div>
          {/* <div className="flex gap-2">
              <Button>Create New Driver</Button>
            </div> */}
        </div>
        {/*  */}
        <div className="bg-blue-500 w-full p-5 max-w-6xl flex flex-col gap-2">
          {orderItems.map((item) => {
            return (
              <Card key={item.id} className="w-full">
                <div className="flex flex-row justify-between items-center">
                  <CardContent>
                    <div className="flex flex-col ">
                      <h1 className="font-bold">{item.name}</h1>
                      <h1 className="text-[12px]">
                        {item.category} • In stock: {item.stock} {item.unit}
                      </h1>
                    </div>
                  </CardContent>
                  <CardContent>
                    <h1>
                      <span className="font-bold text-2xl">
                        {item.quantity}
                      </span>{" "}
                      {item.unit}
                    </h1>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-4 flex flex-col gap-2 justify-center items-center left-0 right-0 px-4">
        <Button
          onClick={backEditOrder}
          variant={"neutral"}
          className="w-full max-w-6xl"
        >
          Back
        </Button>
        <Button onClick={submitOrder} className="w-full max-w-6xl">
          Review Order
        </Button>
      </div>
    </div>
  );
}
