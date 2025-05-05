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
import { OrderStatus, OrderType } from "@/types";
import { BadgeStatusColor } from "./BadgeStatusColor";
import { http } from "@/helpers/axios";

export default function TableHistoryOrder({
  orderData,
}: {
  orderData: OrderType[];
}) {
  const navigate = useNavigate();

  function navigateDetailOrder(id: string) {
    console.log(id);

    navigate(`/orders/${id}`);
  }
  return (
    <Table>
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
          <TableRow key={invoice?._id}>
            <TableCell className="font-base">{invoice?._id}</TableCell>
            <TableCell>{invoice?.outlet?.name}</TableCell>
            <TableCell>{invoice?.items?.length}</TableCell>
            <TableCell>{invoice?.driver?.name}</TableCell>
            <TableCell>
              <BadgeStatusColor status={invoice.status as OrderStatus} />
            </TableCell>

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
