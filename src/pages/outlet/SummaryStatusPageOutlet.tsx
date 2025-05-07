import { BadgeStatusColor } from "@/components/BadgeStatusColor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { http } from "@/helpers/axios";
import { OrderStatus, OrderType } from "@/types";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function SummaryStatusPageOutlet() {
  const [data, setData] = useState<OrderType>({
    _id: "",
    orderId: "",
    driver: {
      _id: "",
      username: "",
      name: "",
      role: "driver",
    },
    outlet: {
      _id: "",
      username: "",
      name: "",
      role: "outlet",
    },
    status: "requested", // Assign a valid default value from the allowed types
    notes: "",
    createdAt: "",
    updatedAt: "",
    items: [], // Use an empty array without a semicolon
  });
  const params = useParams();
  const navigate = useNavigate();

  const { orderId } = params;
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const uri = `/orders/${orderId}`;
      const data = await http.get(uri, {
        withCredentials: true,
      });
      console.log(data.data);
      setData(data.data);
      console.log(data, "<---- data");
    } catch (error) {
      console.log(error);
    }
  }

  function navigateHome() {
    navigate("/outlet");
  }
  return (
    <>
      <div className="bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] font-[family-name:Space_Mono] flex flex-col justify-start items-center min-h-screen w-full ">
        <div className="flex flex-col max-w-6xl justify-center items-center w-full">
          <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-bold"> Order {data?.status}.</h1>
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-lg opacity-70">
                  Ini adalah rangkuman order Anda.
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
          <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            <CardHeader className="border-b-4 border-black flex flex-row items-center justify-between">
              <CardTitle className="text-xl">
                Order {data?.orderId || data?._id}
              </CardTitle>
              <BadgeStatusColor status={data?.status as OrderStatus} />
              {/* UBAH INI JADI DINAMIS */}
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex w-full flex-row justify-between items-center gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Driver</p>
                  <p className="font-bold">{data?.driver?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Outlet</p>
                  <p className="font-bold">{data?.outlet?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <h2 className="text-xl font-bold mb-4">Item yang telah dicek</h2>
          <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-0">
              <div
                className={`border-b-4 border-black ${
                  data?.status === "completed" ? "bg-green-500" : "bg-red-500"
                } text-white p-4`}
              >
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <p className="font-bold">Delivery {data?.status}</p>
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
                    {data?.items?.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-black last:border-b-0"
                      >
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3 text-right">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 ${
                              data?.status === "completed"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <Check className="h-4 w-4" />{" "}
                            {data?.status === "completed"
                              ? "Received"
                              : "Rejected"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          {data?.notes && (
            <div className="p-5 w-full">
              <Card>
                <CardContent>
                  <div>
                    <h1 className="pb-5">Catatan untuk orderan ini</h1>
                    <Textarea disabled value={data?.notes} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
