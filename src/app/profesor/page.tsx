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
import Link from "next/link";

const Dashboard = async () => {
  const session = await auth();
  const courses = [
    { id: '1', name: 'Matemáticas', students: 30, color: 'bg-blue-500' },
    { id: '2', name: 'Ciencias', students: 25, color: 'bg-green-500' },
    { id: '3', name: 'Literatura', students: 28, color: 'bg-yellow-500' },
    { id: '4', name: 'Historia', students: 22, color: 'bg-red-500' },
    { id: '5', name: 'Inglés', students: 35, color: 'bg-purple-500' },
    { id: '6', name: 'Arte', students: 20, color: 'bg-pink-500' },
  ]

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
                className={`${course.color} rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-all`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{course.name}</h3>
                    <BookOpen className="w-6 h-6 text-white opacity-75" />
                  </div>
                  <p className="mt-2 text-white opacity-90">
                    {course.students} estudiantes
                  </p>
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
