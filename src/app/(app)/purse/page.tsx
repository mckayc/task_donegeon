
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currencyDefinitions, transactionHistory, users, digitalAssets } from "@/lib/data";
import { format } from "date-fns";
import { Wallet, Gift, XCircle, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PurseHistoryPage() {
  // For demo purposes, let's assume the current user is Adventurer Alex
  const currentUser = users.find(u => u.id === '3');
  const userTransactions = transactionHistory.filter(t => t.userId === currentUser?.id);

  if (!currentUser) {
    return <div>Loading...</div>;
  }
  
  const hasHolding = Object.values(currentUser.holdingPurse).some(v => v > 0);

  const totalEarnings = {
    Gold: userTransactions
      .filter((t) => t.change?.currencyName === "Gold" && ['verified', 'auto-verified'].includes(t.status))
      .reduce((acc, t) => acc + (t.change?.amount || 0), 0),
    Gems: userTransactions
      .filter((t) => t.change?.currencyName === "Gems" && ['verified', 'auto-verified'].includes(t.status))
      .reduce((acc, t) => acc + (t.change?.amount || 0), 0),
    Stardust: userTransactions
      .filter((t) => t.change?.currencyName === "Stardust" && ['verified', 'auto-verified'].includes(t.status))
      .reduce((acc, t) => acc + (t.change?.amount || 0), 0),
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline flex items-center gap-2">
          <Wallet /> Purse History
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>
            A summary of your current balance and total lifetime earnings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currencyDefinitions.map((currency) => (
              <Card key={currency.name} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <currency.icon className="w-6 h-6 text-accent" />
                  <h3 className="font-semibold text-lg">{currency.name}</h3>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">
                    Available:
                  </span>
                  <span className="font-mono text-xl font-bold">
                    {currentUser.purse[currency.name.toLowerCase() as keyof typeof currentUser.purse].toLocaleString()}
                  </span>
                </div>
                {currentUser.holdingPurse[currency.name.toLowerCase() as keyof typeof currentUser.holdingPurse] > 0 && (
                   <div className="flex justify-between items-baseline text-sm">
                    <span className="text-muted-foreground">
                      In Holding:
                    </span>
                    <span className="font-mono">
                      {currentUser.holdingPurse[currency.name.toLowerCase() as keyof typeof currentUser.holdingPurse].toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-baseline text-sm mt-2 pt-2 border-t border-dashed">
                  <span className="text-muted-foreground">
                    Total Earned:
                  </span>
                  <span className="font-mono">
                    {
                      (totalEarnings[currency.name as keyof typeof totalEarnings] || 0)
                        .toLocaleString()
                    }
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            A complete log of all your earnings and spendings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userTransactions
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((transaction) => {
                  const isEarn = ['verified', 'auto-verified'].includes(transaction.status);
                  const isSpend = transaction.status === 'spend';
                  const isSetback = transaction.status === 'setback';
                  const isPending = transaction.status === 'pending';
                  const isAward = transaction.status === 'awarded';
                  const asset = isAward && transaction.assetId ? digitalAssets.find(da => da.id === transaction.assetId) : null;
                  
                  const isPendingPurchase = isPending && transaction.description.startsWith('Purchased:');

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="text-muted-foreground text-xs">
                        {format(transaction.date, "MMM d, yyyy h:mm a")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isSetback || transaction.status === 'cancelled' ? 'destructive' : isPending ? 'secondary' : 'outline'} className="capitalize">
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         {transaction.change ? (
                          <Badge
                            variant="outline"
                            className={cn(
                              isEarn && "text-green-600 border-green-600/50",
                              (isSpend || isSetback) && "text-red-600 border-red-600/50",
                              isPending && "text-yellow-600 border-yellow-600/50"
                            )}
                          >
                            {isEarn ? '+' : (isSpend || isSetback) ? '-' : ''}{transaction.change.amount.toLocaleString()}{" "}
                            {transaction.change.currencyName}
                          </Badge>
                         ) : isAward && asset ? (
                          <Badge variant="outline" className="text-purple-600 border-purple-600/50">
                            <Gift className="mr-1 h-3 w-3" />
                             Award: {asset.name}
                          </Badge>
                         ) : (
                           <span className="text-muted-foreground">--</span>
                         )}
                      </TableCell>
                       <TableCell className="text-right">
                         {isPendingPurchase && (
                          <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600" disabled>
                             <XCircle className="mr-2 h-4 w-4" />
                             Cancel
                          </Button>
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
