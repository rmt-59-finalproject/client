import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
export default function VerifyOrderDriver() {
  const [detail, setDetail] = useState<OrderType[]>([]);
  const params = useParams();
  const { orderId } = params;
  useEffect(() => {
    fetchDetailOrder();
  }, []);

  async function fetchDetailOrder() {
    try {
      const data = await http.get(`/orders?_id=${orderId}`);
      console.log(data.data);
      setDetail(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <h1>Order ID: {orderId}</h1>
      </div>
    </>
  );
}
