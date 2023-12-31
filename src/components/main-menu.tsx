"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Curso de Conocimientos",
    href: "/docs/primitives/alert-dialog",
    description:
      "Expedición científica",
  },
  {
    title: "Curso de Razonamiento",
    href: "/docs/primitives/hover-card",
    description:
      "Ruta del Genio",
  },
  {
    title: "Cruso para Carreras Especializadas",
    href: "/docs/primitives/progress",
    description:
      "Sendero del Guerrero",
  },
]

export function MainMenu({isTransparent}: {isTransparent: boolean}) {


  return (
    <NavigationMenu>
      <NavigationMenuList className="flex  flex-wrap">
        <NavigationMenuItem>
          <Link href="/inicio" passHref className="h-[60px] w-full">
          <NavigationMenuTrigger className={`h-[60px] w-full text-xl font-semibold  ${isTransparent ? "bg-transparent text-primary-foreground data-[state=open]:text-primary" : ""} `}>Inicio</NavigationMenuTrigger>
          </Link>
          
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[325px] md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/inicio"
                  >
                    <div className="mb-2 text-lg font-medium">
                      Educación del Futuro
                    </div>
                    <div className="mb-2 text-lg text-muted-foreground font-medium">
                      Conócenos
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    Creemos firmemente que la educación es la herramienta más poderosa para el cambio.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/inicio#mision_vision" title="Nuestro Equipo">
              Conoce al equipo EDF
              </ListItem>
              <ListItem href="/inicio#recursos" title="Recursos">
                Revisa los recursos que tenemos para ti
              </ListItem>
              <ListItem href="/inicio#puntajes_referenciales" title="Puntajes Referenciales">
              Consulta los puntajes referenciales de la carrera de tu preferencia
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/cursos" passHref className="h-[60px] w-full">

          <NavigationMenuTrigger className={`h-[60px] w-full text-xl font-semibold ${isTransparent ? "bg-transparent text-primary-foreground data-[state=open]:text-primary" : ""}`}>Cursos</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid w-[350px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href="/cursos"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/inscripcion" legacyBehavior passHref className="h-[60px] w-full">
            {isTransparent ? <NavigationMenuLink className="bg-transparent group inline-flex h-[60px] w-max items-center justify-center rounded-md px-4 py-2  transition-colors hover:bg-background hover:text-accent-foreground focus:bg-background focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-background data-[state=open]:bg-background text-xl font-semibold text-primary-foreground data-[state=open]:text-primary ">
              Inscripciones
            </NavigationMenuLink> : <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inscripciones
            </NavigationMenuLink>}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
