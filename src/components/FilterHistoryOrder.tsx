import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function FilterHistoryOrder({ setFilter }) {
  return (
    <>
      <Select onValueChange={setFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Orders" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value=" ">All Orders</SelectItem>
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
