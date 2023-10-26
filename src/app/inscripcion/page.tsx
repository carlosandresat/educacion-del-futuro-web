"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { colegios_riobamba } from "@/data/colegios_riobamba";
import { OfertaTable } from "@/components/shadcn-tables";

const FormSchema = z.object({
  curso: z.string(),
  horario: z.string(),
  nombres: z.string().min(6, {
    message: "Tu nombre debe tener al menos 6 caracteres.",
  }),
  cedula: z
    .string()
    .min(10, {
      message: "El número de cédula debe tener 10 dígitos.",
    })
    .max(10, {
      message: "El número de cédula debe tener 10 dígitos.",
    }),
  telefono: z.string().min(7, {
    message: "El número de telefono debe tener al menos 7 dígitos.",
  }),
  genero: z.string(),
  academic_year: z.string(),
  colegio: z.string(),
  condicion_salud: z.string().max(100, {
    message: "La condición de salud debe tener menos de 100 caracteres.",
  }),
  representante_nombres: z
    .string()
    .min(6, {
      message: "Tu nombre debe tener al menos 6 caracteres.",
    })
    .max(100, {
      message: "Tu nombre debe tener menos de 100 caracteres.",
    }),
  representante_celular: z.string().min(7, {
    message: "El número de telefono debe tener al menos 7 dígitos.",
  }),
  representante_convencional: z.string().min(7, {
    message: "El número de telefono debe tener al menos 7 dígitos.",
  }),
  representante_email: z.string().email({
    message: "Invalid email address.",
  }),
  represntante_direccion: z.string().min(6, {
    message: "La dirección debe tener al menos 6 caracteres.",
  }),
  carrera: z.string(),
  no_examenes: z.string(),
  expectativas: z.string().max(100, {
    message: "Las expectativas deben tener menos de 100 caracteres.",
  }),
  descubierto_por: z.string(),
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
    });
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
            name="curso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona tu curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Curso 1</SelectItem>
                      <SelectItem value="dark">Curso 2</SelectItem>
                      <SelectItem value="system">Curso 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Escoge tu siguiente aventura</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="horario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horario</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona tu horario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Horario 1</SelectItem>
                      <SelectItem value="dark">Horario 2</SelectItem>
                      <SelectItem value="system">Horario 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Escoge tu horario de preferencia
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres y Apellidos</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ejemplo: Juan Fernando Ponce Guzman"
                    {...field}
                  />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona tu género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">Masculino</SelectItem>
                      <SelectItem value="f">Femenino</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="academic_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso Académico</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona tu año" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="m">2do Bachillerato</SelectItem>
                      <SelectItem value="f">3ro Bachillerato</SelectItem>
                      <SelectItem value="other">Graduado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Escoge tu horario de preferencia
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="colegio"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Colegio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[500px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? colegios_riobamba.find(
                              (colegio) => colegio.name === field.value
                            )?.name
                          : "Selecciona un colegio"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[500px] p-0 ">
                    <Command>
                      <CommandInput
                        placeholder="Buscar colegio..."
                        className="h-9"
                      />
                      <CommandEmpty>No se ha encontrado colegio</CommandEmpty>
                      <ScrollArea className="h-52">
                        <CommandGroup>
                          {colegios_riobamba.map((colegio) => (
                            <CommandItem
                              value={colegio.name}
                              key={colegio.code}
                              onSelect={() => {
                                form.setValue("colegio", colegio.name);
                              }}
                            >
                              {colegio.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  colegio.name === field.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Escoge tu colegio</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condicion_salud"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condición de Salud</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ejemplo: Asma, Depresión, TDAH"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Condición de salud del Estudiante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="representante_nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres y Apellidos del Representante</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ejemplo: Juan Fernando Ponce Guzman"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Nombres y apellidos del representante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="representante_celular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular del Representante</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: 0987654321" {...field} />
                </FormControl>
                <FormDescription>
                  Número de celular del representante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="representante_convencional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Convencional del Representante</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: 022345678" {...field} />
                </FormControl>
                <FormDescription>
                  Número de convencional del representante
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="representante_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email del Representante</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ejemplo: juan.ponce@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Email del representante</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="represntante_direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección del Representante</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ejemplo: Av. Amazonas y Naciones Unidas"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Dirección del representante</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carrera"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carrera</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona tu carrera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">Medicina</SelectItem>
                      <SelectItem value="f">Ingeniería</SelectItem>
                      <SelectItem value="other">Administración</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Escoge tu carrera de preferencia
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="no_examenes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de exámenes</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: 3" {...field} />
                </FormControl>
                <FormDescription>
                  Número de exámenes que ha rendido
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expectativas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expectativas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ejemplo: Aprender a estudiar"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Expectativas del estudiante</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descubierto_por"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descubierto por</FormLabel>
                <FormControl>
                  <Input placeholder="Ejemplo: Google" {...field} />
                </FormControl>
                <FormDescription>¿Cómo nos descubriste?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
