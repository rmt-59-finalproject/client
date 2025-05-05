import TableHistoryOrder from "@/components/TableHistoryOrder";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const [requested, setRequested] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    countStat();
  }, []);

  async function fetchData() {
    try {
      const uri = "/orders";
      const data = await http.get(uri, { withCredentials: true });
      console.log(data.data);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async function countStat() {
    try {
      const dataRequest = await http.get(`orders?status=requested`, {
        withCredentials: true,
      });
      const dataCompleted = await http.get(`orders?status=completed`, {
        withCredentials: true,
      });
      console.log(dataRequest.data, "-< requested");
      setRequested(dataRequest.data.length);
      console.log(dataCompleted.data, "-< completed");
      setCompleted(dataCompleted.data.length);
    } catch (error) {
      console.log(error);
    }
  }

  // function navigateRequestOrder() {
  //   navigate("/request-order");
  // }
  function navigateOrderHistory() {
    navigate("/orders");
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-7xl">
          <>
            <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
              <div>
                <h1 className="text-2xl font-bold">Welcome warehouse!</h1>
              </div>
            </div>
            {/* Card Stats */}
            <div className="w-full h-50 p-5">
              <div className=" flex  gap-5  flex-row ">
                <Card className="flex-1/3">
                  <CardHeader>
                    <CardTitle>Requested Orders</CardTitle>
                    <CardDescription>
                      <h1 className="text-5xl font-bold">{requested}</h1>
                      <h1 className="text-sm mt-2 opacity-80">
                        these orders require attention
                      </h1>
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="flex-1/3">
                  <CardHeader>
                    <CardTitle>Completed Orders</CardTitle>
                    <CardDescription>
                      <h1 className="text-5xl font-bold">{completed}</h1>
                      <h1 className="text-sm mt-2 opacity-80">
                        {" "}
                        these orders completed to outlet
                      </h1>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
            {/*  */}
            <div className="px-5 pt-5 flex flex-row items-center justify-between">
              <h1 className="font-bold text-2xl">Recent Orders</h1>
              <Button onClick={navigateOrderHistory}>All Order History</Button>
            </div>
            {/* button create order */}
            <div className="p-5">
              <TableHistoryOrder orderData={orderData} />
            </div>
          </>

          {/* {role === "outlet" && (
            <>
              <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
                <div>
                  <h1 className="text-2xl font-bold">Outlet Dashboard</h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="neutral">Activity Log</Button>
                  <Button onClick={navigateRequestOrder}>Create Order</Button>
                </div>
              </div>
            </>
          )} */}
        </div>
      </div>
    </>
  );
}
