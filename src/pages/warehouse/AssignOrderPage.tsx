"use client";

import { http } from "@/helpers/axios";
import type { OrderStatus, OrderType, UserType } from "@/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { BadgeStatusColor } from "@/components/BadgeStatusColor";
import { formatDate } from "@/lib/utils";
// Ini adalah halaman All Order dari Warehouse
export default function AssignOrderPage() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [selectedDrivers, setSelectedDrivers] = useState<
    Record<string, string>
  >({});
  const [filter, setFilter] = useState("requested");
  const [driver, setDriver] = useState<UserType[]>([]);

  useEffect(() => {
    fetchData();
    getDriver();
  }, [filter]);
  async function fetchData() {
    try {
      const data = await http.get(`/orders?status=${filter}`, {
        withCredentials: true,
      });
      console.log(data.data);
      console.log(filter);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDriver() {
    try {
      const data = await http.get("/users", {
        params: {
          role: "driver",
        },
        withCredentials: true,
      });
      console.log(data.data);
      setDriver(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitRequest(id: string) {
    // PATCH THIS STATUS FROM REQUESTED TO APPROVED
    try {
      console.log(id);
      const data = await http.patch(
        `/orders/${id}`,
        {
          status: "approved",
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  async function submitDriver(orderId: string, driverId: string) {
    try {
      // PATCH THIS TO DRIVER ID
      console.log(driverId, orderId);
      const data = await http.patch(
        `orders/${orderId}/driver`,
        {
          driverId: driverId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(
        data.data.message,
        "<-----cek dulu udah dikasih pesenannya ke driver, kalo udh cus ubah status ke in_transit"
      );

      // ubah dari approved ke in_transit
      const changeStatus = await http.patch(
        `/orders/${orderId}`,
        {
          status: "in_transit",
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        changeStatus.data.message,
        "<----- cek apakah berhasil berubah?"
      );

      fetchData();
      setSelectedDrivers((prev) => {
        const newState = { ...prev };
        delete newState[orderId];
        return newState;
      });
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
                            <BadgeStatusColor
                              status={el?.status as OrderStatus}
                            />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-row justify-between items-center">
                            <div>
                              <h1 className="text-lg font-bold">Outlet</h1>
                              <h1>{el?.outlet?.name}</h1>
                            </div>
                            <div>
                              <h1 className="text-lg font-bold">
                                Date Requested
                              </h1>
                              <h1>{formatDate(el?.createdAt)}</h1>
                            </div>
                          </div>
                          <div className="p-5">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product Name</TableHead>
                                  <TableHead>Quantity</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {el?.items?.map((el) => {
                                  return (
                                    <TableRow key={el.name}>
                                      <TableCell className="font-base">
                                        {el.name}
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
                            onClick={() => {
                              submitRequest(el._id);
                            }}
                            className="w-full"
                          >
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
                            <h1>{el?.orderId}</h1>
                            <BadgeStatusColor
                              status={el?.status as OrderStatus}
                            />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-row justify-between items-center">
                            <div>
                              <h1 className="text-lg font-bold">Outlet</h1>
                              <h1>{el?.outlet?.name}</h1>
                            </div>
                            <div>
                              <h1 className="text-lg font-bold">
                                Date Requested
                              </h1>
                              <h1>{formatDate(el?.createdAt)}</h1>
                            </div>
                          </div>
                          <div className="p-5">
                            <h1>items</h1>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product</TableHead>
                                  <TableHead>Quantity</TableHead>
                                  <TableHead>Unit</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {el?.items?.map((el) => {
                                  return (
                                    <TableRow key={el._id}>
                                      <TableCell className="font-base">
                                        {el.name}
                                      </TableCell>
                                      <TableCell>{el.quantity}</TableCell>
                                      <TableCell>{el.unit}</TableCell>
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
                              onValueChange={(val) => {
                                setSelectedDrivers((prev) => ({
                                  ...prev,
                                  [el._id]: val,
                                }));
                              }}
                            >
                              <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Select driver" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {driver.map((el) => {
                                    return (
                                      <SelectItem
                                        key={el?._id}
                                        value={el?._id as string}
                                      >
                                        {el.name}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Button
                              className="w-1/2"
                              onClick={() =>
                                submitDriver(el._id, selectedDrivers[el._id])
                              }
                              disabled={!selectedDrivers[el._id]}
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
