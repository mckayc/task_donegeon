
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
import { users, transactionHistory, type TransactionHistoryEntry, digitalAssets } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check, RefreshCcw, ArrowLeft, Gift, X } from "lucide-react";

function getStatusBadgeVariant(status: TransactionHistoryEntry['status']) {
  switch (status) {
    case 'verified':
    case 'auto-verified':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'setback':
    case 'spend':
    case 'cancelled':
      return 'destructive';
    case 'retry':
      return 'outline';
    case 'awarded':
      return 'default'; // Or a new variant
    default:
      return 'secondary';
  }
}

export default function UserHistoryPage({ params }: { params: { userId: string } }) {
  const user = users.find(u => u.id === params.userId);

  if (!user) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <h1 className="text-2xl font-headline">User not found</h1>
        <Button asChild>
          <Link href="/user-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  const userTransactions = transactionHistory
    .filter((t) => t.userId === user.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
         <Button asChild variant="outline" size="icon">
          <Link href="/user-dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Image
          src={user.avatar}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
           <h1 className="text-lg font-semibold md:text-2xl font-headline">
            Transaction History for {user.name}
          </h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Full Activity Log</CardTitle>
          <CardDescription>A complete log of all transactions for this user.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount/Award</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userTransactions.map((transaction) => {
                  const asset = transaction.assetId ? digitalAssets.find(da => da.id === transaction.assetId) : null;
                  const isPendingTask = transaction.status === 'pending' && transaction.description.startsWith('Completed Quest:');
                  const isPendingPurchase = transaction.status === 'pending' && transaction.description.startsWith('Purchased:');

                  return (
                  <TableRow key={transaction.id}>
                    <TableCell className="text-muted-foreground text-xs">
                      {format(transaction.date, "MMM d, yyyy h:mm a")}
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
                       {transaction.change ? (
                          <span className={cn(
                            (['verified', 'auto-verified'].includes(transaction.status)) && "text-green-600",
                            (['spend', 'setback'].includes(transaction.status)) && "text-red-600",
                            transaction.status === 'pending' && "text-yellow-600"
                          )}>
                            {['verified', 'auto-verified'].includes(transaction.status) ? '+' : ['spend', 'setback'].includes(transaction.status) ? '-' : ''}
                            {transaction.change.amount} {transaction.change.currencyName}
                          </span>
                        ) : asset ? (
                            <span className="flex items-center gap-1 text-purple-600">
                            <Gift className="h-3 w-3"/>
                            <span className="truncate" title={asset.name}>{asset.name}</span>
                          </span>
                        ) : null}
                    </TableCell>
                    <TableCell className="text-right">
                      {isPendingTask && (
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
                       {isPendingPurchase && (
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" disabled>
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" disabled>
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      )}
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
