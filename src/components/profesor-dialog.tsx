import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

export function ProfesorDialog({
  name,
  position,
  description,
  networks,
}: {
  name: string;
  position: string;
  description: React.ReactNode;
  networks: { name: string; url: string }[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-main rounded-full">Ver Perfil</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{position}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] md:max-h-[600px]">
        {description}
        <ScrollBar orientation="vertical" />
        </ScrollArea>
        <DialogFooter>
          <div>
            {networks.map((network) => (
              <a
                href={network.url}
                className="inline-block mr-4"
                key={network.name}
                target="_blank"
              >
                            <Button variant="default" className="w-12 h-12 p-0 hover:scale-105">

                <Image
                src={`/icons/${network.name}.png`}
                alt="Educación del Futuro"
                width={30}
                height={30}
                className="h-auto w-auto object-cover transition-all  invert"
              />
            </Button>
              </a>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
