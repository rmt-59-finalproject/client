import { CardOrderComponent } from "@/components/CardOrder";
import { FilterLandingOutlet } from "@/components/FilterLandingOutlet";
import { Button } from "@/components/ui/button";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function LandingPageOutlet() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [filter, setFilter] = useState("requested");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [filter]);
  async function fetchData() {
    try {
      const uri = `/outlet/orders?status=${filter}`; //requested atau deliverY
      const data = await http.get(uri, {
        withCredentials: true,
      });
      console.log(data.data);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="font-[family-name:Montserrat] bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex flex-col justify-start items-center min-h-screen w-full ">
      <div className="flex flex-col max-w-6xl justify-center items-center w-full">
        <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold">
              Welcome {sessionStorage.getItem("name")}!
            </h1>
            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="text-lg opacity-70">
                Let's get some things done today!
              </h1>
              <Button onClick={() => navigate("/outlet/orders")}>
                All Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <FilterLandingOutlet setFilter={(val) => setFilter(val)} />
      </div>
      <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
        {orderData.length > 0 ? (
          // ADA ORDERAN
          <div className="flex flex-col gap-2">
            {orderData?.map((el) => {
              return (
                <CardOrderComponent
                  key={el._id}
                  click={
                    filter !== "delivery"
                      ? () => navigate(`/outlet/orders/${el._id}`)
                      : () => navigate(`/outlet/verify/${el._id}`)
                  }
                  nameButton={
                    filter !== "delivery" ? "Order Detail" : "Check Order Item"
                  }
                  el={el}
                />
              );
            })}
          </div>
        ) : (
          // GAADA ORDERAN
          <div className="min-h-20 opacity-70 flex justify-center items-center">
            <h1>Okay, enough for today</h1>
          </div>
        )}
      </div>
    </div>
  );
}
