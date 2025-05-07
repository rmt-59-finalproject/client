import { CardOrderComponent } from "@/components/CardOrder";
import { FilterHistoryOrder } from "@/components/FilterHistoryOrder";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Ini adalah halaman All Order dari Outlet yang login
export default function AllRequestOutlet() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [filter, setFilter] = useState("requested");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [filter]);

  function navigateDetail(id: string) {
    navigate(`/orders/${id}`);
  }

  async function fetchData() {
    try {
      const uri = `/outlet/orders`;
      const data = await http.get(uri, {
        params: {
          status: filter,
        },
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
    <>
      <div className="bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] font-[family-name:Montserrat] flex flex-col justify-start items-center min-h-screen w-full ">
        <div className="flex flex-col max-w-6xl justify-center items-center w-full">
          <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
            <div className="flex flex-row w-full items-center justify-between">
              <h1 className="text-2xl font-bold">Histori Order</h1>
              <div className="p-5">
                <FilterHistoryOrder setFilter={setFilter} />
              </div>
            </div>
          </div>
        </div>

        <div className=" min-h-screen gap-2 flex flex-col p-4 max-w-6xl font-bold text-lg w-full">
          {orderData.length > 0 ? (
            // ADA ORDERAN
            <>
              {orderData.map((order) => {
                return (
                  <CardOrderComponent
                    // click={() => navigateVerifyOutlet(el._id)}
                    key={order._id}
                    nameButton={"Detail Order"}
                    el={order}
                    click={() => navigateDetail(order._id)}
                  />
                );
              })}
            </>
          ) : (
            // GAADA ORDERAN
            <>
              <div className="min-h-20 opacity-70 flex justify-center items-center">
                <h1>Ga ada orderan nih, santuy dulu aja...</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
