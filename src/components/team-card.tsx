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
  
  export function TeamCard() {
    return (
      <Card className="transition-all w-96">
        
          <div className="w-full p-4 xl:px-10">
          
          <AspectRatio ratio={3 / 4} className="w-full p-4 xl:px-10">
          <Image
            src="/profesor.jpeg"
            alt="Logo"
            fill={true}
            className="justify-start rounded-md object-cover"
          />
          </AspectRatio>
          </div>
          
        <CardHeader>
          <CardTitle className="self-center">Carlos Arévalo</CardTitle>
          <CardDescription className="text-center">Ingeniero en Tecnologías de la Información</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
        <ProfesorDialog></ProfesorDialog>  
        </CardFooter>
      </Card>
    );
  }
  