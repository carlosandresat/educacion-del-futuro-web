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
import Image from "next/image";

export function ProfesorDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-main">Ver Perfil</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Nombre del Profesor</DialogTitle>
          <DialogDescription>Título del Profesor</DialogDescription>
        </DialogHeader>
        <div className="grid py-4">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            euismod nisl eget eros.
          </p>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            euismod nisl eget eros.&quot;
          </blockquote>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nunc
            sed nunc porta pulvinar a congue ante. Nullam dapibus porta dui, nec
            fermentum orci aliquam nec. Aenean id tortor quis est varius
            pulvinar. Vestibulum tempus facilisis lectus, quis volutpat lorem
            hendrerit sit amet. Morbi at ex accumsan, dictum metus ut, cursus
            turpis. Mauris malesuada eget tellus a gravida.
          </p>
        </div>
        <DialogFooter>
            <div>
          <Button variant="default" className="w-12 h-12 p-0">
            <Image
              src="/icons/email-outline.png"
              alt="Educación del Futuro"
              width={30}
              height={30}
              className="h-auto w-auto object-cover transition-all hover:scale-105 invert"
            />
          </Button>
          <Button variant="outline" className="w-12 h-12 p-0">
            <Image
              src="/icons/facebook.png"
              alt="Educación del Futuro"
              width={30}
              height={30}
              className="h-auto w-auto object-cover transition-all hover:scale-105"
            />
          </Button>
          <Button variant="outline" className="w-12 h-12 p-0">
            <Image
              src="/icons/whatsapp.png"
              alt="Educación del Futuro"
              width={30}
              height={30}
              className="h-auto w-auto object-cover transition-all hover:scale-105"
            />
          </Button>
          <Button variant="secondary" className="w-12 h-12 p-0">
            <Image
              src="/icons/linkedin.png"
              alt="Educación del Futuro"
              width={30}
              height={30}
              className="h-auto w-auto object-cover transition-all hover:scale-105"
            />
          </Button>
          <Button variant="link" className="w-12 h-12 p-0">
            <Image
              src="/icons/tik-tok.png"
              alt="Educación del Futuro"
              width={30}
              height={30}
              className="h-auto w-auto object-cover transition-all hover:scale-105"
            />
          </Button>
          <Button variant="ghost" className="w-12 h-12 p-0">
            <Image
              src="/icons/twitter.png"
              alt="Educación del Futuro"
              width={30}
              height={30}
              className="h-auto w-auto object-cover transition-all hover:scale-105"
            />
          </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
