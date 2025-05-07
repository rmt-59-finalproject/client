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
import { toast } from "sonner";
import { useNavigate } from "react-router";

// Ini adalah halaman All Order dari Warehouse
export default function AssignOrderPage() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [selectedDrivers, setSelectedDrivers] = useState<string>("");
  const [filter, setFilter] = useState("requested");
  const [driver, setDriver] = useState<UserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    (async function getDriver() {
      try {
        const { data } = await http.get("/users", {
          params: {
            role: "driver",
          },
        });
        console.log(data, "<------ fetchDriver");

        setDriver(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  async function fetchData() {
    try {
      const { data } = await http.get(`/orders?status=${filter}`);
      console.log(data, "<---- fetchData");

      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitRequest(id: string) {
    // PATCH THIS STATUS FROM REQUESTED TO APPROVED
    try {
      console.log(id);
      console.log(driver);

      const data = await http.patch(`/orders/${id}`, {
        status: "approved",
      });

      console.log(data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  async function submitDriver(orderId: string) {
    try {
      console.log(selectedDrivers, "<====== selectedDriver");

      const driverId = selectedDrivers;

      // PATCH THIS TO DRIVER ID

      const { data } = await http.patch(`orders/${orderId}/driver`, {
        driverId,
      });
      console.log(
        data.message,
        "<-----cek dulu udah dikasih pesenannya ke driver, pastikan assign"
      );

      // // ubah dari approved ke in_transit
      // const { data: status } = await http.patch(`/orders/${orderId}`, {
      //   status: "in_transit",
      // });

      // console.log(status.message, "<----- cek apakah berhasil berubah?");

      // toast.success(status.message);
      console.log(data, "<------ hasil assign warehouse");
      navigate("/warehouse/dashboard");
      toast.success(data.message);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex-col justify-start items-center min-h-screen w-full">
      <div className="w-full max-w-7xl flex flex-col">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <div className="flex flex-col w-full">
            <div className="w-full flex flex-row justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">
                  Accept & Assign Incoming Order Requests
                </h1>
                <h1 className="text-lg opacity-50">
                  Lets accept & assign the order for continue the processes .
                </h1>
              </div>

              <div className="p-5">
                <Select onValueChange={(val) => setFilter(val)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Requested" />
                  </SelectTrigger>
                  <SelectContent className="font-[family-name:Space_Mono]">
                    <SelectGroup>
                      <SelectItem value="requested">Requested</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col w-full justify-center items-start">
          <div className="w-full flex flex-col justify-center items-center">
            {orderData.length > 0 ? (
              <>
                {" "}
                {filter === "requested" && (
                  <>
                    <div className="flex flex-col w-full gap-2  justify-center items-center">
                      {orderData?.map((el) => {
                        return (
                          <Card key={el?._id} className="w-6xl py-5">
                            <CardHeader>
                              <div className="flex flex-row justify-between items-center">
                                <h1>{el?.orderId}</h1>
                                <BadgeStatusColor
                                  status={el?.status as OrderStatus}
                                />
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="min-w-full flex flex-row justify-between items-center">
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
                                      <TableHead>Unit</TableHead>
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
                                          <TableCell>{el.unit}</TableCell>
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
                    <div className="flex flex-col gap-2 justify-center items-center w-full">
                      {orderData?.map((el) => {
                        return (
                          <Card key={el?._id} className="w-6xl py-5">
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
                                  onValueChange={(e) => setSelectedDrivers(e)}
                                >
                                  <SelectTrigger className="w-1/2">
                                    <SelectValue placeholder="Select driver" />
                                  </SelectTrigger>
                                  <SelectContent className="font-[family-name:Space_Mono]">
                                    <SelectGroup>
                                      {driver.map((el) => {
                                        return (
                                          <SelectItem
                                            key={el?._id}
                                            value={el._id as string}
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
                                  onClick={() => submitDriver(el?._id)}
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
              </>
            ) : (
              <>
                <h1>Requested data is none</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
