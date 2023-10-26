"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Login } from "@/components/login";
import { MainMenu } from "@/components/main-menu";
import { usePathname } from "next/navigation"
import Link from "next/link";
import { Button } from "@/components/ui/button";


export function RegisterBar() {
  const [scrollDir, setScrollDir] = useState("scrolling down");
  const pathname = usePathname()

  useEffect(() => {
    const threshold = 100;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  useEffect(() => {
    if(pathname === "/") {
    const delayTimer = setTimeout(() => {
      setScrollDir("scrolling up");
    }, 1000);
    return () => clearTimeout(delayTimer);
  } else {
    setScrollDir("scrolling up");
  }
  }, [pathname]);


  return (
    <div
      className={`bottom-0 p-4 sticky top-0 z-10  duration-300 ${
        scrollDir === "scrolling up" ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex w-full justify-center flex-wrap md:space-x-4">
      <Link href="/cursos" >
        <Button variant="secondary" className="rounded-full p-6 w-60 border md:text-lg">Inscríbete Ahora</Button>
      </Link>
      <Link href="/cursos" >
        <Button className="rounded-full p-6 w-60 md:text-lg">Clases Gratis</Button>
      </Link>
      </div>
    </div>
  );
}