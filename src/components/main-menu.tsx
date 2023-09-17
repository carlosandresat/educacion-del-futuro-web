"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

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
    title: "Curso 1",
    href: "/docs/primitives/alert-dialog",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Curso 2",
    href: "/docs/primitives/hover-card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Curso 3",
    href: "/docs/primitives/progress",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Curso 4",
    href: "/docs/primitives/scroll-area",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Curso 5",
    href: "/docs/primitives/tabs",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Curso 6",
    href: "/docs/primitives/tooltip",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
]

export function MainMenu({isTransparent}: {isTransparent: boolean}) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex  flex-wrap">
        <NavigationMenuItem>
          <Link href="/inicio" passHref className="h-[60px] w-full">
          <NavigationMenuTrigger className={`h-[60px] w-full ${isTransparent ? "bg-transparent" : ""}`}>Inicio</NavigationMenuTrigger>
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
              Conoce al equipo de Educación del Futuro.
              </ListItem>
              <ListItem href="/inicio#recursos" title="Recursos">
                Revisa los recursos que tenemos para ti.
              </ListItem>
              <ListItem href="/inicio#puntajes_referenciales" title="Puntajes Referenciales">
              Consulta los puntajes referenciales de la carrera de tus sueños.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/cursos" passHref className="h-[60px] w-full">

          <NavigationMenuTrigger className={`h-[60px] w-full ${isTransparent ? "bg-transparent" : ""}`}>Cursos</NavigationMenuTrigger>
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
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inscripciones
            </NavigationMenuLink>
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
