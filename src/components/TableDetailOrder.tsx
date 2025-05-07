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
import { formatDate } from "@/lib/utils";

export default function TableDetailOrder({ data }: { data: ItemOrder[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Produk</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Status Cek Driver</TableHead>
          <TableHead>Status Cek Outlet</TableHead>
          <TableHead>Tanggal Cek Driver</TableHead>
          <TableHead>Tanggal Cek Outlet</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((el) => (
          <TableRow key={el._id}>
            <TableCell className="font-base">{el.name}</TableCell>
            <TableCell>{el.quantity}</TableCell>
            <TableCell>{el.unit}</TableCell>
            <TableCell>
              <Checkbox checked={el.checkedByDriver ? true : false} />
            </TableCell>
            <TableCell>
              <Checkbox checked={el.checkedByOutlet ? true : false} />
            </TableCell>
            <TableCell>
              {el.driverCheckTime ? formatDate(el.driverCheckTime) : "-"}
            </TableCell>
            <TableCell>
              {el.outletCheckTime ? formatDate(el.outletCheckTime) : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
