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
        
      </DialogContent>
    </Dialog>
  );
}
