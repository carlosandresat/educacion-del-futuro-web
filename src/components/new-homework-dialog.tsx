"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewHomeworkForm } from "@/components/new-homework-form";
import { PlusIcon } from "@radix-ui/react-icons"


export function NewHomeworkDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="blue" className="w-12 h-12"><PlusIcon/></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Tarea</DialogTitle>
        </DialogHeader>
        <NewHomeworkForm onCreated={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
