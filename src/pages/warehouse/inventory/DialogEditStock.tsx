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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { http } from "@/helpers/axios";

export default function DialogEditStock({ id }: { id: string }) {
  const formSchema = z.object({
    stock: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const data = await http.patch(
        `/inventory/${id}`,
        {
          stock: Number(values.stock),
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Edit Stok
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Stok untuk Lepo</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="neutral">Keluar</Button>
              </DialogClose>
              <Button type="submit">Tambah Item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
