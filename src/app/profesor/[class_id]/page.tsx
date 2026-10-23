import { SignOutButton } from "@/components/sign-out-button";
import { canAccessCourseOffering, requireRole } from "@/lib/auth-guards";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeworkTab from "@/components/homework-tab";
import { LessonsTab } from "@/components/lessons-tab";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { AssistanceTab } from "@/components/assistance-tab";
import { getInitialHomeworksData } from "@/actions/teacher";

const Page = async ({
  params,
}: {
  params: Promise<{ class_id: string }>
}) => {
  const user = await requireRole(["TEACHER", "ADMIN"]);
  const classId = (await params).class_id

  // Same response for missing and foreign courses so IDs of other tutors are not disclosed
  if (!(await canAccessCourseOffering(user, Number(classId)))) notFound();

  const initialHomeworksData = await getInitialHomeworksData(Number(classId))

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12">
        <div className="flex items-center mb-12 justify-between w-full">
            <Link href={"/profesor"}><ArrowBigLeft /></Link>
      <SignOutButton className="self-end" />
      </div>

      <Tabs defaultValue="homeworks" className="w-full mt-4">
        <TabsList className="flex w-full border-b">
          <TabsTrigger value="homeworks">Tareas</TabsTrigger>
          <TabsTrigger value="lessons">Lecciones</TabsTrigger>
          <TabsTrigger value="absences">Asistencia</TabsTrigger>
        </TabsList>
        <TabsContent value="homeworks">
          {/* Remount when a homework is added so the grade form picks up the new column */}
          <HomeworkTab key={initialHomeworksData.homeworks.length} initialData={initialHomeworksData} courseOfferingId={Number(classId)}/>
        </TabsContent>
        <TabsContent value="lessons">
          <LessonsTab />
        </TabsContent>
        <TabsContent value="absences">
          <AssistanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
