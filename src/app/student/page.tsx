import { getMyEnrollments } from "@/actions/student";
import { SignOutButton } from "@/components/sign-out-button";
import { requireRole } from "@/lib/auth-guards";
import { BookOpen, Clock } from "lucide-react";

const StudentHome = async () => {
  const user = await requireRole(["STUDENT"]);
  const courses = await getMyEnrollments();

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12">
      <SignOutButton className="mb-12 self-end" />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Bienvenido, {user.name}
      </h2>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight self-start mt-8">
        Tus cursos:
      </h4>
      {courses.length === 0 ? (
        <p className="self-start mt-4 text-muted-foreground">
          Todavía no estás matriculado en ningún curso.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-main rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{course.name}</h3>
                  <BookOpen className="w-6 h-6 text-white opacity-75" />
                </div>
              </div>
              <div className="bg-white/20 py-3 px-6">
                <div className="flex items-center text-white">
                  <Clock className="w-5 h-5 mr-2 opacity-75" />
                  <span>{course.schedule}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="self-start mt-8 text-sm text-muted-foreground">
        Pronto podrás ver aquí tus notas y tu asistencia.
      </p>
    </div>
  );
};

export default StudentHome;
