import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import TableHistoryOrder from "@/components/TableHistoryOrder";
import { FilterHistoryOrder } from "@/components/FilterHistoryOrder";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/redux/rootStore";

// Ini adalah halaman All Order dari Warehouse
export default function AllOrderPage() {
  const { orders } = useAppSelector((state: RootState) => state.ORDERS);
  const [filteredOrder, setFilteredOrder] = useState<OrderType[]>(orders || []);
  const [filter, setFilter] = useState<string>("requested");

  useEffect(() => {
    if (filter && orders) {
      console.log(filter);

      setFilteredOrder(orders?.filter((item) => item.status === filter));
    }
  }, [filter]);

  return (
    <div className="bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex flex-col justify-start items-center min-h-screen w-full font-[family-name:Montserrat]">
      <div className="w-full max-w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <div>
            <h1 className="text-2xl font-bold">All Order Request History</h1>
            <h1 className="text-lg opacity-50">
              Your outlet request order its all here
            </h1>
          </div>
          <FilterHistoryOrder setFilter={setFilter} />
        </div>
        <div className="p-5">
          <TableHistoryOrder orderData={filteredOrder} />
        </div>
      </div>
    </div>
  );
}
