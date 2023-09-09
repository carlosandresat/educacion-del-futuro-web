//Mission and vision component
import Image from "next/image";

export function MissionVision() {
  return (
    <>
      <div className="flex items-center flex-wrap my-10 max-w-screen-xl">
      <div className="w-full md:w-1/2 lg:w-1/2 p-4">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-left">
            Nuestro ¿Por Qué?
          </h2>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            &quot;Creemos firmemente que la educación es la herramienta más
            poderosa para el cambio.&quot;
          </blockquote>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            En EDF, estamos convencidos de que, a través de una educación
            integral, podemos empoderar a individuos para que persigan sus
            sueños, se conviertan en agentes de cambio y lideren a la sociedad
            hacia un futuro de bienestar y desarrollo.
          </p>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-left">
            Nuestra Visión
          </h2>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            &quot;Imaginamos un sistema educativo donde cada niño y cada joven
            es motivado a creer en sus sueños.&quot;
          </blockquote>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Un sistema que nos equipa con las herramientas necesarias para que
            la educación no se detenga en las aulas, sino que se convierte en un
            viaje de autodescubrimiento, crecimiento y realización.
          </p>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-left">
            Nuestra Misión
          </h2>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            &quot;La misión de EDF es transformar el sistema educativo
            ecuatoriano, introduciendo un modelo academico integral, innovador y
            de excelencia.&quot;
          </blockquote>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Comenzamos por equipar a los estudiantes con habilidades y
            conocimientos únicos para superar con éxito los exámenes de ingreso
            a la universidad, mientras los inspiramos a marcar una diferencia
            positiva en nuestra sociedad.
          </p>
        </div>
        <div className="flex w-full md:w-1/2 lg:w-1/2 p-4 justify-center">
          <Image
            src="/next.svg"
            alt="Logo"
            width={400}
            height={400}
            className="dark:invert"
          />
        </div>

        
      </div>
    </>
  );
}
