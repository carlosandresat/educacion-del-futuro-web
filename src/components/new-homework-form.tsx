"use client";

import { Button } from "@/components/ui/button";


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
import { Label } from "@/components/ui/label";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { NewHomeworkSchema } from "@/schemas";
import { usePathname } from 'next/navigation';
import { createHomework } from "@/actions/teacher";


export function NewHomeworkForm() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname()

  const form = useForm<z.infer<typeof NewHomeworkSchema>>({
    resolver: zodResolver(NewHomeworkSchema),
  });

  function onSubmit(data: z.infer<typeof NewHomeworkSchema>) {
    startTransition(async () => {
      const courseOfferingId = Number(pathname.split("/").at(-1))
        const formattedData = {
          courseOfferingId,
          title: data.title,
          description: data.description,
          dueDate: data.dueDate
        }
        try {
          await createHomework(formattedData);
          toast({
            title: "Se ha creado una nueva tarea",
          })
        } catch (error) {
          toast({
            title: "¡Ha habido un error!",
          })
        }
        
      
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Fecha de entrega</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/y")
                        ) : (
                          <span>Escoge una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        
        <Button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto"
          variant="blue"
        >
          Ingresa
        </Button>

      </form>
    </Form>

  );
}
