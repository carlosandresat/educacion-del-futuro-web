//Mission and vision component
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function MissionVision() {
  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-left">
        EDF - Educación del Futuro
      </h2>

      <div
        className="flex items-center flex-wrap pb-10 max-w-screen-xl w-full"
        id="conocenos"
      >
        <div className="w-full md:w-1/2 lg:w-1/2 p-4 ">
          <div className="">
            <AspectRatio ratio={14 / 9}>
              <Image
                src="/inicio-edf.png"
                alt="inicio"
                fill={true}
                className="justify-start rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
        <div className="flex w-full md:w-1/2 lg:w-1/2 p-4 justify-center center">
          <AspectRatio ratio={14 / 9}>
            <video
              className="w-full h-full object-cover rounded-md"
              playsInline
              controls
              controlsList="nodownload"
              loop
              autoPlay
              muted
              src="https://storage.googleapis.com/edf-bucket/Intro.mp4"
            ></video>
          </AspectRatio>
        </div>
      </div>
    </>
  );
}
