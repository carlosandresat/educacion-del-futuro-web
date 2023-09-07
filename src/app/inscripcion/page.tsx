"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "@/components/ui/use-toast";
import {OfertaTable} from "@/components/shadcn-tables";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  cedula: z.string().min(10, {
    message: "El número de cédula debe tener 10 dígitos.",
  }).max(10, {
    message: "El número de cédula debe tener 10 dígitos.",
  }),
  telefono: z.string().min(7, {
    message: "El número de telefono debe tener al menos 7 dígitos.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  carrera: z.string().min(3, {
    message: "La carrera debe tener al menos 3 caracteres.",
  }),
  contacto: z.string().min(3, {
    message: "El nombre del contacto debe tener al menos 3 caracteres.",
  }),
  contacto_telefono: z.string().min(7, {
    message: "El número de telefono debe tener al menos 7 dígitos.",
  }),

});

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    console.log(data);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 max-w-screen-xl"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres y Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: Juan Fernando Ponce Guzman" {...field} />
                </FormControl>
                <FormDescription>
                  Los nombres y apellidos del estudiante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cedula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cédula</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: 1723456789" {...field} />
                </FormControl>
                <FormDescription>
                Número de Cédula del Estudiante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: 0987654321" {...field} />
                </FormControl>
                <FormDescription>
                Número de teléfono/celular del Estudiante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ejemplo: nombre.apellido@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Correo electrónico del estudiante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carrera"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carrera deseada:</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: Medicina" {...field} />
                </FormControl>
                <FormDescription>
                Carrera deseada por el Estudiante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contacto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Contacto de Emergencia</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: Ariel Huera" {...field} />
                </FormControl>
                <FormDescription>
                Nombre de contacto de emergencia del Estudiante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contacto_telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contacto de Emergencia</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: 0987654321" {...field} />
                </FormControl>
                <FormDescription>
                Número de teléfono/celular del contacto de Emergencia del Estudiante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
