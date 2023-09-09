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

export function MainMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex  flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-[60px] w-full">Inicio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[325px] md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image src="next.svg" alt="EDF" width={100} height={100} />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Educación del Futuro
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      En EDF estamos comprometidos con empoderar a través de la educación integral, creando líderes del mañana y transformando el sistema educativo ecuatoriano con innovación y excelencia.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/#mision_vision" title="Nuestro ¿Por qué?, Visión y Misión">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet erat in mi molestie, eu lacinia odio ultricies. Etiam mollis leo nec nunc posuere sodales. Aliquam eu nulla cursus, lobortis tortor id, consequat leo. 
              </ListItem>
              <ListItem href="/#recursos" title="Recursos">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet erat in mi molestie, eu lacinia odio ultricies. Etiam mollis leo nec nunc posuere sodales. Aliquam eu nulla cursus, lobortis tortor id, consequat leo. 
              </ListItem>
              <ListItem href="/#puntajes_referenciales" title="Puntajes Referenciales">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet erat in mi molestie, eu lacinia odio ultricies. Etiam mollis leo nec nunc posuere sodales. Aliquam eu nulla cursus, lobortis tortor id, consequat leo. 
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-[60px] w-full">Cursos</NavigationMenuTrigger>
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
