import { SignOutButton } from "@/components/sign-out-button";
import { requireRole } from "@/lib/auth-guards";

const PsychologyHome = async () => {
  const user = await requireRole(["PSYCHOLOGIST", "ADMIN"]);

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12">
      <SignOutButton className="mb-12 self-end" />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Bienvenido, {user.name}
      </h2>
      <p className="self-start mt-8 text-muted-foreground">
        El registro de visitas psicológicas está en construcción.
      </p>
    </div>
  );
};

export default PsychologyHome;
