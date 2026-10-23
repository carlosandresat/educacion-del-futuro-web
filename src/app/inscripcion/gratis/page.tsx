"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ClaseDemostrativaSchema } from "@/schemas";
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
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { colegios_riobamba } from "@/data/colegios_riobamba";


export default function Gratis() {
  const form = useForm<z.infer<typeof ClaseDemostrativaSchema>>({
    resolver: zodResolver(ClaseDemostrativaSchema),
  });

  async function onSubmit(data: z.infer<typeof ClaseDemostrativaSchema>) {
    const res = await fetch("/api/clases-demostrativas", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast({
        title: "Registro exitoso",
        description: "Felicidades por tu registro.",
      });
    } else {
      toast({
        title: "Registro fallido",
        description:
          "Hubo un error en nuestros servidores, inténtalo de nuevo más tarde.",
      });
    }
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 max-w-screen-xl"
        >
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Sección 1: Datos Generales
          </h4>
          <FormField
            control={form.control}
            name="curso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <Select  onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona tu curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Curso de Conocimientos">
                        Curso de Conocimientos
                      </SelectItem>
                      <SelectItem value="Curso de Razonamiento">
                        Curso de Razonamiento
                      </SelectItem>
                      <SelectItem value="Curso para Carreras Especializadas">
                        Curso para Carreras Especializadas
                      </SelectItem>
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
                  <Select  onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona tu horario" />
                    </SelectTrigger>
                    <SelectContent>
                      {form.watch("curso") === "Curso de Conocimientos" ||
                      form.watch("curso") ===
                        "Curso para Carreras Especializadas" ? (
                        <SelectItem value="16:30-18:30">4:30-6:30 PM</SelectItem>
                      ) : form.watch("curso") === "Curso de Razonamiento" ? (
                        <SelectItem value="15:00-16:30">3:00-4:30 PM</SelectItem>
                      ) : null}
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
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pt-6">
            Sección 2: Datos de Registro del Estudiante
          </h4>
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
                  <Select  onValueChange={field.onChange} defaultValue={field.value}>
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
                  <Select  onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona tu año" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="2do Bach">2do Bachillerato</SelectItem>
                      <SelectItem value="3ro Bach">3ro Bachillerato</SelectItem>
                      <SelectItem value="graduado">Graduado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
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
                          "w-full md:w-[500px] xl:w-[800px] justify-between",
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
                  <PopoverContent className="w-[350px] md:w-[500px] xl:w-[800px] p-0 ">
                    <Command>
                      <CommandInput
                        placeholder="Buscar colegio..."
                        className="h-9"
                      />
                      <CommandList>
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
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>                  Si no encuentras tu colegio utiliza la opción &quot;Otro&quot;
</FormDescription>
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
                Por favor, indícanos si tienes alguna condición de salud
                    física, emocional, o cualquier otro desafío personal que
                    enfrentas y consideras que deberíamos conocer para poder
                    apoyarte de la mejor manera. Nuestra única intención es
                    comprenderte y brindarte la guía necesaria para que puedas
                    aprovechar al máximo este viaje educativo.
                  
                    &quot;Recuerda, todos enfrentamos desafíos y estamos aquí
                    para apoyarte en cada paso del camino 😊&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <h4 className="pt-6 scroll-m-20 text-xl font-semibold tracking-tight">
            Sección 3: Información Adicional
          </h4>
          <FormField
            control={form.control}
            name="carrera"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carrera</FormLabel>
                <FormControl>
                <Input
                    placeholder="Ejemplo: Medicina, Ingeniería Civil, Enfermería..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ingresa tu carrera de preferencia
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
                <Select  onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Ninguna</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="2+">Más de 2</SelectItem>

                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                Tu sinceridad nos ayudará a adaptar mejor nuestras estrategias para apoyarte.                </FormDescription>
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
                  <Select  onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="redes sociales">
                        Redes sociales
                      </SelectItem>
                      <SelectItem value="recomendacion">
                        Recomendación
                      </SelectItem>
                      <SelectItem value="eventos/charlas">
                        Eventos/Charlas
                      </SelectItem>
                      <SelectItem value="internet">
                        Búsqueda en Internet
                      </SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>                  ¿Cómo descubriste EDF Academy?
</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
