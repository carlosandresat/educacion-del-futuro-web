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

export function TestimonioCard({
  video,
  title,
  puntaje,
  pic,
  pic_orientation,
}: {
  video: string;
  title: string;
  puntaje: string;
  pic: string;
    pic_orientation: string;
}) {
  return (
    <Card className="transition-all">
      <div className="w-full p-4 xl:px-10">
      <AspectRatio ratio={3 / 4}>
              <video
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
                className="w-full h-full object-cover rounded-md"
                muted
                playsInline
                loop
                src={video}
              ></video>
            </AspectRatio>
      </div>

      <CardHeader>
        <CardTitle className="self-center">{title}</CardTitle>
      </CardHeader>
      <CardFooter className="justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="blue" className="w-fit mt-3 self-center">
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
                <Button className=" self-end">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
