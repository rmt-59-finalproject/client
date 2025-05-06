import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function FilterHistoryOrder({
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <Select onValueChange={setFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Orders" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
