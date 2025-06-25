
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ranks, digitalAssets } from "@/lib/data";
import { Award, Coins, Gem, MoreHorizontal, PlusCircle, Star } from "lucide-react";

export default function RanksPage() {
  const getRankAsset = (assetId: string) => {
    return digitalAssets.find(asset => asset.id === assetId);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Ranks</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Rank
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Ranks</CardTitle>
          <CardDescription>
            Define the ranks adventurers can achieve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranks.map((rank) => {
                const rankAsset = getRankAsset(rank.assetId);
                return (
                  <TableRow key={rank.id}>
                     <TableCell>
                      <Badge variant="outline" className="text-lg">
                        {rank.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {rankAsset && (
                        <Image
                          alt={rank.name}
                          className="aspect-square rounded-md object-cover"
                          height="40"
                          src={rankAsset.image}
                          width="40"
                          data-ai-hint={rankAsset.aiHint}
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{rank.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2 text-sm">
                           <Coins className="w-4 h-4 text-yellow-500"/>
                           <span>{rank.requiredGold.toLocaleString()} Gold</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm">
                           <Gem className="w-4 h-4 text-blue-500"/>
                           <span>{rank.requiredGems.toLocaleString()} Gems</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm">
                           <Star className="w-4 h-4 text-purple-500"/>
                           <span>{rank.requiredStardust.toLocaleString()} Stardust</span>
                         </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
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
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
