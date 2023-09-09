import { InicioMenubar } from "@/components/inicio-menubar";
import { ModeToggle } from "@/components/toggle-theme";
import { NoticiaCard } from "@/components/noticia-card";
import { Separator } from "@/components/ui/separator";
import { PuntajesForm } from "@/components/puntajes-form";
import { MissionVision } from "@/components/mision-vision";
import { ProfesorCard } from "@/components/profesores-card";
import { profesoresActivos } from "@/data/profesores";
import { CursosAccordion } from "@/components/cursos-accordion";
import Sidebar from "@/components/sidebar";
import {OfertaTable} from "@/components/shadcn-tables";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      

      <video
        className="elementor-background-video-hosted elementor-html5-video w-494 h-277.875"
        autoPlay
        muted
        playsInline
        loop
        src="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4"
      ></video>

      <Separator id="mision_vision"/>

      <MissionVision></MissionVision>

      <Separator />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6" id="noticias">
        Recursos
      </h2>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-screen-xl">
        <NoticiaCard></NoticiaCard>
        <NoticiaCard></NoticiaCard>

        <NoticiaCard></NoticiaCard>


        <NoticiaCard></NoticiaCard>
        <NoticiaCard></NoticiaCard>

        <NoticiaCard></NoticiaCard>
        <NoticiaCard></NoticiaCard>
        <NoticiaCard></NoticiaCard>

      </div>

      <Separator />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6" id="puntajes_referenciales">
        Puntajes Referenciales
      </h2>

      <Sidebar />

      <OfertaTable></OfertaTable>
      <Separator />

      
    </div>
  );
}
