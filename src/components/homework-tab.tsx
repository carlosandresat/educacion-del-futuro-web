"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { NewHomeworkDialog } from "@/components/new-homework-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
 // Assume you have a Select component
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { HomeworksSchema } from "@/schemas";
import { updateHomeworkGrades } from "@/actions/teacher";

const HomeworkTab = ({ initialData, courseOfferingId } : {initialData: {
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
}, courseOfferingId:number}) => {

  const { students, homeworks, defaultValues } = initialData;
  const [isPending, startTransition] = useTransition();

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
    startTransition(async () => {


    try {
      // Placeholder for server-side logic
      // Replace this with actual server action integration
      await updateHomeworkGrades(data, courseOfferingId)

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
  })
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <NewHomeworkDialog />
        <Button onClick={handleSubmit(onSubmit)} variant="blue" disabled={isPending}>
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
      {homeworks.map((hw, index) => (
        <TableHead key={hw.id} className="text-center">#{index+1}</TableHead>
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
