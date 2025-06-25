
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
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
import { users, ranks } from "@/lib/data";
import { Coins, Gem, Star, ShieldMinus } from "lucide-react";
import { ApplyHitDialog } from "@/components/admin/apply-hit-dialog";

export default function ProgressPage() {
  const getRank = (rankId: string) => ranks.find((r) => r.id === rankId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Adventurer Progress
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Progress Overview</CardTitle>
          <CardDescription>
            Track adventurer ranks and purses. Apply penalties for missteps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Purse</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const rank = getRank(user.rankId);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="grid gap-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {rank ? (
                        <Badge variant="outline">Lvl {rank.level} - {rank.name}</Badge>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span>{user.purse.gold.toLocaleString()} Gold</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gem className="w-4 h-4 text-blue-500" />
                          <span>{user.purse.gems.toLocaleString()} Gems</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-purple-500" />
                          <span>
                            {user.purse.stardust.toLocaleString()} Stardust
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                       <ApplyHitDialog user={user} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
