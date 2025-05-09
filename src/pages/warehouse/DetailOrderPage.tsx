import { BadgeStatusColor } from "@/components/BadgeStatusColor";
import TableDetailOrder from "@/components/TableDetailOrder";
// import { Card, CardContent } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
import { http } from "@/helpers/axios";
import { formatDate } from "@/lib/utils";
import { OrderStatus, OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// deetail orderan diklik dari /dashboard atau /orders
export default function DetailOrderPage() {
  const [detail, setDetail] = useState<OrderType>({
    _id: "",
    orderId: "",
    driver: {
      _id: "",
      username: "",
      name: "",
      role: "driver",
    },
    outlet: {
      _id: "",
      username: "",
      name: "",
      role: "outlet",
    },
    status: "requested", // Assign a valid default value from the allowed types
    notes: "",
    createdAt: "",
    updatedAt: "",
    items: [], // Use an empty array without a semicolon
  });
  const params = useParams();
  const { orderId } = params;
  useEffect(() => {
    fetchDetail();
  }, []);

  async function fetchDetail() {
    try {
      const data = await http.get(`/orders/${orderId}`, {
        withCredentials: true,
      });
      const responseData: OrderType = data?.data;
      setDetail(responseData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-full max-w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <div>
            <h1 className="text-2xl font-bold">Detail Request Order</h1>
            <h1 className="text-lg opacity-50">
              Informasi detail request orderan
            </h1>
          </div>
        </div>
      </div>
      <div className="p-2.5 w-full max-w-7xl">
        <div className=" p-2.5 rounded-2xl border border-gray-400 bg-gray-300">
          <div className="px-5 pt-5">
            <h1>Order ID</h1>
            <h1 className="text-lg font-bold">{detail?.orderId}</h1>
          </div>
          <div className="px-5 pt-5">
            <h1>Outlet Name</h1>
            <h1 className="text-lg font-bold">{detail?.outlet?.name}</h1>
          </div>
          <div className="px-5 pt-5">
            <h1>This order assigned to:</h1>
            <h1 className="text-lg font-bold">{detail?.driver?.name}</h1>
          </div>
          <div className="px-5 pt-5">
            <h1>Order Created Date:</h1>
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
          {detail?.notes && (
            <div className="p-5 w-full">
              <div className="border border-gray p-5 rounded-2xl">
                <h1 className="pb-5">Notes for this request order:</h1>
                <div className="p-5 bg-gray-400 rounded-2xl">
                  {detail?.notes}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
