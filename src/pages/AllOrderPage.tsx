import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import TableHistoryOrder from "@/components/TableHistoryOrder";

// Ini adalah halaman All Order dari Warehouse
export default function AllOrderPage() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const data = await http.get("/orders");
      console.log(data.data);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-full max-w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <div>
            <h1 className="text-2xl font-bold">All History Orders</h1>
            <h1 className="text-lg opacity-50">
              Your all outlet orders history place.
            </h1>
          </div>
        </div>
        <div className="p-5">
          <TableHistoryOrder orderData={orderData} />
        </div>
      </div>
    </div>
  );
}
