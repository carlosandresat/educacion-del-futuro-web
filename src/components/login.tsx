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
      <DialogTrigger className="flex items-center justify-center self-center w-12 h-12 fixed right-2 md:right-8 rounded-full bg-primary z-10">
        
          <PersonIcon className="invert"></PersonIcon>
        
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Ingresa a tu cuenta EDF</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Correo
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Contraseña
            </Label>
            <Input id="username" type="password" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Ingresa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
