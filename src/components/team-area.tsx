import { TeamCard } from "@/components/team-card";
import { teamMembers } from "@/data/team-members";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TeamArea() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-screen-xl p-6 mt-6"
    >
      <CarouselContent className="">
        {teamMembers.map((member) => (
          <CarouselItem key={member.pic} className="md:basis-1/2 xl:basis-1/3">
            <div className="p-1 h-full">
              <TeamCard
                key={member.name}
                name={member.name}
                position={member.position}
                title={member.title}
                description={member.description}
                networks={member.networks}
                pic={member.pic}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-6 2xl:-left-12"/>
      <CarouselNext  className="-right-6 2xl:-right-12"/>
    </Carousel>
  );
}
