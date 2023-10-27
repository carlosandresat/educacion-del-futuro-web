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

      

      <Separator className="mt-4"/>
      <div className="max-w-screen-xl w-full">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max"
      id="recursos"
              >
        Recursos
      </h2>

      <div className="text-muted-foreground md:self-start text-xl py-2">
        Herramientas para Águilas
      </div>
      </div>

      
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-screen-xl">
        <NoticiaCard></NoticiaCard>
        <NoticiaCard></NoticiaCard>

        <NoticiaCard></NoticiaCard>
      </div>

      <Separator />

      <div className="max-w-screen-xl w-full">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max"
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
