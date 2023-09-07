import { CursosAccordion } from "@/components/cursos-accordion";
import { Separator } from "@/components/ui/separator";
import { ProfesorCard } from "@/components/profesores-card";
import { profesoresActivos } from "@/data/profesores";

export default function Cursos() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Nuestros Cursos
      </h2>

      <CursosAccordion></CursosAccordion>

      <Separator />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5">
        Nuestros Profesores
      </h2>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-w-screen-xl">
        {profesoresActivos.map((profesor) => (
          <ProfesorCard
            key={profesor.name}
            profesor={profesor}
            className="w-auto"
            aspectRatio="portrait"
            width={250}
            height={330}
          />
        ))}
      </div>
    </div>
  );
}
