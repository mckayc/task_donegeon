
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { users, transactionHistory, type TransactionHistoryEntry } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check, RefreshCcw } from "lucide-react";

function getStatusBadgeVariant(status: TransactionHistoryEntry['status']) {
  switch (status) {
    case 'verified':
    case 'auto-verified':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'hit':
    case 'spend':
      return 'destructive';
    case 'retry':
      return 'outline';
    default:
      return 'secondary';
  }
}

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          User Dashboard
        </h1>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {users.filter(u => u.role === 'Adventurer').map((user) => {
          const userTransactions = transactionHistory
            .filter((t) => t.userId === user.id)
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 5);

          return (
            <Card key={user.id} className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="grid gap-1">
                      <CardTitle className="text-xl font-headline">{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                </div>
                <Button asChild variant="outline">
                  <Link href={`/user-dashboard/${user.id}`}>View Full History</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <h4 className="mb-2 font-semibold">Recent Activity</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="text-muted-foreground text-xs">
                          {format(transaction.date, "MMM d, h:mm a")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.description}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(transaction.status)} className="capitalize">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={cn(
                            (transaction.status === 'verified' || transaction.status === 'auto-verified') && "text-green-600",
                            (transaction.status === 'spend' || transaction.status === 'hit') && "text-red-600",
                            transaction.status === 'pending' && "text-yellow-600"
                          )}>
                            {['verified', 'auto-verified'].includes(transaction.status) ? '+' : ['spend', 'hit'].includes(transaction.status) ? '-' : ''}
                            {transaction.change.amount} {transaction.change.currencyName}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.status === 'pending' && (
                            <div className="flex gap-2 justify-end">
                              <Button size="sm" variant="outline" disabled>
                                <Check className="mr-2 h-4 w-4" />
                                Verify
                              </Button>
                              <Button size="sm" variant="ghost" disabled>
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Retry
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
