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
    <div className="flex flex-col justify-start items-center min-h-screen w-full font-[family-name:Montserrat]">
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
