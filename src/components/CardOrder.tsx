import { OrderStatus, OrderType } from "@/types";
import { BadgeStatusColor } from "./BadgeStatusColor";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type CardOrder = {
  el: OrderType;
  nameButton: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
};

export const CardOrderComponent: React.FC<CardOrder> = ({
  el,
  nameButton,
  click,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row w-full justify-between items-center">
          <h1>{el?._id}</h1>
          <BadgeStatusColor status={el?.status as OrderStatus} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">Outlet</h1>
            <h1>{el?.outlet?.name}</h1>
          </div>
          <div>
            <h1 className="text-lg font-bold">Date Requested</h1>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {el?.items?.map((el) => {
                return (
                  <TableRow key={el.name}>
                    <TableCell className="font-base">{el.name}</TableCell>
                    <TableCell>{el.quantity}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={click} className="w-full">
          <CheckCircle2 />
          {nameButton}
        </Button>
      </CardFooter>
    </Card>
  );
};
