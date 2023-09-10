"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Login } from "@/components/login";
import Link from "next/link";

import { MainMenu } from "@/components/main-menu";

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
    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setScrollDir("scrolling up");
    }, 200);
    return () => clearTimeout(delayTimer);
  }, []);

  return (
    <nav
      className={`bg-secondary p-4 sticky top-0 z-10 duration-500 ${
        scrollDir === "scrolling down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container flex flex-col justify-center items-center w-full">
        {/* className="hidden md:flex space-x-4"o */}
        <a href="/">
          <Image
            src="/next.svg"
            alt="Logo"
            width={200}
            height={200}
            className="dark:invert"
          />
        </a>
        <div className="flex flex-row justify-center w-full pt-6">
          <div className="">
            <MainMenu></MainMenu>
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
