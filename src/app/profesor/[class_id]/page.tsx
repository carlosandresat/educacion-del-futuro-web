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
import { AssistanceTab } from "@/components/assistance-tab";
import { getInitialHomeworksData } from "@/actions/teacher";

const Page = async ({
  params,
}: {
  params: Promise<{ class_id: string }>
}) => {
  const session = await auth();
  const classId = (await params).class_id
  const initialHomeworksData = await getInitialHomeworksData(Number(classId))

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12">
        <div className="flex items-center mb-12 justify-between w-full">
            <Link href={"/profesor"}><ArrowBigLeft /></Link>
      <form
        action={async () => {
          "use server";

          await signOut({redirectTo: "/"});
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
          <HomeworkTab initialData={initialHomeworksData}/>
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
