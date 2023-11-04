"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { TestimonioCard } from "@/components/testimonio-card";

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
    <>
      <div className="flex items-center flex-wrap my-10 max-w-screen-xl w-full">
        <div className="grid grid-cols-3 gap-4 w-full">
          <TestimonioCard video="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4" title="Título 1" puntaje="986" pic="testimonio2" pic_orientation="horizontal"></TestimonioCard>
          <TestimonioCard video="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4" title="Título 2" puntaje="986" pic="testimonio1" pic_orientation="vertical"></TestimonioCard>
          <TestimonioCard video="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4" title="Título 3" puntaje="986" pic="testimonio3" pic_orientation="horizontal"></TestimonioCard>
          
        </div>

        <Separator className="my-10" />

        <Accordion
          type="single"
          collapsible
          className={`w-full p-4`}
          onValueChange={handleAccordionChange}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="group text-xl">
              <div className="flex flex-col">
              <div>
                Curso de Conocimientos: Expedición Científica
              </div>
              <p className=" text-lg self-start text-muted-foreground group-data-[state=open]:hidden">
              Lorem ipsum dolor sit amet...
              </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center flex-wrap w-full">
                <div className="w-full md:w-2/3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus
                  porta dui, nec fermentum orci aliquam nec. Aenean id tortor
                  quis est varius pulvinar. Vestibulum tempus facilisis lectus,
                  quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan,
                  dictum metus ut, cursus turpis. Mauris malesuada eget tellus a
                  gravida.
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
                      className="w-full h-full object-cover rounded-md"
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
                  <Button
                    variant="secondary"
                    className="rounded-full p-6 w-60 text-lg"
                  >
                    Inscríbete Ahora
                  </Button>
                </Link>
                <Link href="/cursos">
                  <Button className="rounded-full p-6 w-60 text-lg">
                    Clases Gratis
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="group text-xl">
              <div className="flex flex-col">
              <div>
              Curso de Razonamiento: Ruta del Genio
              </div>
              <p className=" text-lg self-start text-muted-foreground group-data-[state=open]:hidden">
              Lorem ipsum dolor sit amet...
              </p>
              </div>

              
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center flex-wrap w-full">
                <div className="w-full md:w-2/3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus
                  porta dui, nec fermentum orci aliquam nec. Aenean id tortor
                  quis est varius pulvinar. Vestibulum tempus facilisis lectus,
                  quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan,
                  dictum metus ut, cursus turpis. Mauris malesuada eget tellus a
                  gravida.
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
                      className="w-full h-full object-cover rounded-md"
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
                  <Button
                    variant="secondary"
                    className="rounded-full p-6 w-60 text-lg"
                  >
                    Inscríbete Ahora
                  </Button>
                </Link>
                <Link href="/cursos">
                  <Button className="rounded-full p-6 w-60 text-lg">
                    Clases Gratis
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="group text-xl">
              <div className="flex flex-col">
              <div>
              Curso para Carreras Focalizadas: Sendero del Guerrero
              </div>
              <p className=" text-lg self-start text-muted-foreground group-data-[state=open]:hidden">
              Lorem ipsum dolor sit amet...
              </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center flex-wrap w-full">
                <div className="w-full md:w-2/3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus
                  porta dui, nec fermentum orci aliquam nec. Aenean id tortor
                  quis est varius pulvinar. Vestibulum tempus facilisis lectus,
                  quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan,
                  dictum metus ut, cursus turpis. Mauris malesuada eget tellus a
                  gravida.
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
                      className="w-full h-full object-cover rounded-md"
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
                  <Button
                    variant="secondary"
                    className="rounded-full p-6 w-60 text-lg"
                  >
                    Inscríbete Ahora
                  </Button>
                </Link>
                <Link href="/cursos">
                  <Button className="rounded-full p-6 w-60 text-lg">
                    Clases Gratis
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
