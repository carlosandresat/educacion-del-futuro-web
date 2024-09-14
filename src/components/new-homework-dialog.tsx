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


export function NewHomeworkDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nueva Tarea</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Tarea</DialogTitle>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  );
}
