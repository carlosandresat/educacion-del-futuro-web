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
import { BookOpen, User } from "lucide-react";
import { getCoursesByTutorId } from "@/actions/teacher";
import Link from "next/link";

const Dashboard = async () => {
  const session = await auth();
  const courses = await getCoursesByTutorId(Number(session?.user.id))
 
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12">
      <form
        action={async () => {
          "use server";

          await signOut({redirectTo: "/"});
        }}
        className="mb-12 self-end"
      >
        <Button type="submit" variant="blue">
          Cerrar Sesión
        </Button>
      </form>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Bienvenido, {session?.user?.name}
    </h2>
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight self-start mt-8">
      Tus cursos:
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-6">
    {courses.map((course) => (
      <Link href={`profesor/${course.id}`} key={course.id}>
              <div
                className={`bg-main rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-all`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{course.name}</h3>
                    <BookOpen className="w-6 h-6 text-white opacity-75" />
                  </div>
                  
                </div>
                <div className="bg-white bg-opacity-20 py-3 px-6">
                  <div className="flex items-center text-white">
                    <User className="w-5 h-5 mr-2 opacity-75" />
                    <span>Ver detalles</span>
                  </div>
                </div>
              </div>
              </Link>
            ))}
    </div>
    </div>
  );
};

export default Dashboard;
