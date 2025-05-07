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
import { useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function DialogEditStock({ id }: { id: string }) {
  const closeRef = useRef(null);
  const navigate = useNavigate();
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
      const { data } = await http.patch(`/inventory/${id}`, {
        stock: Number(values.stock),
      });
      console.log(data);
      // Close the dialog after action
      // navigate("/warehouse/inventory");
      navigate(0)
      closeRef.current?.click();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <Dialog>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button className="bg-[var(--teal)]">
            <Plus className="mr-2 h-4 w-4" /> Edit Stok
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] font-[family-name:Montserrat]">
          <DialogHeader>
            <DialogTitle className="font-[family-name:Space_Mono]">
              Edit Stok untuk Lepo
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="font-[family-name:Space_Mono] space-y-8"
          >
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
                <Button variant="neutral">Close</Button>
              </DialogClose>
              <Button type="submit">Add Item</Button>
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
