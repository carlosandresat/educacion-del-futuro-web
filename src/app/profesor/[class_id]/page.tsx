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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewClassDialog } from "@/components/new-class-dialog";
import { NewHomeworkDialog } from "@/components/new-homework-dialog";
import { NewLessonDialog } from "@/components/new-lesson-dialog";
import HomeworkTab from "@/components/homework-tab";
import { LessonsTab } from "@/components/lessons-tab";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12">
        <div className="flex items-center mb-12 justify-between w-full">
            <Link href={"/profesor"}><ArrowBigLeft /></Link>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="self-end"
      >
        <Button type="submit" variant="blue">
          Cerrar Sesión
        </Button>
      </form>
      </div>

      <Tabs defaultValue="homeworks" className="w-full mt-4">
        <TabsList className="flex w-full border-b">
          <TabsTrigger value="homeworks">Tareas</TabsTrigger>
          <TabsTrigger value="lessons">Lecciones</TabsTrigger>
          <TabsTrigger value="absences">Asistencia</TabsTrigger>
        </TabsList>
        <TabsContent value="homeworks">
          <HomeworkTab />
        </TabsContent>
        <TabsContent value="lessons">
          <LessonsTab />
        </TabsContent>
        <TabsContent value="absences">
          <div className="flex justify-center my-4">
            <NewClassDialog />
          </div>
          <div className="border rounded-lg w-full">
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Student Name</TableHead>
                    <TableHead>Class 1</TableHead>
                    <TableHead>Class 2</TableHead>
                    <TableHead>Class 3</TableHead>
                    <TableHead>Class 4</TableHead>
                    <TableHead>Class 5</TableHead>
                    <TableHead>Class 6</TableHead>
                    <TableHead>Class 7</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Michael Johnson
                    </TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Emily Davis</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">David Wilson</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>A</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
