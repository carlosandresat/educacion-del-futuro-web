import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

export function TerminosCondiciones({ text, style, variant }: { text: string, style: string, variant:"link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "blue" | null | undefined }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={style} variant={variant}>{text}</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Términos y Condiciones</DialogTitle>
          <DialogDescription>Inscripción a la academia EDF</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] md:max-h-[600px]">
        <div className="grid py-4 pr-4">

          <h2 className="text-xl font-semibold">
            TÉRMINOS Y CONDICIONES DE INSCRIPCIÓN DE LA ACADEMIA EDF
          </h2>

          <p className="leading-6 [&:not(:first-child)]:mt-4">
            Al llenar y enviar el presente formulario de inscripción,
            automáticamente usted acepta el siguiente acuerdo de términos y
            condiciones. Por lo que si usted está en desacuerdo parcial o total
            con el contenido de este documento, por favor no llene ni envíe el
            formulario de inscripción.
          </p>

          <p className="leading-6 [&:not(:first-child)]:mt-4">
            En Riobamba, a la fecha de suscripción, este contrato está formado
            entre:
          </p>
          <ol className="list-decimal mt-2 ml-6 [&>li]:mt-2">
            <li>
              La Academia EDF, en adelante &quot;EDF ACADEMY, representada por el
              Físico Ariel A. Huera con C.C. 0603962077.
            </li>
            <li>
              &quot;EL ESTUDIANTE&quot; y su representante legal en adelante &quot;EL
              REPRESENTANTE&quot;.
            </li>
          </ol>

          <h3 className="leading-6 [&:not(:first-child)]:mt-4">
            La realización del contrato de preparación académica se desarrollará
            bajo las siguientes cláusulas:
          </h3>

          <h4 className="text-lg font-semibold mt-6 croll-m-20 tracking-tight">PRIMERA: OBJETO.</h4>
          <p className="leading-6 [&:not(:first-child)]:mt-4">
            EDF ACADEMY, en su misión de mejorar los procesos de aprendizaje en
            Ecuador implementando una educación integral, innovadora y de
            calidad, está obligado a brindar sus servicios de preparación
            académica al EL ESTUDIANTE en los términos, modalidades y fechas
            establecidas en la información detallada en nuestra sección de
            cursos, canales de información y formulario de inscripción.
          </p>

          <h4 className="text-lg font-semibold mt-4">SEGUNDA: DURACIÓN.</h4>
          <p className="leading-6 [&:not(:first-child)]:mt-4">
            El presente contrato de preparación académica tendrá una duración
            acorde al curso seleccionado por EL ESTUDIANTE en el presente
            formulario de inscripción y comenzará a partir del momento de
            inscripción.
          </p>

          <h4 className="text-lg font-semibold mt-6 croll-m-20 tracking-tight">
            TERCERA: OBLIGACIONES DE EDF ACADEMY
          </h4>
          <ul className="mt-2 ml-6 list-disc [&>li]:mt-2">
            <li>
              <strong>COMPROMISO:</strong> EDF ACADEMY está obligada a entregar
              la atención necesaria, tanto a EL ESTUDIANTE como a EL
              REPRESENTANTE para que EL ESTUDIANTE desarrolle el proceso de
              preparación en un cómodo y exigente nivel académico.
            </li>
            <li>
              <strong>RESPONSABILIDAD:</strong> EDF ACADEMY está obligada a
              impartir con responsabilidad y respeto el temario contenido en los
              cursos al que se inscribe EL ESTUDIANTE.
            </li>
            <li>
              <strong>CALIDAD:</strong> EDF ACADEMY está obligada a proporcionar
              a EL ESTUDIANTE los espacios físicos o virtuales, así como también
              los recursos e implementos detallados en el curso elegido
              necesarios y adecuados para la correcta capacitación de EL
              ESTUDIANTE.
            </li>
          </ul>

          <h4 className="text-lg font-semibold mt-6 croll-m-20 tracking-tight">
            CUARTA: OBLIGACIONES DEL ESTUDIANTE.
          </h4>
          <ul className="mt-2 ml-6 list-disc [&>li]:mt-2">
            <li>
              <strong>ASISTENCIA:</strong> EL ESTUDIANTE está obligado a asistir
              al 90% del curso de preparación académica, 5 minutos antes del
              horario establecido en el formulario de inscripción y a traer
              todos los materiales e implementos necesarios para el normal
              desenvolvimiento de la clase.
            </li>
            <li>
              <strong>TAREAS:</strong> EL ESTUDIANTE está obligado a cumplir con
              todos los requerimientos del curso seleccionado durante la
              inscripción, es decir, a cumplir puntualmente con todas las tareas
              asignadas por los docentes de EDF ACADEMY.
            </li>
            <li>
              <strong>COMPROMISO:</strong> EL ESTUDIANTE está obligado a
              participar con esfuerzo y responsabilidad durante el proceso de
              capacitación y a mantener un comportamiento de respeto hacia los
              padres, compañeros y profesores. Además, está obligado a cuidar
              los bienes tangibles e intangibles de EDF ACADEMY.
            </li>
          </ul>

          <p className="leading-6 [&:not(:first-child)]:mt-4">
            El incumplimiento de estas reglas será motivo suficiente para el no
            ingreso de los estudiantes hasta que EDF ACADEMY se pueda comunicar
            con EL REPRESENTANTE para buscar las soluciones adecuadas para que
            EL ESTUDIANTE pueda continuar el normal desarrollo del curso.
          </p>

          <h4 className="text-lg font-semibold mt-6 croll-m-20 tracking-tight">
            QUINTA: OBLIGACIONES DE EL REPRESENTANTE
          </h4>
          <ul className="mt-2 ml-6 list-disc [&>li]:mt-2">
            <li>
              <strong>APOYO:</strong> EL REPRESENTANTE se compromete a estar
              pendiente del progreso académico y el bienestar de EL ESTUDIANTE,
              brindando el apoyo necesario para cumplir con las obligaciones
              académicas y conductuales establecidas en este contrato. EL
              REPRESENTANTE reconoce que su compromiso y participación activa
              son fundamentales para el éxito académico de EL ESTUDIANTE y
              acepta cumplir con estas obligaciones en beneficio de EL
              ESTUDIANTE.
            </li>
            <li>
              <strong>RESPONSABILIDAD:</strong> La asistencia de EL ESTUDIANTE
              será responsabilidad exclusiva de EL REPRESENTANTE para cuyo fin
              se dispone de los medios necesarios para su información en la
              secretaría del centro, sin embargo, EDF ACADEMY dará a conocer las
              inasistencias de EL ESTUDIANTE cuando este incurra en más de 3
              faltas, mediante los medios de comunicación establecidos en el
              formulario de inscripción.
            </li>
            <li>
              <strong>COMUNICACIÓN:</strong> EL REPRESENTANTE mantendrá una
              comunicación continua y activa con EDF ACADEMY, respondiendo a las
              solicitudes de información o colaboración que puedan surgir
              durante la duración de este contrato, esto incluye, asistir a las
              reuniones solicitadas por EDF ACADEMY, ya sean de carácter
              general, informativo o relacionadas con el desempeño específico de
              EL ESTUDIANTE.
            </li>
          </ul>

          <p className="leading-6 [&:not(:first-child)]:mt-4">
            Esta cláusula refleja la responsabilidad compartida entre EDF
            ACADEMY, EL ESTUDIANTE y El REPRESENTANTE, y subraya la importancia
            de la colaboración y la comunicación en el proceso educativo.
          </p>

          <h4 className="text-lg font-semibold mt-6 croll-m-20 tracking-tight">
SEXTA: VALOR A PAGAR</h4>
          <p className="leading-6 [&:not(:first-child)]:mt-4">
            Las partes dejan constancia de que el curso al cual asiste EL
            ESTUDIANTE es de carácter privado y se compromete a cancelar los
            valores totales establecidos en la página web de la institución y en
            el formulario de inscripción.
          </p>

          <h4 className="text-lg font-semibold mt-6 croll-m-20 tracking-tight">
            SÉPTIMA: FINALIZACIÓN DEL CONTRATO
          </h4>
          <p className="leading-6 [&:not(:first-child)]:mt-4">
            El contrato podrá resolverse, sin reembolso, por las siguientes
            causas:
          </p>
          <ul className="mt-2 ml-6 list-disc [&>li]:mt-2">
            <li>Por mutuo acuerdo de las partes.</li>
            <li>
              Por caso de fuerza mayor; si por este motivo alguna de las partes
              se viera obligada a disolver este contrato deberá comunicarlo de
              forma inmediata a la otra parte.
            </li>
            <li>
              Por incumplimiento de las obligaciones por parte de EL ESTUDIANTE,
              EL REPRESENTANTE o EDF ACADEMY.
            </li>
          </ul>

          <h4 className="text-lg font-semibold mt-6 croll-m-20 tracking-tight">
            OCTAVA: NATURALEZA Y JURISDICCIÓN
          </h4>
          <p className="leading-6 [&:not(:first-child)]:mt-4">
            Este contrato tiene naturaleza privada y se regula por la
            legislación ecuatoriana. Las partes se comprometen a resolver de
            manera amistosa cualquier desacuerdo que pudiera surgir en el
            desarrollo del presente contrato.
          </p>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <DialogFooter>
            <div className="flex flex-col md:flex-row justify-center md:space-x-4">
            <DialogClose asChild>
                <Button variant="outline" className="w-full md:w-auto">
                Cancelar
                </Button>
            </DialogClose>
            <Link href="/inscripcion/registro">
                <Button className="w-full md:w-auto">Aceptar</Button>
            </Link>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
