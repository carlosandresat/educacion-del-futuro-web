"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { register } from "@/actions/register"; 

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { RegisterSchema } from "@/schemas";

import { toast } from "@/components/ui/use-toast";


export function NewUserForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {


    startTransition(async ()=>{
      const response = await register(data)
      if(!response.error){
        toast({
          title: "¡Pre-Registro completo!",
          description:
            "Gracias por tu pre-registro. Síguenos en nuestras redes sociales para mantenerte al tanto de Tuto-U.",
        });
      } else {
        toast({
          title: "¡Error en Pre-Registro!",
          description:
            response.error,
        });
      }
    })

    
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Ingresa tus nombres.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Institucional</FormLabel>
              <FormControl>
                <Input
                  placeholder="nombre.apellido@yachaytech.edu.ec"
                  disabled={isPending}
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ingresa tu correo institucional.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="Min. 8 caracteres"
                  type="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ingresa una contraseña para ingresar a Tuto-U.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">Registrar</Button>
      </form>
    </Form>
  );
}
