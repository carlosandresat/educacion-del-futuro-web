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


export function NewClassDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nueva Clase</Button>
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
