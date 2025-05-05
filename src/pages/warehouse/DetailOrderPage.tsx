import { BadgeStatusColor } from "@/components/BadgeStatusColor";
import TableDetailOrder from "@/components/TableDetailOrder";
import { http } from "@/helpers/axios";
import { formatDate } from "@/lib/utils";
import { OrderStatus, OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// deetail orderan diklik dari /dashboard atau /orders
export default function DetailOrderPage() {
  const [detail, setDetail] = useState<OrderType>({});
  const params = useParams();
  const { orderId } = params;
  useEffect(() => {
    fetchDetail();
  }, []);

  async function fetchDetail() {
    try {
      const data = await http(`/orders/${orderId}`, {
        withCredentials: true,
      });
      console.log(data.data, "<-- fetchDetail");
      const responseData: OrderType = data?.data;
      setDetail(responseData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-full max-w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <div>
            <h1 className="text-2xl font-bold">Order Request Details</h1>
            <h1 className="text-lg opacity-50">
              Provide information about your order request
            </h1>
          </div>
        </div>
      </div>
      <div className="p-2.5 w-full max-w-7xl">
        <div className=" p-2.5 rounded-2xl border border-gray-400 bg-gray-300">
          <div className="px-5 pt-5">
            <h1>Order Id</h1>
            <h1 className="text-lg font-bold">{detail?._id}</h1>
          </div>
          <div className="px-5 pt-5">
            <h1>Outlet Name</h1>
            <h1 className="text-lg font-bold">{detail?.outlet?.name}</h1>
          </div>
          <div className="px-5 pt-5">
            <h1>Order assigned to driver:</h1>
            <h1 className="text-lg font-bold">{detail?.driver?.name}</h1>
          </div>
          <div className="px-5 pt-5">
            <h1>Order Create Date</h1>
            <h1 className="text-lg font-bold">
              {formatDate(detail?.createdAt)}
            </h1>
          </div>
          <div className="px-5 pt-5">
            <h1>Status Order</h1>
            <BadgeStatusColor status={detail?.status as OrderStatus} />
          </div>
          <div className="p-1">
            <h1 className="px-5 pt-5 pb-5">Order Items</h1>
            <div className="flex flex-col gap-2">
              <TableDetailOrder data={detail?.items || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
