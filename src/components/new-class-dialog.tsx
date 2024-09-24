import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewClassForm } from "@/components/new-class-form";
import { PlusIcon } from "@radix-ui/react-icons";


export function NewClassDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue" className="w-12 h-12"><PlusIcon/></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Clase</DialogTitle>
        </DialogHeader>
        <NewClassForm />
      </DialogContent>
    </Dialog>
  );
}
