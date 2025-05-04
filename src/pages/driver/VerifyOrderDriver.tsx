import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { Check, CheckCircle2 } from "lucide-react";
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
      <>
        <div className="flex flex-col justify-start items-center min-h-screen w-full ">
          <div className="flex flex-col max-w-6xl justify-center items-center w-full">
            <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
              <div className="w-full">
                <h1 className="text-2xl font-bold">Verify Items</h1>
              </div>
            </div>
            <div className="p-5 w-full">
              <Card>
                <CardContent>
                  <div>
                    <div className="w-full flex justify-between items-center">
                      <h1>Delivery Recipient</h1>
                      <h1>{detail[0]?._id}</h1>
                    </div>
                    <h1 className="py-2.5 text-2xl">
                      {detail[0]?.outlet?.username}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="p-5 w-full">
              {detail[0]?.items?.map((el) => {
                return (
                  <Card key={el?.productId}>
                    <CardHeader>
                      <div className="w-full flex justify-between items-center">
                        <div className="w-full flex gap-5 items-center">
                          <Checkbox
                            id="id"
                            // checked={isChecked}
                            // onCheckedChange={handleCheck}
                            className="h-5 w-5 border-2 border-black"
                          />
                          <h1>{el?.productId}</h1>
                        </div>

                        <Badge className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center gap-1">
                          <Check className="h-4 w-4" /> Verified
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex flex-col">
                          <h1>Expected</h1>
                          <h1>{el?.quantity} unit?</h1>
                        </div>
                        <div className="flex flex-col">
                          <h1>Actual Quantity</h1>
                          <div className="flex gap-2 items-center">
                            <Input
                              id="id"
                              type="number"
                              className="border-2 border-black"
                              min={0}
                            />
                            <span>unit?</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="fixed bottom-4 flex justify-center items-center left-0 right-0 px-4">
            <Button
              // onClick={totalOrder}
              // disabled={orderItems.length === 0 && true}
              className="w-full max-w-6xl"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Complete Verification for {detail[0]?.outlet?.username}
            </Button>
          </div>
        </div>
      </>
    </>
  );
}
