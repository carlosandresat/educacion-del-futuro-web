"use client";

import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { login } from "@/actions/login";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";


import { LoginSchema } from "@/schemas";

export function Login() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async ()=>{
      const response = await login(data);
      if(response && response.error) {
        toast({
          title: "¡Error!",
          description:
            response.error,
        });
      } else {
        setIsOpen(false)
      }
    })
  }

  const [isOpen, setIsOpen] = useState<boolean>()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center justify-center top-6 md:top-1/3 w-12 h-12 fixed right-2 md:right-8 rounded-full bg-main hover:bg-main/80 z-10">
        <PersonIcon className="invert"></PersonIcon>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Ingresa a tu cuenta EDF</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input
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
        
      </DialogContent>
    </Dialog>
  );
}
