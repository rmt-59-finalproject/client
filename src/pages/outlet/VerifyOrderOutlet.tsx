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
  XCircle,
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
import { Textarea } from "@/components/ui/textarea";
import { BadgeStatusColor } from "@/components/BadgeStatusColor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Interface for verified items
interface VerifiedItem {
  isChecked: boolean;
  quantity: number;
  name: string;
  unit: string;
  _id: string;
  isQuantityMatch: boolean;
}

export default function VerifyOrderOutlet() {
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
  const [verifiedItems, setVerifiedItems] = useState<
    Record<string, VerifiedItem>
  >({});
  const [allVerified, setAllVerified] = useState(false);
  // const [allQuantityMatch, setAllQuantityMatch] = useState(false);
  const [notes, setNotes] = useState("");
  const [orderStatus, setOrderStatus] = useState<"completed" | "rejected">(
    "completed"
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { orderId } = params;

  useEffect(() => {
    fetchDetailOrder();
  }, []);

  // Check if all items are verified and quantities match
  useEffect(() => {
    if (detail?.items && detail.items.length > 0) {
      // Initialize verifiedItems if empty
      if (Object.keys(verifiedItems).length === 0) {
        const initialVerified: Record<string, VerifiedItem> = {};
        detail.items.forEach((item) => {
          initialVerified[item._id] = {
            isChecked: false,
            quantity: item.quantity,
            name: item.name,
            unit: item.unit,
            _id: item._id,
            isQuantityMatch: true,
          };
        });
        setVerifiedItems(initialVerified);
      }

      // Check if all items are verified
      const allChecked = detail.items.every(
        (item) => verifiedItems[item._id]?.isChecked
      );
      setAllVerified(allChecked);

      // Check if all quantities match
      // const quantityMatch = detail.items.every((item) => {
      //   const verifiedItem = verifiedItems[item._id];
      //   return verifiedItem?.isQuantityMatch;
      // });
      // setAllQuantityMatch(quantityMatch);
    }
  }, [detail, verifiedItems]);

  async function fetchDetailOrder() {
    try {
      const data = await http.get(`/outlet/orders/${orderId}`, {
        withCredentials: true,
      });
      console.log(data.data);
      setDetail(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Handle item verification
  const handleVerifyItem = (
    itemId: string,
    isChecked: boolean,
    actualQuantity: number
  ) => {
    setVerifiedItems((prev) => {
      const item = prev[itemId];
      if (!item) return prev;

      // Find original item to get expected quantity
      const originalItem = detail.items?.find((i) => i._id === itemId);
      const expectedQuantity = originalItem?.quantity || 0;

      // Check if actual quantity matches expected
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
      // Prepare verification data
      const verifiedData = {
        orderId: id,
        items: Object.values(verifiedItems).map((item) => ({
          itemId: item._id,
          isVerified: item.isChecked,
          actualQuantity: item.quantity,
          isQuantityMatch: item.isQuantityMatch,
        })),
        status: orderStatus,
        notes: notes,
      };

      const itemsAndBooleanChecked = verifiedData.items.map((el) => {
        return {
          productId: el.itemId,
          status: el.isVerified,
        };
      });
      console.log(itemsAndBooleanChecked, "<--- item yang disubmit");

      console.log("Submitting verification:", verifiedData);

      async function submitPerItem(productId: string, status: boolean) {
        console.log({ productId, status }, "<------ yang dikirim ke API");

        const data = await http.patch(
          `/outlet/orders/${id}`,
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

      const submittedVerify = await http.patch(
        `/orders/${id}`,
        {
          status: verifiedData.status,
          notes: verifiedData.notes,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        submittedVerify.data,
        "<------ ubah status dari deliverY ke rejected / completed"
      );

      // // Navigate to status page
      navigate(`/outlet/status/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="font-[family-name:Montserrat] bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex flex-col justify-start items-center min-h-screen w-full">
      <div className="flex flex-col max-w-6xl justify-center items-center w-full">
        <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold">Check Order Items</h1>
          </div>
        </div>

        {/* Alert for quantity verification */}
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
                  <h1>Penerima Order</h1>
                  <h1>{detail?.orderId}</h1>
                </div>
                <h1 className="py-2.5 text-2xl">{detail?.outlet?.name}</h1>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-5 w-full">
          {detail?.items?.map((el) => {
            const verifiedItem = verifiedItems[el?._id];
            const isItemVerified = verifiedItem?.isChecked || false;
            const itemQuantity = verifiedItem?.quantity || 0;
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
                          handleVerifyItem(
                            el?._id,
                            checked === true,
                            itemQuantity
                          );
                        }}
                        className="h-5 w-5 border-2 border-black"
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
                          id={`quantity-${el?._id}`}
                          type="text"
                          className={`border-2 ${
                            !isQuantityMatch
                              ? "border-red-500 bg-red-50"
                              : "border-black"
                          }`}
                          value={itemQuantity}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            // Allow empty string or valid numbers only
                            if (newValue === "" || /^\d+$/.test(newValue)) {
                              const newQuantity =
                                newValue === "" ? 0 : Number.parseInt(newValue);
                              handleVerifyItem(el?._id, false, newQuantity);
                            }
                          }}
                        />
                        <span>{el?.unit}</span>
                      </div>
                      {!isQuantityMatch && (
                        <p className="text-red-500 text-sm mt-1">
                          Different check, expected: {el?.quantity} {el?.unit}
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

      <div className="font-[family-name:Montserrat] fixed bottom-4 flex justify-center items-center left-0 right-0 px-4 pt-10">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!allVerified}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Complete check
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-[family-name:Montserrat]">
                Order Verification
              </DialogTitle>
              <DialogDescription className="font-[family-name:Montserrat]">
                Select the order status, and add the notes if necessary.
              </DialogDescription>
            </DialogHeader>

            <div className="-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm">
              <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 bg-blue-50">
                <CardHeader className="border-b-4 border-black ">
                  <CardTitle className="font-[family-name:Montserrat] text-xl flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Order Recipient
                  </CardTitle>
                </CardHeader>
                <CardContent className="font-[family-name:Montserrat]">
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

              <Card className="font-[family-name:Montserrat] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-xl font-bold">
                    Order Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={orderStatus}
                    onValueChange={(value) =>
                      setOrderStatus(value as "completed" | "rejected")
                    }
                    className="space-y-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="completed" id="completed" />
                      <Label
                        htmlFor="completed"
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="font-medium">
                          Receive this Order (Completed)
                        </span>
                      </Label>
                    </div>
                    <div className="font-[family-name:Montserrat] flex items-center space-x-2">
                      <RadioGroupItem value="rejected" id="rejected" />
                      <Label
                        htmlFor="rejected"
                        className="flex items-center gap-2"
                      >
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="font-[family-name:Montserrat] font-medium">
                          Reject this Order (Rejected)
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-4">
                    <h3 className="font-medium mb-2">
                      Notes{" "}
                      {orderStatus === "rejected"
                        ? "(Wajib diisi jika menolak)"
                        : ""}
                    </h3>
                    <Textarea
                      placeholder={
                        orderStatus === "rejected"
                          ? "Jelaskan alasan penolakan pesanan..."
                          : "Tambahkan catatan jika diperlukan..."
                      }
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={
                        orderStatus === "rejected" && !notes
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {orderStatus === "rejected" && !notes && (
                      <p className="text-red-500 text-sm mt-1">
                        The notes is required while order status is rejected.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="font-[family-name:Montserrat] mb-6">
                <h2 className="text-xl font-bold mb-4">Verified items:</h2>
                <p className="text-muted-foreground mb-4">
                  Here is a list of items that have been checked:
                </p>

                <Card className="pt-0 pb-0">
                  <div className="border-b-4 border-black bg-green-500 text-white p-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2" />
                      <p className="font-bold">All items have been checked</p>
                    </div>
                  </div>
                  <Table className="font-[family-name:Montserrat]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Expectation</TableHead>
                        <TableHead>Actual</TableHead>
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
                                  <Check className="h-4 w-4" /> Verified
                                </span>
                              ) : (
                                "Not Verified"
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>

            <DialogFooter className="font-[family-name:Montserrat]">
              <Button
                onClick={() => submitVerification(detail?._id)}
                className="w-full"
                disabled={orderStatus === "rejected" && !notes}
                variant={orderStatus === "completed" ? "default" : "neutral"}
              >
                {orderStatus === "completed" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Receive this order
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject this order
                  </>
                )}
              </Button>
              <DialogClose asChild>
                <Button variant="neutral">Cancek</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
