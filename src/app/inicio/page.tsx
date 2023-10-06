import { NoticiaCard } from "@/components/noticia-card";
import { Separator } from "@/components/ui/separator";
import { MissionVision } from "@/components/mision-vision";
import { OfertaTable } from "@/components/shadcn-tables";
import { ProfesorCard } from "@/components/profesores-card";
import { profesoresActivos } from "@/data/profesores";
import { TeamCard } from "@/components/team-card";
import { register } from 'swiper/element/bundle';
import { TeamArea } from "@/components/team-area";

register();

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
        <MissionVision></MissionVision>
      <Separator />

      
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5">
        Nuestro Equipo
      </h2>

      <TeamArea></TeamArea>

      

      <Separator />


      <h2
        className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6"
        id="recursos"
      >
        Recursos
      </h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-screen-xl">
        <NoticiaCard></NoticiaCard>
        <NoticiaCard></NoticiaCard>

        <NoticiaCard></NoticiaCard>
      </div>

      <Separator />

      <h2
        className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6"
        id="puntajes_referenciales"
      >
        Puntajes Referenciales
      </h2>

      <OfertaTable></OfertaTable>
      <Separator />
    </div>
  );
}
