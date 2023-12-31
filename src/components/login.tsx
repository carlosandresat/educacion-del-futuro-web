import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center top-6 md:top-1/3 w-12 h-12 fixed right-2 md:right-8 rounded-full bg-main hover:bg-main/80 z-10">
        
          <PersonIcon className="invert"></PersonIcon>
        
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Ingresa a tu cuenta EDF</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cedula" className="text-right">
              Cédula
            </Label>
            <Input id="cedula" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Contraseña
            </Label>
            <Input id="password" type="password" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="blue">Ingresa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
