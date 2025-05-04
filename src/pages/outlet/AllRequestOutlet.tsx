import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";

// Ini adalah halaman All Order dari Outlet yang login
export default function AllRequestOutlet() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const usernameOutlet = "toko_ceria";

  async function fetchData() {
    try {
      const uri = `/orders?outlet.username=${usernameOutlet}`;
      const data = await http.get(uri);
      console.log(data.data);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-col justify-start items-center min-h-screen w-full ">
        <div className="flex flex-col max-w-6xl justify-center items-center w-full">
          <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
            <div>
              <h1 className="text-2xl font-bold">Request History</h1>
            </div>
          </div>
        </div>
        <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
          {orderData.length > 0 ? (
            // ADA ORDERAN
            <>
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
                      <Button className="w-full">Detail Request</Button>
                    </CardFooter>
                  </Card>
                );
              })}
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
  );
}
