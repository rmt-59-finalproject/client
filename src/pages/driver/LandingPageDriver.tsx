import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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

export default function LandingPageDriver() {
  //   const [role, useRole] = useState("driver");
  const [usernameDriver, setUsernameDriver] = useState("budi_cepat");

  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const uri = `/orders?status=in_transit&driver.username=${usernameDriver}`;
      const data = await http.get(uri);
      console.log(data.data);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }
  function navigateDriverOrder() {
    navigate("/driver-orders");
  }

  function navigateVerifyDriver(id: string) {
    navigate(`/verify-driver/${id}`);
  }
  return (
    <>
      {" "}
      (
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
      )
    </>
  );
}
