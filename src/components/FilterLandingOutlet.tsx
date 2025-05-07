import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function FilterLandingOutlet({
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <Select onValueChange={setFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Requested" />
        </SelectTrigger>
        <SelectContent className="font-[family-name:Space_Mono]">
          <SelectGroup>
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
