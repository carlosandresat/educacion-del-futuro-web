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
      <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"></link>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
<link rel="manifest" href="/favicon/site.webmanifest"/>
<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
<meta name="msapplication-TileColor" content="#da532c"/>
<meta name="theme-color" content="#ffffff"/>
  </head>
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
