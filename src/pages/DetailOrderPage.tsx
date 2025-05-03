import { Button } from "@/components/ui/button";
import { useParams } from "react-router";

export default function DetailOrderPage() {
  const params = useParams();
  const { orderId } = params;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
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
