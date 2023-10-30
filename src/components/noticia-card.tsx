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

export function NoticiaCard({title, description, link, image}: {title: string, description: string, link: string, image: string}) {
  return (
    <a target="_blank" href={link}>
    <Card className="transition-all hover:scale-105">
      
      <CardContent>
        <div className="w-full pt-4">
        <AspectRatio ratio={16 / 9}>
        <Image
          src={image}
          alt="Logo"
          fill={true}
          className="justify-start rounded-md object-cover"
        />
        </AspectRatio>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        
        {/*Link Externo. Cuando sea dentro de pagina cambiar por Link */}

        
      </CardFooter>
    </Card>
    </a>
  );
}
