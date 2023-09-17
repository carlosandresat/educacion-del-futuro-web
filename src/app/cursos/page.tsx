import { CursosAccordion } from "@/components/cursos-accordion";


export default function Cursos() {
  return (
    <div className="flex min-h-screen flex-col items-center p-6 md:p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Nuestros Cursos
      </h2>
      <CursosAccordion></CursosAccordion>
    </div>
  );
}
