
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
import { adventurerStoreItems, users } from "@/lib/data";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ApprovalsPage() {
  const pendingItems = adventurerStoreItems.filter(item => item.approvalStatus === 'pending');

  const getUser = (userId: string) => users.find(u => u.id === userId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Item Approvals</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Adventurer Items</CardTitle>
          <CardDescription>
            Review and approve or reject items submitted by adventurers for their stalls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Adventurer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingItems.length > 0 ? pendingItems.map((item) => {
                const user = getUser(item.sellerId);
                return (
                  <TableRow key={item.id}>
                     <TableCell>
                      {user && (
                        <div className="flex items-center gap-2">
                           <Image
                            src={user.avatar}
                            alt={user.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="font-medium">{user.name}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground max-w-sm truncate">{item.description}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.cost.amount} {item.cost.currencyName}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button size="sm" variant="outline" className="mr-2">
                         <Check className="h-4 w-4" />
                       </Button>
                       <Button size="sm" variant="destructive">
                         <X className="h-4 w-4" />
                       </Button>
                    </TableCell>
                  </TableRow>
                );
              }) : (
                 <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No items are currently pending approval.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
