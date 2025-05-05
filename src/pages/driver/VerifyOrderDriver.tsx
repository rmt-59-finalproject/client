import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { Check, CheckCircle2, MapPin, Store, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
//
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeStatusColor } from "@/components/BadgeStatusColor";
export default function VerifyOrderDriver() {
  const [detail, setDetail] = useState<OrderType>({});
  const params = useParams();
  const navigate = useNavigate();
  const { orderId } = params;
  useEffect(() => {
    fetchDetailOrder();
  }, []);

  async function fetchDetailOrder() {
    try {
      const data = await http.get(`/driver/orders/${orderId}`, {
        withCredentials: true,
      });
      console.log(data.data);
      setDetail(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitVerification(id: string) {
    try {
      // logic verif
      console.log(id);
      navigate(`/status-driver/${id}`);
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
                      <h1>{detail?._id}</h1>
                    </div>
                    <h1 className="py-2.5 text-2xl">
                      {detail?.outlet?.username}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="p-5 w-full">
              {detail?.items?.map((el) => {
                return (
                  <Card key={el?._id}>
                    <CardHeader>
                      <div className="w-full flex justify-between items-center">
                        <div className="w-full flex gap-5 items-center">
                          <Checkbox
                            id="id"
                            // checked={isChecked}
                            // onCheckedChange={handleCheck}
                            className="h-5 w-5 border-2 border-black"
                          />
                          <h1>{el?.name}</h1>
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
                          <h1>
                            {el?.quantity} {el?.unit}
                          </h1>
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
                            <span>{el?.unit}</span>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <CheckCircle2 />
                  Complete Verification for Delta Mart
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Order Check Summary</DialogTitle>
                  <DialogDescription>
                    Let's verify that all items for Downtown Café have been
                    verified and are ready for delivery.
                  </DialogDescription>
                </DialogHeader>
                <div className="-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm">
                  <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 bg-blue-50">
                    <CardHeader className="border-b-4 border-black bg-blue-100">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Store className="h-5 w-5" />
                        Delivery Recipient
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold">A</h2>
                          <BadgeStatusColor
                            status={detail?.status as OrderStatus}
                          />
                        </div>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>Order #100</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                    <CardHeader className="border-b-4 border-black">
                      <CardTitle className="text-xl">Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-row w-full items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Driver</p>
                          <p className="text-lg font-bold">Agus</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Outlet</p>
                          <p className="text-lg font-bold">Outlet</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Verified Items</h2>
                    <p className="text-muted-foreground mb-4">
                      All items for <span className="font-bold">Outlet</span>{" "}
                      have been verified and are ready for delivery.
                    </p>

                    <Card className="pt-0 pb-0">
                      <div className="border-b-4 border-black bg-green-500 text-white p-4">
                        <div className="flex items-center">
                          <Check className="h-5 w-5" />
                          <p className="font-bold">All Items Verified</p>
                        </div>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Premium Coffee Beans</TableCell>
                            <TableCell>5 boxes</TableCell>
                            <TableCell>
                              {" "}
                              <span className="inline-flex items-center gap-1 text-green-950">
                                <Check className="h-4 w-4" /> Verified
                              </span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Card>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => submitVerification(detail?._id)}
                    className="w-full btn-neobrutalism"
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Start Delivery to Outlet Name
                  </Button>
                  <DialogClose asChild>
                    <Button variant={"neutral"}>Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </>
    </>
  );
}
