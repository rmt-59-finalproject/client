import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function DetailOrderPage() {
  const [detail, setDetail] = useState<OrderType>({});
  const params = useParams();
  const { orderId } = params;
  useEffect(() => {
    fetchDetail();
  }, []);

  async function fetchDetail() {
    try {
      const data = await http(`/orders?_id=${orderId}`);
      console.log(data.data[0], "<-- fetchDetail");
      const responseData: OrderType = data.data[0];
      setDetail(responseData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col justify-start items-center bg-amber-500 min-h-screen">
      <div className="w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between bg-amber-400 w-full ">
          <div>
            <h1 className="text-2xl font-bold">Order Request Details</h1>
            <h1 className="text-lg opacity-50">
              Provide information about your order request
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="neutral">Activity Log</Button>
            <Button>Create Order</Button>
          </div>
        </div>
      </div>
      <div className="p-5 w-full max-w-7xl">
        <Card>
          <div>
            <CardContent>
              <h1>Order Id</h1>
              <h1>{detail._id}</h1>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
