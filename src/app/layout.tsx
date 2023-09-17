import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNavbar } from "@/components/main-navbar";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Educación del Futuro",
  description: "Sitio web de la Escuela de Educación del Futuro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div>
            <MainNavbar></MainNavbar>
            <div className="mx-auto">{children}</div>
            <Sidebar></Sidebar>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
