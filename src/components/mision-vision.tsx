//Mission and vision component
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function MissionVision() {
  return (
    <>
    
      <div
        className="flex items-center flex-wrap pb-10 max-w-screen-xl w-full"
        id="conocenos"
      >
        <div className="w-full md:w-1/2 lg:w-1/2 p-4 ">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-left">
            EDF - Educación del Futuro
          </h2>
          <div className=" w-full">
      <AspectRatio ratio={20 / 9}>
            <Image 
              src="/inicio-edf.png" 
              alt="inicio" 
              fill={true}
              className="justify-start rounded-md object-cover"
             />
             </AspectRatio>
          </div>
          
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
