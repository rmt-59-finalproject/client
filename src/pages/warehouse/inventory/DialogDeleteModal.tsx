import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { http } from "@/helpers/axios";
import { Trash2 } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog"; // adjust as needed
import { useRef } from "react";
import { toast } from "sonner";

export default function DialogDeleteModal({ id }: { id: string }) {
  const closeRef = useRef(null);
  async function handleDelete() {
    try {
      const data = await http.delete(`/inventory/${id}`, {
        withCredentials: true,
      });

      console.log(data);
      toast.success(data.data.message);
      // Close the dialog after action
      closeRef.current?.click();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"neutral"}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus
              data produk secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Lanjutkan Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
