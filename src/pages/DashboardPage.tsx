import TableHistoryOrder from "@/components/TableHistoryOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const [role, useRole] = useState("driver");
  const [usernameDriver, setUsernameDriver] = useState("dani_antar");
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let uri = "/orders";
      if (role === "warehouse") {
        const data = await http.get(uri);
        console.log(data.data);
        const dataResponse: OrderType[] = data.data;
        setOrderData(dataResponse);
      }

      if (role === "driver") {
        uri = `/orders?driver.username=${usernameDriver}`;
        const data = await http.get(uri);
        console.log(data.data);
        const dataResponse: OrderType[] = data.data;
        setOrderData(dataResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function navigateRequestOrder() {
    navigate("/request-order");
  }
  function navigateOrderHistory() {
    navigate("/orders");
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-7xl">
          {role === "warehouse" && (
            <>
              <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
                <div>
                  <h1 className="text-2xl font-bold">Welcome {role}!</h1>
                </div>
              </div>
              {/* Card Stats */}
              <div className="w-full h-50 p-5">
                <div className=" flex  gap-5  flex-row ">
                  <Card className="flex-1/3">
                    <CardHeader>
                      <CardTitle>Total Inventory</CardTitle>
                      <CardDescription>
                        <h1 className="text-5xl font-bold">1,248</h1>
                        <h1 className="text-sm mt-2 opacity-80">
                          +12 items added today
                        </h1>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="flex-1/3">
                    <CardHeader>
                      <CardTitle>Pending Orders</CardTitle>
                      <CardDescription>
                        <h1 className="text-5xl font-bold">23</h1>
                        <h1 className="text-sm mt-2 opacity-80">
                          2 require attention
                        </h1>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="flex-1/3">
                    <CardHeader>
                      <CardTitle>Delivered Today</CardTitle>
                      <CardDescription>
                        <h1 className="text-5xl font-bold">32</h1>
                        <h1 className="text-sm mt-2 opacity-80">
                          + 8 from yesterday
                        </h1>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
              {/*  */}
              <div className="px-5 pt-5 flex flex-row items-center justify-between">
                <h1 className="font-bold text-2xl">Recent Orders</h1>
                <Button onClick={navigateOrderHistory}>
                  All Order History
                </Button>
              </div>
              {/* button create order */}
              <div className="p-5">
                <TableHistoryOrder orderData={orderData} />
              </div>
            </>
          )}
          {role === "outlet" && (
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
          )}
        </div>
      </div>
      {role === "driver" && (
        <>
          <div className="flex flex-col justify-start items-center min-h-screen w-full ">
            <div className="flex flex-col max-w-6xl justify-center items-center w-full">
              <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    {" "}
                    Welcome {usernameDriver}!
                  </h1>
                </div>
              </div>
            </div>
            <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
              {orderData.map((order) => {
                return (
                  <Card key={order._id}>
                    <CardContent>
                      <div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="flex flex-row justify-between items-ccnter w-full">
                            <h2 className="text-lg font-semibold text-gray-900 mb-1">
                              {order?._id} - {order?.outlet?.username}{" "}
                            </h2>
                            <Badge>{order?.status}</Badge>
                          </div>

                          <p className="text-sm text-gray-500 mb-3">
                            {order?.items?.length} items • Order created at{" "}
                            {order?.createdAt}
                          </p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Order Items:
                          </p>
                          <ul className="text-sm text-gray-800 space-y-1">
                            {order?.items?.map((el) => {
                              return (
                                <div key={el?.productId}>
                                  <li className="flex justify-between">
                                    <span>{el?.productId}</span>
                                    <span>{el?.quantity}</span>
                                  </li>
                                </div>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Verify Delivery</Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
