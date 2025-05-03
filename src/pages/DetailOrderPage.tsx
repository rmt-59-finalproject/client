import { Button } from "@/components/ui/button";
import { http } from "@/helpers/axios";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function DetailOrderPage() {
  const params = useParams();
  const { orderId } = params;
  useEffect(() => {
    fetchDetail();
  }, []);

  async function fetchDetail() {
    try {
      const data = await http(`/orders?_id=${orderId}`);
      console.log(data, "<-- fetchDetail");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-7xl bg-amber-500 min-h-screen">
        <div className="flex flex-row items-center px-5 pt-5 justify-between bg-amber-400 w-full ">
          <div>
            <h1 className="text-2xl font-bold">Detail: {orderId}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="neutral">Activity Log</Button>
            <Button>Create Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
