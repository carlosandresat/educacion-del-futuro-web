import { Inscripciones } from "@/components/inscripciones";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TerminosCondiciones } from "@/components/terminos-condiciones";

export default function Inscripcion() {
  return (
    <div className="flex flex-col items-center p-6 md:p-12">
      <blockquote className="mt-6 italic text-xl">
        &quot;No esperes más. ¡Inicia este emocionante camino ahora!&quot;
      </blockquote>
      <Link href="/cursos" className="mt-6"><Button variant="outline" className="text-lg">¿Ya escogiste tu curso?</Button></Link>

      <Separator className="mt-8" />

      <div className="max-w-screen-xl w-full">

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max ">
        Clases Demostrativas
      </h2>
      <div className="text-muted-foreground md:self-start text-xl py-2">
        ¿Aún indeciso? Prueba nuestras clases demostrativas y descubre la experiencia EDF
      </div>
      <Link href="/inscripcion/gratis" className=" self-start"><Button className="rounded-full p-6 my-4 text-lg" variant="blue">Ver más...</Button></Link>
      </div>

      <Separator className="mt-4" />
      <div className="max-w-screen-xl w-full">

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max">
        Inscríbete Ahora
      </h2>
      <div className="text-muted-foreground md:self-start text-xl py-2">
        ¿Ya sientes la llamada a la aventura? Únete a nuestro curso completo y emprende un vuelo transformador en tu educación
      </div>
      <TerminosCondiciones text="Ver más..." style="rounded-full p-6 my-4 text-lg" variant="blue"></TerminosCondiciones>
      </div>

      <Separator className="mt-4" />

      <blockquote className="mt-6 italic text-xl">
        El equipo EDF te promete que no solo tu educación, sino tu vida cambiará para siempre
      </blockquote>
    </div>
  );
}