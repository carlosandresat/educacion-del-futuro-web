import Image from "next/image";
import { Profesor } from "@/data/profesores";

import { cn } from "@/lib/utils";

interface ProfesorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  profesor: Profesor;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function ProfesorCard({
  profesor,
  aspectRatio = "portrait",
  width = 200,
  height = 200,
  className,
  ...props
}: ProfesorCardProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={profesor.photo}
          alt={profesor.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{profesor.name}</h3>
        <p className="text-xs text-muted-foreground">{profesor.description}</p>
      </div>
    </div>
  );
}
