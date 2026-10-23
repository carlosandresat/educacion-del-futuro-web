import { logout } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <form action={logout} className={cn(className)}>
      <Button type="submit" variant="blue">
        Cerrar Sesión
      </Button>
    </form>
  );
}
