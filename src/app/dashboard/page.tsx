import { auth, signOut } from "@/auth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        Clases Demostrativas
      </h2>
      <div className="w-full max-w-screen-2xl">
        <Table>
          <TableCaption>
            Una lista de los registros de clases demostrativas.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>Cédula</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead>Género</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-12 mb-6">
        Estudiantes
      </h2>
      <div className="w-full max-w-screen-2xl">
        <Table>
          <TableCaption>
            Una lista de los registros de los estudiantes que pagaron un curso.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>Cédula</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead>Género</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-12 mb-6">
        Ausencias/Atrasos
      </h2>
      <div className="w-full max-w-screen-2xl">
        <Table>
          <TableCaption>
            Una lista de los registros de ausencias/atrasos de los estudiantes.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>Cédula</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead>Género</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mt-12"
      >
        <Button type="submit" variant="blue">
          Cerrar Sesión
        </Button>
      </form>
    </div>
  );
};

export default Dashboard;
