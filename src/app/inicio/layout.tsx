import { RegisterBar } from "@/components/register-bar";


export default function InicioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
          <div>
            <div>{children}</div>
            <RegisterBar></RegisterBar>
          </div>

  );
}