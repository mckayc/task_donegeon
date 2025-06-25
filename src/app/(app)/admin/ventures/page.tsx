
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
import { tasks } from "@/lib/data";
import { MoreHorizontal, PlusCircle, CheckCircle, Timer } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { TaskSuggester } from "@/components/admin/task-suggester";
import { cn } from "@/lib/utils";

export default function VenturesPage() {
  const ventures = tasks.filter(task => task.type === 'venture');

  const verificationIcons = {
    manual: { icon: CheckCircle, label: 'Manual', className: 'text-blue-500' },
    auto: { icon: CheckCircle, label: 'Auto', className: 'text-green-500' },
    timed: { icon: Timer, label: 'Timed', className: 'text-orange-500' },
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Ventures</h1>
        <div className="ml-auto flex items-center gap-2">
          <TaskSuggester />
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Venture
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Ventures</CardTitle>
          <CardDescription>
            Create, edit, and assign one-time or unique ventures for your adventurers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ventures.map((task) => {
                const verification = verificationIcons[task.verification.type];
                return (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="capitalize">{task.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {task.reward.amount} {task.reward.currencyName}
                    </Badge>
                  </TableCell>
                   <TableCell>
                      <div className="flex items-center gap-2">
                        <verification.icon className={cn("w-4 h-4", verification.className)} />
                        <span className="text-sm">
                          {verification.label}
                          {task.verification.type === 'timed' && ` (${task.verification.delayMinutes}m)`}
                        </span>
                      </div>
                    </TableCell>
                  <TableCell className="hidden md:table-cell">
                     <Badge variant={task.status === "active" ? "default" : "secondary"}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
