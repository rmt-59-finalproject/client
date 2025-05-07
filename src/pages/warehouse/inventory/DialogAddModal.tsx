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
import { useRef } from "react";

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
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function DialogEditStock() {
  const closeRef = useRef(null);
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string(),
    stock: z.string(),
    unit: z.string(),
    category: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "0",
      stock: "0",
      unit: "0",
      category: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const { name, stock, unit, category } = values;
      const data = await http.post(
        "/inventory",
        {
          name,
          stock: Number(stock),
          unit,
          category,
        },
        {
          withCredentials: true,
        }
      );
      closeRef.current?.click();
      console.log(data);

      if (data.status === 201) {
        toast.success(
          `${data.data.name} with stock ${data.data.stock} ${data.data.unit} created successfully`
        );
      }
      navigate("/inventories");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).response.data.message);
    }
  }

  return (
    <Dialog>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Item
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-[family-name:Space_Mono]">
              Tambah Item Inventori
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="font-[family-name:Space_Mono] space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Barang</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stok (unit)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit (unit)</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="neutral">Keluar</Button>
              </DialogClose>
              <Button type="submit">Tambah Item</Button>
            </DialogFooter>
            {/* Hidden button to close the dialog */}
            <DialogClose asChild>
              <button type="button" ref={closeRef} className="hidden" />
            </DialogClose>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
