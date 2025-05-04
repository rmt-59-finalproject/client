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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  // set role = driver | warehouse | outlet
  const [role, useRole] = useState("warehouse");
  // set username driver kalo role === driver
  const [usernameDriver, setUsernameDriver] = useState("budi_cepat");

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
        uri = `/orders?status=in_transit&driver.username=${usernameDriver}`;
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

  function navigateDriverOrder() {
    navigate("/driver-orders");
  }

  function navigateVerifyDriver(id: string) {
    navigate(`/verify-driver/${id}`);
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
                <div className="w-full">
                  <h1 className="text-2xl font-bold">
                    {" "}
                    Welcome {usernameDriver}!
                  </h1>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="text-lg opacity-70">
                      Here is today's missions:
                    </h1>
                    <Button onClick={navigateDriverOrder}>All Orders</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
              {orderData.length > 0 ? (
                // ADA ORDERAN
                <>
                  <div className="flex flex-col gap-2">
                    {orderData?.map((el) => {
                      return (
                        <Card key={el?._id}>
                          <CardHeader>
                            <div className="flex flex-row w-full justify-between items-center">
                              <h1>{el?._id}</h1>
                              <Badge>{el?.status}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-row justify-between items-center">
                              <div>
                                <h1 className="text-lg font-bold">Outlet</h1>
                                <h1>{el?.outlet?.username}</h1>
                              </div>
                              <div>
                                <h1 className="text-lg font-bold">
                                  Date Requested
                                </h1>
                                <h1>{el?.createdAt}</h1>
                              </div>
                            </div>
                            <div className="p-5">
                              <h1>items</h1>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {el?.items?.map((el) => {
                                    return (
                                      <TableRow key={el.productId}>
                                        <TableCell className="font-base">
                                          {el.productId}
                                        </TableCell>
                                        <TableCell>{el.quantity}</TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              onClick={() => navigateVerifyDriver(el?._id)}
                              className="w-full"
                            >
                              Verify Items
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </>
              ) : (
                // GAADA ORDERAN
                <>
                  <div className="min-h-20 opacity-70 flex justify-center items-center">
                    <h1>Ga ada orderan nih, santuy dulu aja...</h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
