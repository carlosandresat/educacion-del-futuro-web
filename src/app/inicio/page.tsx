import { NoticiaCard } from "@/components/noticia-card";
import { Separator } from "@/components/ui/separator";
import { MissionVision } from "@/components/mision-vision";
import { OfertaTable } from "@/components/shadcn-tables";
import { TeamArea } from "@/components/team-area";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12 ">
      <MissionVision></MissionVision>
      <Separator />

      <div className="max-w-screen-xl w-full">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max">
          ¿Quienes somos?
        </h2>

        <div className="text-muted-foreground md:self-start text-xl py-2">
          Conoce a nuestro equipo
        </div>
      </div>

      <TeamArea></TeamArea>

      <Separator className="mt-4" />
      <div className="max-w-screen-xl w-full">
        <h2
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max"
          id="recursos"
        >
          Recursos
        </h2>

        <div className="text-muted-foreground md:self-start text-xl py-2">
          Herramientas para Águilas
        </div>
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-screen-xl">
        <NoticiaCard
          title="Lectura Rápida"
          description='Potencia tu lectura con "Superlectura" de Jim Kwik. Lee más rápido, absorbe mejor y únete al programa del principal entrenador cerebral que ha elevado el éxito de celebridades y profesionales.'
          link="https://www.youtube.com/watch?v=89_xGorxal8&list=PLOLQjFEIvMEvHy70WHUObtnU58mEwvHxO"
          image="https://img.youtube.com/vi/89_xGorxal8/maxresdefault.jpg"
        ></NoticiaCard>
        <NoticiaCard
          title="Super Cerebro"
          description='Eleva tu mente con el "Supercerebro" de Jim Kwik: Mejora memoria, concentración y aprendizaje utilizando métodos basados en neurociencia. El programa busca superar tus limitaciones y potenciar tu crecimiento personal y profesional.'
          link="https://www.youtube.com/watch?v=wkYzJIVa_wI&list=PL1Podkd0IBAXpcMFK6hgOWvF0RD3eLVlK"
          image="https://img.youtube.com/vi/wkYzJIVa_wI/maxresdefault.jpg"
        ></NoticiaCard>
        <NoticiaCard
          title="Seminario Fenix"
          description='El Seminario Fénix: Transforma tu Vida hacia el Éxito y la Plenitud: Únete a un viaje de autodescubrimiento y empoderamiento personal con el Seminario Fénix. Diseñado para liberar tu verdadero potencial y guiar hacia una vida próspera y feliz, este curso de inmersión de alto impacto integra herramientas de desarrollo personal, coaching transformacional y psicología positiva.'
          link="https://www.youtube.com/watch?v=62wDYoPC4Sg&list=PLVCAyfXUAsByGdNHLdAU9HuuAuTY9gspS"
          image="https://img.youtube.com/vi/62wDYoPC4Sg/maxresdefault.jpg"
        ></NoticiaCard>
      </div>

      <Separator />

      <div className="max-w-screen-xl w-full">
        <h2
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max"
          id="puntajes_referenciales"
        >
          Puntajes Referenciales
        </h2>
      </div>

      <OfertaTable></OfertaTable>
      <Separator />
    </div>
  );
}
