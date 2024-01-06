"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TerminosCondiciones } from "@/components/terminos-condiciones";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";

export default function Cursos() {
  const [isRegisterBarVisible, setIsRegisterBarVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/") {
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
        muted={isMuted}
        playsInline
        loop
        src="https://res.cloudinary.com/djqqonsys/video/upload/v1699916216/v4gbgvqlcsrz9bqx1sav.mp4"
      ></video>
      <Button className="absolute left-8 w-12 h-12 p-0 invisible md:visible" variant="blue" onClick={() => setIsMuted(!isMuted)}>
        { isMuted ?
          <PlayIcon></PlayIcon> :
          <PauseIcon className=" animate-spin duration-1000"></PauseIcon>}
      </Button>
      <div
        className={`flex absolute bottom-12 w-full justify-center flex-wrap md:space-x-4 duration-300 ${
          !isRegisterBarVisible ? "translate-y-28" : "translate-y-0"
        }`}
      >
        <TerminosCondiciones
          text="Inscríbete Ahora"
          style="rounded-full p-6 bg-secondary/80 hover:bg-secondary w-60 text-lg"
          variant="secondary"
        ></TerminosCondiciones>
        <Link href="/inscripcion/gratis">
          <Button className="rounded-full p-6 bg-main/80 hover:bg-main w-60 text-lg">
            Clases Demostrativas
          </Button>
        </Link>
      </div>
    </>
  );
}
