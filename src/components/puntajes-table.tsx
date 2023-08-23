import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  export function PuntajesTable(tableData: any) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Institución</TableHead>
            <TableHead>Carrera</TableHead>
            <TableHead>Campus/Provincia</TableHead>
            <TableHead>Modalidad/Jornada</TableHead>
            <TableHead>Puntaje Referencial</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          tableData.tableData.length == 0 ? 
      
            <TableRow>
              <TableCell className="font-medium">No hay resultados</TableCell>
            </TableRow>
            
          :
            tableData.tableData.map((row:any) => (
              <TableRow key={row.invoice}>
                <TableCell className="font-medium">{row.universidad}</TableCell>
                <TableCell>{row.carrera}</TableCell>
                <TableCell>{row.campus}</TableCell>
                <TableCell>{row.modalidad} / {row.jornada}</TableCell>
                <TableCell>{row.puntaje}</TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    )
  }