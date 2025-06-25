
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tasks, guilds } from "@/lib/data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function GuildQuestsPage() {
  const guildQuests = tasks.filter(task => task.guildId);

  const getGuildName = (guildId?: string) => {
      if (!guildId) return "Unassigned";
      return guilds.find(g => g.id === guildId)?.name || 'Unknown Guild';
  }

  return (
    <div className="flex flex-col gap-4">
       <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Guild Quests</h1>
        <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Guild Quest
                </span>
            </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Guild Quests</CardTitle>
          <CardDescription>
            Create, edit, and manage collaborative quests for guilds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Assigned Guild</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guildQuests.length > 0 ? guildQuests.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                   <TableCell>
                      <Badge variant="secondary">{getGuildName(task.guildId)}</Badge>
                   </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {task.reward.amount} {task.reward.currencyName}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <Badge variant={task.status === "active" ? "default" : "secondary"}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Progress</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                 <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No guild quests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
          <CardHeader>
              <CardTitle>Integrating Guild Quests</CardTitle>
              <CardDescription>A note on assigning tasks to guilds.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                  A powerful way to manage Guild Quests is to treat them as special Duties or Ventures. When creating or editing a standard Duty or Venture, you could simply assign it to a specific guild.
              </p>
              <p>
                  This approach reuses the existing task creation system, keeping your workflow streamlined. We can explore integrating this feature into the "Add/Edit Task" forms if you'd like!
              </p>
          </CardContent>
      </Card>
    </div>
  );
}
