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
import { AssistanceSchema } from "@/schemas";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

export const AssistanceTab = () => {
  const initialClasses = [
    { id: 1, title: "Clase 1" },
    { id: 2, title: "Clase 2" },
    { id: 3, title: "Clase 3" },
    { id: 4, title: "Clase 4" },
    { id: 5, title: "Clase 5" },
    { id: 6, title: "Clase 6" },
    { id: 7, title: "Clase 7" },
    { id: 8, title: "Clase 8" },
    { id: 9, title: "Clase 9" },
    { id: 10, title: "Clase 10" },
    { id: 11, title: "Clase 11" },

  ];

  const initialStudents = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "David Wilson" },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [classes, setClasses] = useState(initialClasses);



  const defaultValues: z.infer<typeof AssistanceSchema> = {
    students: students.map((student) => ({
      studentId: student.id,
      register: classes.map((hw) => ({
        classId: hw.id,
        assistance: "A", // Random grade for sample
      })),
    })),
  };

  const assistanceForm = useForm<z.infer<typeof AssistanceSchema>>({
    resolver: zodResolver(AssistanceSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset } = assistanceForm;

  const { fields } = useFieldArray({
    control,
    name: "students",
  });

  const onSubmit = async (data: z.infer<typeof AssistanceSchema>) => {
    

    try {
      // Placeholder for server-side logic
      // Replace this with actual server action integration
      console.log("Submitting Data:", data);

      // Simulate server processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success toast
      toast({
        title: "Assistance Updated",
        description: "Assistance register have been successfully updated.",
      });

      // Optionally reset the form or handle post-submission logic
      reset();
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
        <NewClassDialog />
        <Button onClick={handleSubmit(onSubmit)} variant="blue">
          Guardar Cambios
        </Button>
      </div>
      <Form {...assistanceForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border rounded-lg w-full p-4"
        >
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Student Name</TableHead>
                  {classes.map((hw) => (
                    <TableHead key={hw.id}>{hw.title}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell className="font-medium">
                      {/* Display student name */}
                      <Input value={students[index]?.name} disabled />
                    </TableCell>
                    {classes.map((hw, hwIndex) => (
                      <TableCell key={hw.id}>
                        <FormField
                          control={control}
                          name={`students.${index}.register.${hwIndex}.assistance`}
                          render={({ field }) => (
                            <FormItem>
                                <Select
                                 onValueChange={field.onChange} value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="P">P</SelectItem>
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="F">F</SelectItem>
                                  </SelectContent>
                                </Select>
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
