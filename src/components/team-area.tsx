 import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TeamCard } from "@/components/team-card"
 
 
export function TeamArea() {
  return (
    <ScrollArea className="h-full w-full rounded-md border max-w-screen-xl p-6 mt-6">
      <div className="flex flex-row gap-8">
        <TeamCard></TeamCard>
        <TeamCard></TeamCard>
        <TeamCard></TeamCard>  
        <TeamCard></TeamCard>
        <TeamCard></TeamCard>
        <TeamCard></TeamCard>      
      </div>
    </ScrollArea>
  )
}