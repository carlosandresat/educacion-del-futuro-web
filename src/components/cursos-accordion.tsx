"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Image from "next/image";

export function CursosAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionChange = (value: string) => {
    if (value === "") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="flex items-center flex-wrap my-10 max-w-screen-xl w-full">
      <Accordion
        type="single"
        collapsible
        className={`w-full ${isOpen ? "md:w-full" : "md:w-3/4"} p-4`}
        onValueChange={handleAccordionChange}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Curso 1</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center flex-wrap w-full">
              <div className="w-full md:w-2/3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel
                nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta
                dui, nec fermentum orci aliquam nec. Aenean id tortor quis est
                varius pulvinar. Vestibulum tempus facilisis lectus, quis
                volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum
                metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>Subtema 1</li>
                  <li>Subtema 2</li>
                  <li>Subtema 3</li>
                </ul>
              </div>
              <div className="flex w-full md:w-1/3 lg:w-1/3 p-4 pl-6 justify-center">
                <AspectRatio ratio={3 / 4}>
                  <video
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    src="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4"
                  ></video>
                </AspectRatio>
              </div>
            </div>
            <div className="flex w-full justify-center flex-wrap md:space-x-4">
              <Link href="/cursos">
                <Button variant="secondary" className="rounded-full p-6 w-60">
                  Inscríbete Ahora
                </Button>
              </Link>
              <Link href="/cursos">
                <Button className="rounded-full p-6 w-60">Clases Gratis</Button>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Curso 2</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center flex-wrap w-full">
              <div className="w-full md:w-2/3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel
                nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta
                dui, nec fermentum orci aliquam nec. Aenean id tortor quis est
                varius pulvinar. Vestibulum tempus facilisis lectus, quis
                volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum
                metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>Subtema 1</li>
                  <li>Subtema 2</li>
                  <li>Subtema 3</li>
                </ul>
              </div>
              <div className="flex w-full md:w-1/3 lg:w-1/3 p-4 pl-6 justify-center">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src="/next.svg"
                    alt="Logo"
                    fill={true}
                    className={`rounded-3xl object-fit`}
                  />
                </AspectRatio>
              </div>
            </div>
            <div className="flex w-full justify-center flex-wrap md:space-x-4">
              <Link href="/cursos">
                <Button variant="secondary" className="rounded-full p-6 w-60">
                  Inscríbete Ahora
                </Button>
              </Link>
              <Link href="/cursos">
                <Button className="rounded-full p-6 w-60">Clases Gratis</Button>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Curso 3</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center flex-wrap w-full">
              <div className="w-full md:w-2/3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel
                nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta
                dui, nec fermentum orci aliquam nec. Aenean id tortor quis est
                varius pulvinar. Vestibulum tempus facilisis lectus, quis
                volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum
                metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>Subtema 1</li>
                  <li>Subtema 2</li>
                  <li>Subtema 3</li>
                </ul>
              </div>
              <div className="flex w-full md:w-1/3 lg:w-1/3 p-4 pl-6 justify-center">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src="/next.svg"
                    alt="Logo"
                    fill={true}
                    className={`rounded-3xl object-fit`}
                  />
                </AspectRatio>
              </div>
            </div>
            <div className="flex w-full justify-center flex-wrap md:space-x-4">
              <Link href="/cursos">
                <Button variant="secondary" className="rounded-full p-6 w-60">
                  Inscríbete Ahora
                </Button>
              </Link>
              <Link href="/cursos">
                <Button className="rounded-full p-6 w-60">Clases Gratis</Button>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Curso 4</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center flex-wrap w-full">
              <div className="w-full md:w-2/3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel
                nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta
                dui, nec fermentum orci aliquam nec. Aenean id tortor quis est
                varius pulvinar. Vestibulum tempus facilisis lectus, quis
                volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum
                metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>Subtema 1</li>
                  <li>Subtema 2</li>
                  <li>Subtema 3</li>
                </ul>
              </div>
              <div className="flex w-full md:w-1/3 lg:w-1/3 p-4 pl-6 justify-center">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src="/next.svg"
                    alt="Logo"
                    fill={true}
                    className={`rounded-3xl object-fit`}
                  />
                </AspectRatio>
              </div>
            </div>
            <div className="flex w-full justify-center flex-wrap md:space-x-4">
              <Link href="/cursos">
                <Button variant="secondary" className="rounded-full p-6 w-60">
                  Inscríbete Ahora
                </Button>
              </Link>
              <Link href="/cursos">
                <Button className="rounded-full p-6 w-60">Clases Gratis</Button>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Curso 5</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center flex-wrap w-full">
              <div className="w-full md:w-2/3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel
                nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta
                dui, nec fermentum orci aliquam nec. Aenean id tortor quis est
                varius pulvinar. Vestibulum tempus facilisis lectus, quis
                volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum
                metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>Subtema 1</li>
                  <li>Subtema 2</li>
                  <li>Subtema 3</li>
                </ul>
              </div>
              <div className="flex w-full md:w-1/3 lg:w-1/3 p-4 pl-6 justify-center">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src="/next.svg"
                    alt="Logo"
                    fill={true}
                    className={`rounded-3xl object-fit`}
                  />
                </AspectRatio>
              </div>
            </div>
            <div className="flex w-full justify-center flex-wrap md:space-x-4">
              <Link href="/cursos">
                <Button variant="secondary" className="rounded-full p-6 w-60">
                  Inscríbete Ahora
                </Button>
              </Link>
              <Link href="/cursos">
                <Button className="rounded-full p-6 w-60">Clases Gratis</Button>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex w-full md:w-1/4 lg:w-1/4 p-4 justify-center">
        <Image
          src="/profesor.jpeg"
          alt="Logo"
          width={400}
          height={400}
          className={`rounded-3xl ${isOpen ? "hidden" : "block"}`}
        />
      </div>
    </div>
  );
}
