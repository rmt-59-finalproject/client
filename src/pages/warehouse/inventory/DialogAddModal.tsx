import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function DialogAddModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Item
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Item Inventori</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Nama Produk</Label>
              <Input id="name-1" name="name" placeholder="Nama Item" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Stok Produk</Label>
              <Input id="username-1" name="username" placeholder="0" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Unit</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="pcs, kg, liter, dll"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Kategori</Label>
              <Input id="username-1" name="username" placeholder="Kategori" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="neutral">Keluar</Button>
            </DialogClose>
            <Button type="submit">Tambah Item</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
