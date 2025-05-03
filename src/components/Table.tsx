import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemOrder } from "@/types";
import { Checkbox } from "./ui/checkbox";

export default function TableDemo({ data }: { data: ItemOrder[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Id</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Driver Check</TableHead>
          <TableHead>Outlet Check</TableHead>
          <TableHead>Driver Check Time</TableHead>
          <TableHead>Outlet Check Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((el) => (
          <TableRow key={el.productId}>
            <TableCell className="font-base">{el.productId}</TableCell>
            <TableCell>{el.quantity}</TableCell>
            <TableCell>
              <Checkbox checked={el.checkedByDriver ? true : false} />
            </TableCell>
            <TableCell>
              <Checkbox checked={el.checkedByOutlet ? true : false} />
            </TableCell>
            <TableCell>
              {el.driverCheckTime ? el.driverCheckTime : "-"}
            </TableCell>
            <TableCell>
              {el.outletCheckTime ? el.outletCheckTime : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
