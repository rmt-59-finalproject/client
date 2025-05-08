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
import { toast } from "sonner";

export default function DialogDeleteModal({ id }: { id: string }) {
  async function handleDelete() {
    try {
      const data = await http.delete(`/inventory/${id}`, {
        withCredentials: true,
      });

      console.log(data);
      toast.success(data.data.message);
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
        <AlertDialogContent className="font-[family-name:Montserrat]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This action will permanently delete
              the product data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
