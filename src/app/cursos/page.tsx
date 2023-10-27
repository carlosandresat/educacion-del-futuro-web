import { CursosAccordion } from "@/components/cursos-accordion";


export default function Cursos() {
  return (
    <div className="flex min-h-screen flex-col items-center p-6 md:p-12">
      <div className="max-w-screen-xl w-full">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max">
        Nuestros Cursos
      </h2>

      <div className="text-muted-foreground md:self-start text-xl py-2">
        Explora tu próxima aventura
      </div>
      </div>
      <CursosAccordion></CursosAccordion>
    </div>
  );
}
