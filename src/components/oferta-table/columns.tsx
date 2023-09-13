"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Can be used a Zod schema here in future.
export type OfertaAcademica = {
  id: string;
  universidad: string;
  carrera: string;
  campus: string;
  modalidad: string;
  jornada: string;
  puntaje: string;
};

export const columns: ColumnDef<OfertaAcademica>[] = [
  {
    accessorKey: "universidad",
    header: "Institución",
  },
  {
    accessorKey: "carrera",
    header: "Carrera",
  },
  {
    accessorKey: "campus",
    header: "Campus/Provincia",
  },
  {
    accessorKey: "modalidad",
    header: "Modalidad",
  },
  {
    accessorKey: "jornada",
    header: "Jornada",
  },
  {
    accessorKey: "puntaje",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Puntaje Referencial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const puntaje:string = row.getValue("puntaje");
      return (
        <div className="flex items-center justify-center">
          {puntaje}
        </div>
      );
    },
  },
];
