import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import TableHistoryOrder from "@/components/TableHistoryOrder";
import { FilterHistoryOrder } from "@/components/FilterHistoryOrder";

// Ini adalah halaman All Order dari Warehouse
export default function AllOrderPage() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, [filter]);
  async function fetchData() {
    try {
      const data = await http.get(`/orders?status=${filter}`, {
        withCredentials: true,
      });
      console.log(data.data, "<---- all order");
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-full max-w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <div>
            <h1 className="text-2xl font-bold">
              Semua Histori Permintaan Orderan
            </h1>
            <h1 className="text-lg opacity-50">
              Seluruh histori orderan outlet anda ada disini.
            </h1>
          </div>
          <FilterHistoryOrder setFilter={setFilter} />
        </div>
        <div className="p-5">
          {orderData && <TableHistoryOrder orderData={orderData} />}
        </div>
      </div>
    </div>
  );
}
