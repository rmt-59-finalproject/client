import { CardOrderComponent } from "@/components/CardOrder";
import { FilterHistoryOrder } from "@/components/FilterHistoryOrder";
import { http } from "@/helpers/axios";
import { OrderStatus, OrderType } from "@/types";

import { useEffect, useState } from "react";

// Ini adalah halaman All Order dari Outlet yang login
export default function AllRequestOutlet() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [filter, setFilter] = useState("requested");

  useEffect(() => {
    fetchData();
  }, [filter]);

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
      <div className="flex flex-col justify-start items-center min-h-screen w-full ">
        <div className="flex flex-col max-w-6xl justify-center items-center w-full">
          <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
            <div>
              <h1 className="text-2xl font-bold">Request History</h1>
            </div>
          </div>
        </div>
        <div className="p-5">
          <FilterHistoryOrder
            setFilter={(val: OrderStatus) => setFilter(val)}
          />
        </div>
        <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
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
