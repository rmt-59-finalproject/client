import { CardOrderComponent } from "@/components/CardOrder";
import { Button } from "@/components/ui/button";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function LandingPageDriver() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const uri = `/driver/orders`;
      const data = await http.get(uri, {
        params: {
          status: "approved",
        },
      });

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
                Let's get productive today!
              </h1>
              <Button onClick={() => navigate("/driver/orders")}>
                All Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
        {orderData.length > 0 ? (
          // ADA ORDERAN
          <div className="flex flex-col gap-8">
            {orderData?.map((el) => {
              return (
                <CardOrderComponent
                  key={el._id}
                  el={el}
                  nameButton={"Check Order"}
                  click={() => navigate(`/driver/verify/${el?._id}`)}
                />
              );
            })}
          </div>
        ) : (
          // GAADA ORDERAN
          <div className="min-h-20 opacity-70 flex justify-center items-center">
            <h1>Okay, enough for today!</h1>
          </div>
        )}
      </div>
    </div>
  );
}
