import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { OrderType } from "@/types";

export default function TableHistoryOrder({
  orderData,
}: {
  orderData: OrderType[];
}) {
  const navigate = useNavigate();

  function navigateDetailOrder(id: string) {
    navigate(`/orders/${id}`);
  }
  return (
    <Table>
      <TableCaption className="text-foreground">
        A list of your outlets recent orders.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Outlet</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderData.map((invoice) => (
          <TableRow key={invoice._id}>
            <TableCell className="font-base">{invoice._id}</TableCell>
            <TableCell>{invoice.outlet.username}</TableCell>
            <TableCell>{invoice.items.length}</TableCell>
            <TableCell>{invoice.driver.username}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>
              <Button
                variant={"neutral"}
                onClick={() => navigateDetailOrder(invoice._id)}
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
