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
import { NewLessonForm } from "@/components/new-lesson-form";
import { PlusIcon } from "@radix-ui/react-icons";


export function NewLessonDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="blue" className="w-12 h-12"><PlusIcon/></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Lección</DialogTitle>
        </DialogHeader>
        <NewLessonForm />
      </DialogContent>
    </Dialog>
  );
}
