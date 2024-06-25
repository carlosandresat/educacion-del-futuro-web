"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Login } from "@/components/login";
import { MainMenu } from "@/components/main-menu";
import { usePathname } from "next/navigation"
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function MainNavbar() {
  const [scrollDir, setScrollDir] = useState("scrolling down");

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
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  useEffect(() => {
    if(window.location.pathname === "/") {
    const delayTimer = setTimeout(() => {
      setScrollDir("scrolling up");
    }, 1000);
    return () => clearTimeout(delayTimer);
  } else {
    setScrollDir("scrolling up");
  }
  }, []);

  const pathname = usePathname()

  if(pathname === '/dashboard' || pathname === '/profesor') {
    return null
  }

  return (
    <nav
      className={`${pathname === "/" ? "bg-transparent" : "bg-secondary"} p-4 sticky top-0 z-10 duration-300 ${
        scrollDir === "scrolling down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container flex flex-col justify-center items-center">
        {/* className="hidden md:flex space-x-4"o */}
        <a href="/" className=" max-w-[240px] w-full">
        <AspectRatio ratio={10 / 4}>

          <Image
            src="/logoEDF.png"
            alt="Logo"
            fill={true}
            className="justify-start rounded-md object-cover"
          />
          </AspectRatio>
        </a>
        <div className="flex flex-row justify-center w-full">
          <div className="">
            <MainMenu isTransparent = {pathname === "/"}></MainMenu>
          </div>
          
          <Login></Login>

          {/*<div className=" self-center fixed  right-2 md:right-8">
            <ModeToggle></ModeToggle>
    </div>*/}
        </div>
      </div>
    </nav>
  );
}
