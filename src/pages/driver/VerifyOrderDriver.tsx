"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { http } from "@/helpers/axios";
import type { OrderStatus, OrderType } from "@/types";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  MapPin,
  Store,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Tambahkan interface untuk item yang diverifikasi
interface VerifiedItem {
  isChecked: boolean;
  quantity: number;
  name: string;
  unit: string;
  _id: string;
  isQuantityMatch: boolean; // Tambahkan properti untuk mengecek kesamaan quantity
}

export default function VerifyOrderDriver() {
  const [detail, setDetail] = useState<OrderType>({
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
  // Tambahkan state untuk melacak item yang diverifikasi
  const [verifiedItems, setVerifiedItems] = useState<
    Record<string, VerifiedItem>
  >({});
  // State untuk mengecek apakah semua item sudah diverifikasi
  const [allVerified, setAllVerified] = useState(false);
  // State untuk mengecek apakah semua quantity sesuai
  const [allQuantityMatch, setAllQuantityMatch] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { orderId } = params;

  useEffect(() => {
    fetchDetailOrder();
  }, []);

  // Tambahkan useEffect untuk memeriksa apakah semua item sudah diverifikasi
  useEffect(() => {
    if (detail?.items && detail.items.length > 0) {
      // Inisialisasi verifiedItems jika belum ada
      if (Object.keys(verifiedItems).length === 0) {
        const initialVerified: Record<string, VerifiedItem> = {};
        detail.items.forEach((item) => {
          initialVerified[item._id] = {
            isChecked: false,
            quantity: item.quantity,
            name: item.name,
            unit: item.unit,
            _id: item._id,
            isQuantityMatch: true, // Default ke true karena awalnya quantity diset sama dengan expected
          };
        });
        setVerifiedItems(initialVerified);
      }

      // Periksa apakah semua item sudah diverifikasi
      const allChecked = detail.items.every(
        (item) => verifiedItems[item._id]?.isChecked
      );
      setAllVerified(allChecked);

      // Periksa apakah semua quantity sesuai dengan expected
      const quantityMatch = detail.items.every((item) => {
        const verifiedItem = verifiedItems[item._id];
        return verifiedItem?.isQuantityMatch;
      });
      setAllQuantityMatch(quantityMatch);
    }
  }, [detail, verifiedItems]);

  async function fetchDetailOrder() {
    try {
      const data = await http.get(`/driver/orders/${orderId}`, {
        withCredentials: true,
      });
      console.log(data.data, "<---- fetch detail");
      setDetail(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fungsi untuk menangani verifikasi item
  const handleVerifyItem = (
    itemId: string,
    isChecked: boolean,
    actualQuantity: number
  ) => {
    setVerifiedItems((prev) => {
      const item = prev[itemId];
      if (!item) return prev;

      // Cari item asli untuk mendapatkan expected quantity
      const originalItem = detail.items?.find((i) => i._id === itemId);
      const expectedQuantity = originalItem?.quantity || 0;

      // Cek apakah actual quantity sama dengan expected
      const isQuantityMatch = actualQuantity === expectedQuantity;

      return {
        ...prev,
        [itemId]: {
          ...item,
          isChecked,
          quantity: actualQuantity,
          isQuantityMatch,
        },
      };
    });
  };

  async function submitVerification(id: string) {
    try {
      // Persiapkan data yang akan dikirim ke server
      const verifiedData = {
        orderId: id,
        items: Object.values(verifiedItems).map((item) => ({
          itemId: item._id,
          isVerified: item.isChecked,
          actualQuantity: item.quantity,
          isQuantityMatch: item.isQuantityMatch,
        })),
        allQuantityMatch,
      };

      const orderId = id;
      const itemsAndBooleanChecked = verifiedData.items.map((el) => {
        return {
          productId: el.itemId,
          status: el.isVerified,
        };
      });

      console.log({ orderId, itemsAndBooleanChecked });

      // Kirim data ke server (uncomment dan sesuaikan dengan endpoint Anda)
      // await http.post('/driver/verify-order', verifiedData, {
      //   withCredentials: true,
      // });

      async function submitPerItem(productId: string, status: boolean) {
        console.log({ productId, status }, "<------ yang dikirim ke API");

        const data = await http.patch(
          `/driver/orders/${id}`,
          {
            productId: productId,
            status: String(status),
          },
          {
            withCredentials: true,
          }
        );

        return data;
      }

      let submittedBool = false;

      for (const el of itemsAndBooleanChecked) {
        const submitted = await submitPerItem(el.productId, el.status);
        if (submitted.status === 200) {
          submittedBool = true;
        }
        console.log(submitted.data.message, submittedBool);
      }

      //UBAH STATUS DARI IN_TRANSIT KE DELIVERY
      const changeStatus = await http.patch(
        `/orders/${orderId}`,
        {
          status: "delivery",
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        changeStatus.data.message,
        "<---- cek status apakah berhasil berubah ke delivery?"
      );

      console.log("Verified data:", verifiedData);
      navigate(`/driver/orders/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="font-[family-name:Montserrat] bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex flex-col justify-start items-center min-h-screen w-full ">
      <div className="flex flex-col max-w-6xl justify-center items-center w-full">
        <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-center">Order Details</h1>
          </div>
        </div>

        {/* Alert untuk mengingatkan bahwa quantity harus sama */}
        <div className="p-5 w-full">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Please ensure that the actual quantity is equal to the expected
              quantity for the purpose of valid verification!
            </AlertDescription>
          </Alert>
        </div>

        <div className="p-5 w-full">
          <Card>
            <CardContent>
              <div>
                <div className="w-full flex justify-between items-center">
                  <h1>Receiver</h1>
                  <h1>{detail?.orderId}</h1>
                </div>
                <h1 className="py-2.5 text-2xl">{detail?.outlet?.name}</h1>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="p-5 w-full flex flex-col gap-2">
          {detail?.items?.map((el) => {
            const verifiedItem = verifiedItems[el?._id];
            const isItemVerified = verifiedItem?.isChecked || false;
            const itemQuantity = verifiedItem?.quantity || el?.quantity;
            const isQuantityMatch = verifiedItem?.isQuantityMatch;

            return (
              <Card
                key={el?._id}
                className={!isQuantityMatch ? "border-red-500" : ""}
              >
                <CardHeader>
                  <div className="w-full flex justify-between items-center">
                    <div className="w-full flex gap-5 items-center">
                      <Checkbox
                        id={`item-${el?._id}`}
                        checked={isItemVerified}
                        onCheckedChange={(checked) => {
                          // Hanya bisa dicentang jika quantity sesuai
                          if (checked === true && !isQuantityMatch) {
                            alert(
                              `Actual quantity untuk ${el?.name} harus sama dengan expected quantity (${el?.quantity} ${el?.unit})`
                            );
                            return;
                          }
                          handleVerifyItem(
                            el?._id,
                            checked === true,
                            itemQuantity
                          );
                        }}
                        className="h-5 w-5 border-2 border-black"
                        disabled={!isQuantityMatch} // Disable checkbox jika quantity tidak sesuai
                      />
                      <h1>{el?.name}</h1>
                    </div>

                    {isItemVerified && (
                      <Badge className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center gap-1">
                        <Check className="h-4 w-4" /> Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full justify-between items-center">
                    <div className="flex flex-1 flex-col">
                      <h1>Expectation</h1>
                      <p>
                        {el?.quantity} {el?.unit}
                      </p>
                    </div>
                    <div className="flex flex-col w-44 md:w-fit">
                      <h1>Actual Value</h1>
                      <div className="flex gap-2 items-center">
                        <Input
                          id={`quantity-${el?._id}`}
                          type="number"
                          className={`border-2 ${
                            !isQuantityMatch
                              ? "border-red-500 bg-red-50"
                              : "border-black"
                          }`}
                          min={0}
                          value={itemQuantity}
                          onChange={(e) => {
                            const newQuantity =
                              Number.parseInt(e.target.value) || 0;
                            handleVerifyItem(el?._id, false, newQuantity); // Reset isChecked ke false saat quantity berubah
                          }}
                        />
                        <span>{el?.unit}</span>
                      </div>
                      {!isQuantityMatch && (
                        <p className="text-red-500 text-sm mt-1">
                          Must be the same as expected: {el?.quantity}{" "}
                          {el?.unit}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="font-[family-name:Montserrat] fixed bottom-4 flex justify-center items-center left-0 right-0 px-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={!allVerified || !allQuantityMatch}>
              <CheckCircle2 />
              Check Order
              {/* Selesaikan pengecekan untuk <br /> orderan {detail?.outlet?.name} */}
            </Button>
          </DialogTrigger>
          <DialogContent className="font-[family-name:Montserrat] sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Order Checking Summary</DialogTitle>
              <DialogDescription>
                Please find below a summary of the checks that have been carried
                out on the {detail?.outlet?.name} order.
              </DialogDescription>
            </DialogHeader>
            <div className="-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm">
              <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 ">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Order Receiver
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">
                        {detail?.outlet?.name}
                      </h2>
                      <BadgeStatusColor
                        status={detail?.status as OrderStatus}
                      />
                    </div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Order {detail?.orderId}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-xl">Detail Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row w-full items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Driver</p>
                      <p className="text-lg font-bold">
                        {detail?.driver?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Outlet</p>
                      <p className="text-lg font-bold">
                        {detail?.outlet?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">
                  Items that have been checked:
                </h2>

                <Card className="pt-0 pb-0">
                  <div className="border-b-4 border-black bg-green-600 text-white p-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5" />
                      <p className="font-bold">All items have been checked!</p>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Expectation</TableHead>
                        <TableHead>Actual Value</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detail?.items?.map((item) => {
                        const verifiedItem = verifiedItems[item._id];
                        return (
                          <TableRow key={item._id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              {item.quantity} {item.unit}
                            </TableCell>
                            <TableCell>
                              {verifiedItem?.quantity || item.quantity}{" "}
                              {item.unit}
                            </TableCell>
                            <TableCell>
                              {verifiedItem?.isChecked ? (
                                <span className="inline-flex items-center gap-1 text-green-950">
                                  <Check className="h-4 w-4" /> Checked
                                </span>
                              ) : (
                                "Not checked"
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Card>

                <p className="text-muted-foreground mt-4">
                  All items from{" "}
                  <span className="font-bold">{detail?.outlet?.name}</span> are
                  verified and ready for delivery.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => submitVerification(detail?._id)}
                className="w-full btn-neobrutalism"
              >
                <Truck className="mr-2 h-4 w-4" />
                Start Delivery
              </Button>
              <DialogClose asChild>
                <Button variant={"neutral"}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
