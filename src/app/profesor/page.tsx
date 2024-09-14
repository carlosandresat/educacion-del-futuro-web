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

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12">
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-12 self-end"
      >
        <Button type="submit" variant="blue">
          Cerrar Sesión
        </Button>
      </form>
      <div className="flex">
        <NewClassDialog/>
      </div>

      <Tabs defaultValue="homeworks" className="w-full">
        <TabsList className="flex w-full border-b">
          <TabsTrigger value="homeworks">Tareas</TabsTrigger>
          <TabsTrigger value="lessons">Lecciones</TabsTrigger>
          <TabsTrigger value="absences">Asistencia</TabsTrigger>
        </TabsList>
        <TabsContent value="homeworks">
          <div className="border rounded-lg w-full">
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Student Name</TableHead>
                    <TableHead>Homework 1</TableHead>
                    <TableHead>Homework 2</TableHead>
                    <TableHead>Homework 3</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>92</TableCell>
                    <TableCell>78</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>92</TableCell>
                    <TableCell>88</TableCell>
                    <TableCell>85</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Michael Johnson
                    </TableCell>
                    <TableCell>78</TableCell>
                    <TableCell>82</TableCell>
                    <TableCell>90</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Emily Davis</TableCell>
                    <TableCell>90</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>92</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">David Wilson</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>90</TableCell>
                    <TableCell>88</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="lessons">
          <div className="border rounded-lg w-full">
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Student Name</TableHead>
                    <TableHead>Lesson 1</TableHead>
                    <TableHead>Lesson 2</TableHead>
                    <TableHead>Lesson 3</TableHead>
                    <TableHead>Lesson 4</TableHead>
                    <TableHead>Lesson 5</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>90</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>92</TableCell>
                    <TableCell>80</TableCell>
                    <TableCell>88</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>95</TableCell>
                    <TableCell>90</TableCell>
                    <TableCell>88</TableCell>
                    <TableCell>92</TableCell>
                    <TableCell>85</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Michael Johnson
                    </TableCell>
                    <TableCell>88</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>92</TableCell>
                    <TableCell>80</TableCell>
                    <TableCell>90</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Emily Davis</TableCell>
                    <TableCell>88</TableCell>
                    <TableCell>92</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>90</TableCell>
                    <TableCell>88</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">David Wilson</TableCell>
                    <TableCell>92</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>90</TableCell>
                    <TableCell>88</TableCell>
                    <TableCell>92</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="absences">
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
