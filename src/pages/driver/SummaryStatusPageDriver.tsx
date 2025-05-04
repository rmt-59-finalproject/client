import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function SummaryStatusPageDriver() {
  const [data, setData] = useState<OrderType[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  const { orderId } = params;
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const uri = `/orders?_id=${orderId}`;
      const data = await http.get(uri);
      console.log(data.data);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function navigateHome() {
    navigate("/driver");
  }
  return (
    <>
      <div className="flex flex-col justify-start items-center min-h-screen w-full ">
        <div className="flex flex-col max-w-6xl justify-center items-center w-full">
          <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-bold"> Order delivered!</h1>
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-lg opacity-70">
                  Check here, Your orders are starting to delivered!
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
          <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            <CardHeader className="border-b-4 border-black flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Order #{data[0]?._id}</CardTitle>
              {/* <StatusBadge status={order.status} /> */}
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex w-full flex-row justify-between items-center gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Driver</p>
                  <p className="font-bold">{data[0]?.driver?.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Outlet</p>
                  <p className="font-bold">{data[0]?.outlet?.username}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <h2 className="text-xl font-bold mb-4">Item Verification</h2>
          <p className="font-medium mb-4">
            Verify each item in the delivery by checking the box and confirming
            the quantity.
          </p>
          <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-0">
              <div className="border-b-4 border-black bg-green-500 text-white p-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <p className="font-bold">
                    This order were starting delivery process
                  </p>
                </div>
              </div>
              <div className="p-0">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Product</th>
                      <th className="px-4 py-2 text-right">Quantity</th>
                      <th className="px-4 py-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[0]?.items?.map((item) => (
                      <tr
                        key={item.productId}
                        className="border-b border-black last:border-b-0"
                      >
                        <td className="px-4 py-3">{item.productId}</td>
                        <td className="px-4 py-3 text-right">
                          {item.quantity} unit
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 text-green-500">
                            <Check className="h-4 w-4" /> Delivered
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="fixed bottom-4 flex justify-center items-center left-0 right-0 px-4">
          <Button
            // onClick={totalOrder}
            // disabled={orderItems.length === 0 && true}
            className="w-full max-w-6xl"
            onClick={navigateHome}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
}
