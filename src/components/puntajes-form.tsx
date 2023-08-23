"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

const FormSchema = z.object({
  oferta: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function PuntajesForm() {

  const [tableData, setTableData] = useState<any>([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await getPuntajesData(data.oferta)
    setTableData(response as any)
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
        <Button type="submit">Buscar</Button>
        </div>
      </form>
    </Form>
    <PuntajesTable tableData={tableData}></PuntajesTable>
    </>
  )
}
