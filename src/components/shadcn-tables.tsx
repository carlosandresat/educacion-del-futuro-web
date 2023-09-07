import { OfertaAcademica, columns } from "@/components/oferta-table/columns"
import { DataTable } from "@/components/oferta-table/data-table"
import ofertaData from "@/data/ofertaData.json" assert {type: "json"}


async function getOfertaData(): Promise<OfertaAcademica[]> {
  // Fetch data from your API here.

  const result = ofertaData.map((oferta, index) => {
    return {
      ...oferta,
        id: index.toString(),
    }
  })
  return result
}

export async function OfertaTable() {

    const oferta = await getOfertaData()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={oferta} />
    </div>
  )
}
