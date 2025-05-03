import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router";

const invoices = [
  {
    orderId: "ORD-5001",
    outlet: "Downtown Café",
    items: [
      {
        id: 2,
        name: "Organic Tea Assortment",
        category: "Food & Beverage",
        stock: 180,
        unit: "boxes",
        quantity: 5,
      },
      {
        id: 1,
        name: "Premium Coffee Beans",
        category: "Food & Beverage",
        stock: 250,
        unit: "boxes",
        quantity: 2,
      },
      {
        id: 3,
        name: "Ceramic Coffee Mugs",
        category: "Kitchenware",
        stock: 75,
        unit: "units",
        quantity: 1,
      },
      {
        id: 4,
        name: "Coffee Filters",
        category: "Supplies",
        stock: 120,
        unit: "packs",
        quantity: 1,
      },
      {
        id: 5,
        name: "Branded Tote Bags",
        category: "Merchandise",
        stock: 120,
        unit: "units",
        quantity: 1,
      },
    ],
    created: "Today, 9:30 AM",
    driver: "Not assigned",
    status: "Processing",
  },
  {
    orderId: "ORD-5002",
    outlet: "Riverside Bistro",
    items: "12 items",
    created: "Today, 8:15 AM",
    driver: "John Smith",
    status: "Ready to Ship",
  },
  {
    orderId: "ORD-5003",
    outlet: "Harbor Coffee Shop",
    items: [
      {
        id: 2,
        name: "Organic Tea Assortment",
        category: "Food & Beverage",
        stock: 180,
        unit: "boxes",
        quantity: 4,
      },
      {
        id: 1,
        name: "Premium Coffee Beans",
        category: "Food & Beverage",
        stock: 250,
        unit: "boxes",
        quantity: 1,
      },
    ],
    created: "Yesterday, 4:45 PM",
    driver: "Maria Garcia",
    status: "In Transit",
  },
  {
    orderId: "ORD-5004",
    outlet: "Mountain View Café",
    items: [
      {
        id: 2,
        name: "Organic Tea Assortment",
        category: "Food & Beverage",
        stock: 180,
        unit: "boxes",
        quantity: 1,
      },
      {
        id: 1,
        name: "Premium Coffee Beans",
        category: "Food & Beverage",
        stock: 250,
        unit: "boxes",
        quantity: 1,
      },
    ],
    created: "Yesterday, 2:30 PM",
    driver: "David Wilson",
    status: "Delivered",
  },
  {
    orderId: "ORD-5005",
    outlet: "Sunset Café",
    items: [
      {
        id: 1,
        name: "Premium Coffee Beans",
        category: "Food & Beverage",
        stock: 250,
        unit: "boxes",
        quantity: 3,
      },
      {
        id: 2,
        name: "Organic Tea Assortment",
        category: "Food & Beverage",
        stock: 180,
        unit: "boxes",
        quantity: 3,
      },
      {
        id: 3,
        name: "Ceramic Coffee Mugs",
        category: "Kitchenware",
        stock: 75,
        unit: "units",
        quantity: 3,
      },
      {
        id: 4,
        name: "Coffee Filters",
        category: "Supplies",
        stock: 120,
        unit: "packs",
        quantity: 1,
      },
    ],
    created: "Yesterday, 10:15 AM",
    driver: "Sarah Johnson",
    status: "Issue Reported",
  },
];

export default function DashboardPage() {
  const [role, useRole] = useState("warehouse");
  const navigate = useNavigate();

  function navigateRequestOrder() {
    navigate("/request-order");
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-7xl">
        {role === "warehouse" && (
          <>
            <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
              <div>
                <h1 className="text-2xl font-bold">Warehouse Dashboard</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="neutral">Activity Log</Button>
                <Button>Create Order</Button>
              </div>
            </div>
            {/* Card Stats */}
            <div className="w-full h-50 p-5">
              <div className=" flex  gap-5  flex-row ">
                <Card className="flex-1/3">
                  <CardHeader>
                    <CardTitle>Total Inventory</CardTitle>
                    <CardDescription>
                      <h1 className="text-5xl font-bold">1,248</h1>
                      <h1 className="text-sm mt-2 opacity-80">
                        +12 items added today
                      </h1>
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="flex-1/3">
                  <CardHeader>
                    <CardTitle>Pending Orders</CardTitle>
                    <CardDescription>
                      <h1 className="text-5xl font-bold">23</h1>
                      <h1 className="text-sm mt-2 opacity-80">
                        2 require attention
                      </h1>
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="flex-1/3">
                  <CardHeader>
                    <CardTitle>Delivered Today</CardTitle>
                    <CardDescription>
                      <h1 className="text-5xl font-bold">32</h1>
                      <h1 className="text-sm mt-2 opacity-80">
                        + 8 from yesterday
                      </h1>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
            {/*  */}
            <div className="px-5 pt-5 flex flex-row items-center justify-between">
              <h1 className="font-bold text-2xl">Recent Orders</h1>
              <Button>All Order History</Button>
            </div>
            {/* button create order */}
            <div className="p-5">
              <Table>
                <TableCaption className="text-foreground">
                  A list of your outlets recent orders.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead> */}
                    <TableHead>Order ID</TableHead>
                    <TableHead>Outlet</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.orderId}>
                      <TableCell className="font-base">
                        {invoice.orderId}
                      </TableCell>
                      <TableCell>{invoice.outlet}</TableCell>
                      <TableCell>{invoice.items.length}</TableCell>
                      <TableCell>{invoice.driver}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                      <TableCell>
                        <Button variant={"neutral"}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
        {role === "outlet" && (
          <>
            <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
              <div>
                <h1 className="text-2xl font-bold">Outlet Dashboard</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="neutral">Activity Log</Button>
                <Button onClick={navigateRequestOrder}>Create Order</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
