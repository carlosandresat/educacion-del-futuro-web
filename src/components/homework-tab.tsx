"use client";

import { auth, signOut } from "@/auth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewClassDialog } from "@/components/new-class-dialog";
import { NewHomeworkDialog } from "@/components/new-homework-dialog";
import { NewLessonDialog } from "@/components/new-lesson-dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select"; // Assume you have a Select component
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { HomeworksSchema } from "@/schemas";

const HomeworkTab = ({ initialData } : {initialData: {
  students: {
      id: number;
      name: string | null;
  }[];
  homeworks: {
      id: number;
      title: string;
  }[];
  defaultValues: {
      students: {
          studentId: number;
          grades: {
              homeworkId: number;
              grade: number | null;
          }[];
      }[];
  };
}}) => {

  const { students, homeworks, defaultValues } = initialData;



  const homeworksForm = useForm({
    resolver: zodResolver(HomeworksSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset } = homeworksForm;

  const { fields } = useFieldArray({
    control,
    name: "students",
  });

  const onSubmit = async (data: z.infer<typeof HomeworksSchema>) => {
    

    try {
      // Placeholder for server-side logic
      // Replace this with actual server action integration
      console.log("Submitting Data:", data);

      // Simulate server processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success toast
      toast({
        title: "Grades Updated",
        description: "Homework grades have been successfully updated.",
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update grades.",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <NewHomeworkDialog />
        <Button onClick={handleSubmit(onSubmit)} variant="blue">
          Guardar Cambios
        </Button>
      </div>
      <Form {...homeworksForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg w-full p-4">
          <div className="relative w-full overflow-auto">
          <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[150px]">Student Name</TableHead>
      {homeworks.map((hw) => (
        <TableHead key={hw.id}>{hw.title}</TableHead>
      ))}
    </TableRow>
  </TableHeader>
  <TableBody>
    {fields.map((field, index) => (
      <TableRow key={field.id}>
        <TableCell className="font-medium">
          <Input value={students[index]?.name ?? ''} disabled />
        </TableCell>
        {homeworks.map((hw, hwIndex) => (
          <TableCell key={hw.id}>
            <FormField
              control={control}
              name={`students.${index}.grades.${hwIndex}.grade`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Input
  type="number"
  {...field}
  value={field.value ?? ''}
  min={0}
  max={100}
/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>
          </div>
        </form>
      </Form>
    </>
  );
};

export default HomeworkTab;
