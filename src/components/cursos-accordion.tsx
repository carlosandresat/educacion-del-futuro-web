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
          <TestimonioCard
            video="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4"
            title="Título 1"
            puntaje="906"
            pic="testimonio2"
            pic_orientation="horizontal"
          ></TestimonioCard>
          <TestimonioCard
            video="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4"
            title="Título 2"
            puntaje="959"
            pic="testimonio1"
            pic_orientation="vertical"
          ></TestimonioCard>
          <TestimonioCard
            video="https://www.espoch.edu.ec/wp-content/uploads/2023/03/video_pag_web2.mp4"
            title="Título 3"
            puntaje="949"
            pic="testimonio3"
            pic_orientation="horizontal"
          ></TestimonioCard>
        </div>

        <Separator className="mt-10 mb-4" />

        <div className="max-w-screen-xl w-full">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-6 mt-5 md:self-start text-left w-max">
            Nuestros Cursos
          </h2>

          <div className="text-muted-foreground md:self-start text-xl py-2">
            Explora tu próxima aventura
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className={`w-full p-4`}
          onValueChange={handleAccordionChange}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="group text-xl">
              <div className="flex flex-col">
                <div className="md:self-start">
                  🌍🔬 Curso de Conocimientos: Expedición Científica
                </div>
                <p className=" text-lg self-start text-muted-foreground group-data-[state=open]:hidden md:text-left">
                  &quot;Expedición Científica&quot; es un curso meticulosamente
                  diseñado para sumergirte en el vasto océano del conocimiento...
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center flex-wrap w-full">
                <div className="w-full md:w-2/3 mb-4 md:pr-6 text-base text-justify">
                  &quot;Expedición Científica&quot; es un curso meticulosamente
                  diseñado para sumergirte en el vasto océano del conocimiento
                  científico. Este curso es una colaboración exclusiva con la
                  plataforma de Khan Academy, conocida por su excelencia en
                  proporcionar educación personalizada y accesible. Aprovechando
                  su metodología única, en EDF recibirás atención
                  individualizada, asegurando que tu aprendizaje sea adaptado a
                  tu ritmo y nivel, y entregándotelo justo cuando más lo
                  necesites.
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                    <span className="font-bold">Matemáticas:</span> Fortalece tus habilidades en álgebra,
                      geometría, trigonometría y los fundamentos del cálculo,
                      cimentando el conocimiento necesario para un sólido
                      rendimiento en exámenes y una transición exitosa hacia la
                      universidad.
                    </li>
                    <li>
                    <span className="font-bold">Física:</span> Abarca desde la cinemática hasta las leyes de
                      Newton, y del electromagnetismo a la energía, con un
                      enfoque práctico que te prepara para aplicar estos
                      principios en contextos reales y académicos.
                    </li>
                    <li>
                    <span className="font-bold">Química:</span> Profundiza en la tabla periódica, las reacciones
                      químicas, la estequiometría y la química orgánica,
                      proporcionando una base exhaustiva que te equipará para
                      desafíos futuros en ciencias y en la vida cotidiana.
                    </li>
                    <li>
                    <span className="font-bold">Biología:</span> Explora la célula, la genética, la evolución y
                      la biodiversidad con un enfoque en la comprensión
                      conceptual y el razonamiento científico, esencial para
                      cualquier aspirante a profesional de la ciencia o la
                      medicina.
                    </li>
                  </ul>
                  Con &quot;Expedición Científica&quot;, repasaras lo que has
                  aprendido hasta el tercer año de bachillerato, y además
                  ganaras confianza en tu conocimiento científico, preparándote
                  para cualquier reto académico que decidas enfrentar en el
                  futuro.
                </div>
                <div className="flex w-full md:w-1/3 lg:w-1/3 p-4 md:pl-6 justify-center">
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
                <div className="md:self-start">🤔📚 Curso de Razonamiento: Ruta del Genio</div>
                <p className=" text-lg self-start text-muted-foreground group-data-[state=open]:hidden md:text-left">
                El curso &quot;Ruta del Genio&quot; es una travesía intelectual diseñada exclusivamente para jóvenes que desean afinar su mente y...
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center flex-wrap w-full">
                <div className="w-full md:w-2/3 mb-4 md:pr-6 text-base text-justify">
                El curso &quot;Ruta del Genio&quot; es una travesía intelectual diseñada exclusivamente para jóvenes que desean afinar su mente y alcanzar nuevas cumbres de razonamiento. Nuestro enfoque pedagógico utiliza un libro innovador, organizado y optimizado con la asistencia de inteligencia artificial, lo que asegura una estructura de aprendizaje personalizada y de máxima eficacia. Este enfoque garantiza que cada concepto se presente de la manera más comprensible, permitiendo que tu no solo entiendas, sino también que apliques lo aprendido en situaciones reales y académicas.
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li><span className="font-bold">Razonamiento Verbal:</span> Refina tu habilidad para analizar y sintetizar información, mejorando la comunicación y la comprensión lectora.</li>
                    <li><span className="font-bold">Razonamiento Lógico:</span> Desarrolla la capacidad de discernir y construir argumentos válidos, mejorando el juicio y el pensamiento crítico.</li>
                    <li><span className="font-bold">Razonamiento Numérico:</span> Aumenta la destreza para trabajar con cifras y datos, esencial para la solución de problemas numéricos.</li>
                    <li><span className="font-bold">Razonamiento Abstracto:</span> Potencia la habilidad de visualizar y manipular objetos en el espacio, fomentando la innovación y la creatividad.</li>
                  </ul>
                  Este curso es una inversión en tu futuro, preparándote no solo para el éxito académico, sino para enfrentar los desafíos intelectuales de la vida cotidiana con confianza y competencia.
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
              <div className="flex flex-col md:text-left">
                <div>
                  ⚔️🏹 Curso para Carreras Focalizadas: Sendero del Guerrero
                </div>
                <p className=" text-lg self-start text-muted-foreground group-data-[state=open]:hidden md:text-left">
                El curso &quot;Ruta del Guerrero&quot; está especialmente diseñado para los jóvenes que aspiran a unirse a las Fuerzas Armadas...
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center flex-wrap w-full">
                <div className="w-full md:w-2/3 mb-4 md:pr-6 text-base text-justify">
                El curso &quot;Ruta del Guerrero&quot; está especialmente diseñado para los jóvenes que aspiran a unirse a las Fuerzas Armadas de Ecuador. Este programa robusto y completo utiliza la tecnología de punta de Khan Academy, junto con herramientas de inteligencia artificial, para ofrecer una experiencia de aprendizaje que cumple con los rigurosos estándares académicos, y que además se alinea con las exigentes expectativas del servicio militar. El curso se estructura de la siguiente manera:
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li><span className="font-bold">Conocimientos básicos:</span> En este curso aprenderás los conceptos básicos de matemáticas, física, química y biología que se detallan en el curso &quot;Expedición cientifica&quot;</li>
                    <li><span className="font-bold">Cívica:</span> Fomentamos la comprensión de los derechos y deberes ciudadanos, así como el funcionamiento de las instituciones y la participación democrática. </li>
                    <li><span className="font-bold">Historia:</span> Revive los eventos que han modelado el mundo y Ecuador, con un análisis crítico de los procesos históricos y su impacto en el presente.</li>
                    <li><span className="font-bold">Inglés:</span> A través de un enfoque práctico mejoraras tu habilidad para comunicarse en inglés, adquiriendo fluidez y precisión en el idioma que es esencial para el éxito en el ámbito globalizado actual.</li>
                  </ul>
                  &quot;Ruta del Guerrero&quot; prepara a los estudiantes no solo para superar los desafíos de los rigurosos exámenes de ingreso a las fuerzas, sino para destacar una vez dentro.
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
