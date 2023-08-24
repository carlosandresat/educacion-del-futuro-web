import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

export function NoticiaCard() {
  return (
    <Card className="transition-all hover:scale-105">
      
      <CardContent>
        <div className="w-full pt-4 ">
        <AspectRatio ratio={4 / 3}>
        <Image
          src="/profesor.jpeg"
          alt="Logo"
          fill={true}
          className="justify-start rounded-md object-cover"
        />
        </AspectRatio>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>Título Noticia 1</CardTitle>
        <CardDescription>Este es un ejemplo de descripción de noticia, debe ser reemplazado con noticias nuevas.</CardDescription>
      </CardHeader>
      <CardFooter>
        
        {/*Link Externo. Cuando sea dentro de pagina cambiar por Link */}
        <a target="_blank" href="https://www.youtube.com/">
        <Button>Ver más...
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
