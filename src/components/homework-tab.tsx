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
import { useState, useTransition } from "react";
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

const HomeworkTab = () => {
  const initialHomeworks = [
    { name: "John Doe", homework1: 85, homework2: 92, homework3: 78 },
    { name: "Jane Smith", homework1: 92, homework2: 88, homework3: 85 },
    { name: "Michael Johnson", homework1: 78, homework2: 82, homework3: 90 },
    { name: "Emily Davis", homework1: 90, homework2: 85, homework3: 92 },
    { name: "David Wilson", homework1: 85, homework2: 90, homework3: 88 },
  ];

  const homeworksForm = useForm({
    resolver: zodResolver(HomeworksSchema),
    defaultValues: {
      students: initialHomeworks,
    },
  });

  const { control: controlHomeworks, handleSubmit: handleSubmitHomeworks } =
    homeworksForm;

  const { fields: fieldsHomeworks } = useFieldArray({
    control: controlHomeworks,
    name: "students",
  });

  const onSubmitHomeworks = (data: z.infer<typeof HomeworksSchema>) => {
    // Handle form submission, e.g., send data to the server
    toast({
      title: "Homeworks Updated",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <NewHomeworkDialog />
        <Button
          onClick={() => handleSubmitHomeworks(onSubmitHomeworks)()}
          variant="blue"
        >
          Guardar Cambios
        </Button>
      </div>
      <Form {...homeworksForm}>
        <form
          onSubmit={handleSubmitHomeworks(onSubmitHomeworks)}
          className="border rounded-lg w-full p-4"
        >
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Student Name</TableHead>
                  <TableHead>Homework 1</TableHead>
                  <TableHead>Homework 2</TableHead>
                  <TableHead>Homework 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fieldsHomeworks.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell className="font-medium">
                      <FormField
                        control={controlHomeworks}
                        name={`students.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={controlHomeworks}
                        name={`students.${index}.homework1`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={controlHomeworks}
                        name={`students.${index}.homework2`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={controlHomeworks}
                        name={`students.${index}.homework3`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
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
