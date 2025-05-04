import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
import { Button } from "@/components/ui/button";
// Ini adalah halaman All Order dari Warehouse
export default function AssignOrderPage() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [filter, setFilter] = useState("requested");

  useEffect(() => {
    fetchData();
  }, [filter]);
  async function fetchData() {
    try {
      const data = await http.get(`/orders?status=${filter}`);
      console.log(data.data);
      console.log(filter);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full">
      <div className="w-full max-w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <div>
            <h1 className="text-2xl font-bold">
              Accept & Assign Incoming Order Requests
            </h1>
            <h1 className="text-lg opacity-50">
              Lets accept & assign the order for continue the processes .
            </h1>
          </div>
        </div>
        <div className="p-5">
          <Select onValueChange={(val) => setFilter(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Requested" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="requested">Requested</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="p-5 flex flex-col">
          <div className=" max-w-2xl">
            {filter === "requested" && (
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
                          <Button className="w-full">
                            Accept Request Order
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
            {filter === "approved" && (
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
                          <div className="flex flex-row w-full gap-2 justify-between items-center">
                            <Select
                              onValueChange={(val) => setSelectedDriver(val)}
                            >
                              <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Select driver" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Agus">Agus</SelectItem>
                                  <SelectItem value="Maulana">
                                    Maulana
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Button
                              className="w-1/2"
                              disabled={!selectedDriver}
                            >
                              Assign Order to the Driver
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
