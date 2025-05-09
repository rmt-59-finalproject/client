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
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { http } from "@/helpers/axios";

export default function DialogAddInventory() {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  async function onSubmitForm() {
    try {
      const body = { name, stock: Number(stock), unit, category };

      const data = await http.post("/inventory", body, {
        withCredentials: true,
      });

      if (data.status === 201) {
        toast.success(
          `${data.data.name} with stock ${data.data.stock} ${data.data.unit} created successfully`
        );
      }
      closeRef.current?.click();
    } catch (error) {
      if (error instanceof Error) {
        // Safely access the error message
        toast.error((error as any)?.response?.data?.message || error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Add Inventory Item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name Product</Label>
              <Input
                id="name-1"
                type="text"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Add name product here..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Stock</Label>
              <Input
                id="username-1"
                type="number"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                name="username"
                placeholder="Add stock here..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Unit</Label>
              <Input
                id="username-1"
                type="text"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                value={unit}
                name="username"
                placeholder="Add unit here..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Category</Label>
              <Input
                id="username-1"
                type="text"
                name="username"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Add category here..."
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
