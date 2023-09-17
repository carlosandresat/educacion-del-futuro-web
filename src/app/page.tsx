import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Cursos() {
  return (
    <>
      <video
        className="elementor-background-video-hosted elementor-html5-video absolute top-0 left-0 w-full h-full object-cover opacity-90"
        autoPlay
        muted
        playsInline
        loop
        src="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4"
      ></video>
      <div className="flex absolute bottom-12 w-full justify-center flex-wrap md:space-x-4">
      <Link href="/cursos" >
        <Button variant="secondary" className="rounded-full p-6 opacity-80 w-60">Inscríbete Ahora</Button>
      </Link>
      <Link href="/cursos" >
        <Button className="rounded-full p-6 opacity-80 w-60">Clases Gratis</Button>
      </Link>
      </div>
    </>
  );
}
