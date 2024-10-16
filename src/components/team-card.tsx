import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProfesorDialog } from "./profesor-dialog";
import { ReactNode } from "react";

interface Network {
  name: string;
  url: string;
}

export function TeamCard({
  name,
  position,
  title,
  description,
  networks,
  pic,
}: {
  name: string;
  position: string;
  title: string;
  description: ReactNode;
  networks: Network[];
  pic: string;
}) {
  return (
    <Card className="transition-all h-full">
      <div className="w-full p-4 xl:px-10">
        <AspectRatio ratio={3 / 4} className="w-full">
          <Image
            src={`/equipo/${pic}.jpg`}
            alt={name}
            fill={true}
            className="justify-start rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <div className="h-52 flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="self-center">{name}</CardTitle>
        <CardDescription className="text-center">{position}</CardDescription>
        <CardDescription className="text-center">{title}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center h-max">
        <ProfesorDialog
          name={name}
          position={position}
          description={description}
          networks={networks}
        ></ProfesorDialog>
      </CardFooter>
      </div>
    </Card>
  );
}
