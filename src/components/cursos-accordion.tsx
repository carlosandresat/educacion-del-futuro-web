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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec fermentum orci aliquam nec. Aenean id tortor quis est varius pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Subtema 1</li>
            <li>Subtema 2</li>
            <li>Subtema 3</li>
          </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Curso 2</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec fermentum orci aliquam nec. Aenean id tortor quis est varius pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Curso 3</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec fermentum orci aliquam nec. Aenean id tortor quis est varius pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.          
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Subtema 1</li>
            <li>Subtema 2</li>
            <li>Subtema 3</li>
          </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Curso 4</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec fermentum orci aliquam nec. Aenean id tortor quis est varius pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.          
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Curso 5</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec fermentum orci aliquam nec. Aenean id tortor quis est varius pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.   
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Subtema 1</li>
            <li>Subtema 2</li>
            <li>Subtema 3</li>
          </ul>
         </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Curso 6</AccordionTrigger>
          <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec fermentum orci aliquam nec. Aenean id tortor quis est varius pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus turpis. Mauris malesuada eget tellus a gravida.          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex w-full md:w-1/4 lg:w-1/4 p-4 justify-center">
        <Image
          src="/profesor.jpeg"
          alt="Logo"
          width={400}
          height={400}
          className="rounded-3xl"
        />
      </div>
      </div>
    )
  }