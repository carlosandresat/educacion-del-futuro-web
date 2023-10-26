 import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TeamCard } from "@/components/team-card"
import { teamMembers } from "@/data/team-members"
 
 
export function TeamArea() {
  return (
    <ScrollArea className="h-full w-full rounded-md max-w-screen-xl p-6 mt-6">
      <div className="flex flex-row gap-8 ">
        {teamMembers.map((member) => (
          <TeamCard
            key={member.name}
            name={member.name}
            position={member.position}
            title={member.title}
            description={member.description}
            networks={member.networks}
            pic={member.pic}
          />
        ))}
      </div>
    </ScrollArea>
  )
}