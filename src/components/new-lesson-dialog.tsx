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


export function NewLessonDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nueva Lección</Button>
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
