"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import * as z from "zod"
import { getPuntajesData } from "@/lib/scraping"
import { useState } from "react"
import { PuntajesTable } from "@/components/puntajes-table"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,

} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "./ui/skeleton"

const FormSchema = z.object({
  oferta: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function PuntajesForm() {

  const [tableData, setTableData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadingSkeleton = [{ 
    universidad: <Skeleton className="h-4 w-full"/>, 
    carrera: <Skeleton className="h-4 w-full"/>, 
    campus: <Skeleton className="h-4 w-[200px]"/>, 
    modalidad: <Skeleton className="h-4 w-full"/>, 
    jornada: <Skeleton className="h-4 w-[50px]"/>, 
    puntaje: <Skeleton className="h-4 w-[200px]"/> 
  }]

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    const response = await getPuntajesData(data.oferta)
    setTableData(response as any)
    setLoading(false)
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 py-6">
      <div className="flex w-full items-center space-x-2 justify-center">
        
        <FormField
          control={form.control}
          name="oferta"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Buscar Oferta Académica..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>Buscar</Button>
        </div>
      </form>
    </Form>

      <PuntajesTable tableData={loading ? loadingSkeleton : tableData}/>
    
    </>
  )
}
