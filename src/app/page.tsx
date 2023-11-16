"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TerminosCondiciones } from "@/components/terminos-condiciones";


export default function Cursos() {
  const [isRegisterBarVisible, setIsRegisterBarVisible] = useState(false);

  useEffect(() => {
    if(window.location.pathname === "/") {
    const delayTimer = setTimeout(() => {
      setIsRegisterBarVisible(true);
    }, 1000);
    return () => clearTimeout(delayTimer);
  } else {
    setIsRegisterBarVisible(true);
  }
  }, []);

  return (
    <>
    
      <video
        className="elementor-background-video-hosted elementor-html5-video absolute top-0 left-0 w-full h-full object-cover opacity-90"
        autoPlay
        muted
        playsInline
        loop
        src="https://res.cloudinary.com/djqqonsys/video/upload/v1699916216/v4gbgvqlcsrz9bqx1sav.mp4"
      ></video>
      <div className={`flex absolute bottom-12 w-full justify-center flex-wrap md:space-x-4 duration-300 ${
      !isRegisterBarVisible ? "translate-y-28" : "translate-y-0"
    }`}>
      <TerminosCondiciones text="Inscríbete Ahora" style="rounded-full p-6 bg-secondary/80 hover:bg-secondary w-60 text-lg" variant="secondary"></TerminosCondiciones>
      <Link href="/inscripcion/gratis" >
        <Button className="rounded-full p-6 bg-primary/80 hover:bg-primary w-60 text-lg">Clases Gratis</Button>
      </Link>
      </div>
    </>
  );
}
