import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import Image from "next/image";
   
  export function CursosAccordion() {
    return (
<div className="flex items-center flex-wrap my-10 max-w-screen-xl w-full">


      <Accordion type="single" collapsible className="w-full md:w-3/4 lg:w-3/4 p-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>Curso 1</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia a quae voluptatum voluptatibus
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Curso 2</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia a quae voluptatum voluptatibus
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Curso 3</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia a quae voluptatum voluptatibus
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Curso 4</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia a quae voluptatum voluptatibus
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Curso 5</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia a quae voluptatum voluptatibus
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Curso 6</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia a quae voluptatum voluptatibus
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex w-full md:w-1/4 lg:w-1/4 p-4 justify-center">
        <Image
          src="/profesor.jpeg"
          alt="Logo"
          width={400}
          height={400}
          className="dark:invert"
        />
      </div>
      </div>
    )
  }