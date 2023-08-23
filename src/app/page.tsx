import { InicioMenubar } from "@/components/inicio-menubar";
import { ModeToggle } from "@/components/toggle-theme";
import { PuntajesTable } from "@/components/puntajes-table";
import { Separator } from "@/components/ui/separator";
import { PuntajesForm } from "@/components/puntajes-form";
import { MissionVision } from "@/components/mision-vision";
import { ProfesorCard } from "@/components/profesores-card";
import { profesoresActivos } from "@/data/profesores";
import { CursosAccordion } from "@/components/cursos-accordion";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/next.svg"
        alt="Logo"
        width={200}
        height={200}
        className="dark:invert mr-4 justify-start"
      />
      <div className="py-6">
        <InicioMenubar></InicioMenubar>
      </div>

      <div className="absolute right-6">
        <ModeToggle></ModeToggle>
      </div>

      <video
        className="elementor-background-video-hosted elementor-html5-video w-494 h-277.875"
        autoPlay
        muted
        playsInline
        loop
        src="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4"
      ></video>

      <Separator />

      <MissionVision></MissionVision>

      <Separator />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6">
        Puntajes Referenciales
      </h2>

      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4">
          {/* Your website content goes here */}
        </div>
      </div>
      <PuntajesForm></PuntajesForm>

      <Separator/>

     
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 my-5">
        Nuestros Cursos
      </h2>

      <CursosAccordion></CursosAccordion>

      <Separator/>



      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5">
        Nuestros Profesores
      </h2>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-w-screen-xl">
        {profesoresActivos.map((profesor) => (
            <ProfesorCard key={profesor.name} profesor={profesor} className="w-auto"
            aspectRatio="portrait"
            width={250}
            height={330}/>
          ))}
        </div>
          
       
    </div>
  );
}
