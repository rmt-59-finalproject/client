import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { http } from "@/helpers/axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { InventoryItem } from "@/types";
import { Label } from "@/components/ui/label";

export default function DialogEditStock({ id }: { id: string }) {
  const [inventory, setInventory] = useState<InventoryItem>({});
  const [stock, setStock] = useState(inventory.stock);
  const closeRef = useRef(null);
  const navigate = useNavigate();

  async function fetchInventoryById() {
    try {
      const data = await http.get(`/inventory/${id}`, {
        withCredentials: true,
      });
      console.log(data.data, "<---getInventoryById");
      setInventory(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmitForm() {
    try {
      console.log(stock);
      const { data } = await http.patch(`/inventory/${id}`, {
        stock,
      });
      console.log(data);
      closeRef.current?.click();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button onClick={fetchInventoryById}>Edit stock</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit stock of {inventory.name} </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Stock</Label>
              <Input
                id="name-1"
                type="number"
                name="name"
                onChange={(e) => setStock(Number(e.target.value))}
                value={stock}
                defaultValue={inventory.stock}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <div>
                <Button variant="neutral">Cancel</Button>
                <Button onClick={onSubmitForm} ref={closeRef}>
                  Save changes
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
