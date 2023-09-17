//Mission and vision component
import Image from "next/image";

export function MissionVision() {
  return (
    <>
      <div className="flex items-center flex-wrap pb-10 max-w-screen-xl w-full" id="conocenos">
        <div className="w-full md:w-1/2 lg:w-1/2 p-4 ">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-left">
            Educación del Futuro
          </h2>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            &quot;EDF: Un viaje de autodescubrimiento, crecimiento y
            relización&quot;
          </blockquote>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
            ¿Te unes?
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
