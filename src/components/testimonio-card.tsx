import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Car } from "lucide-react";

export function TestimonioCard({
  video,
  title,
  puntaje,
  pic,
  pic_orientation,
  quote,
}: {
  video: string;
  title: string;
  puntaje: string;
  pic: string;
    pic_orientation: string;
  quote: string;
}) {
  return (
    <Card className="transition-all">
      <div className="w-full p-4 xl:px-10">
      <AspectRatio ratio={9 / 16}>
              <video
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
                className="w-full h-full object-cover rounded-md"
                playsInline
                loop
                src={video}
              ></video>
            </AspectRatio>
      </div>

      <CardHeader>
        <CardTitle className="self-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {quote}
      </CardContent>
      <CardFooter className="justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="blue" className="w-fit self-center text-lg p-5">
              {puntaje}
            </Button>
          </DialogTrigger>
          <DialogContent className={pic_orientation === "horizontal" ? "sm:max-w-[425px] md:max-w-screen-lg" : "sm:max-w-[425px] md:max-w-screen-sm md:w-fit max-h-full py-6"}>
            <Image
              src={`/${pic}.jpg`}
              alt="Logo"
              width={899}
              height={1280}
              className="justify-start rounded-md object-cover"
            />
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button className=" self-end" variant="blue">Cerrar</Button>
              </DialogClose> 
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
