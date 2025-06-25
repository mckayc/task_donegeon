
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
import { currencyDefinitions, transactionHistory, users } from "@/lib/data";
import { format } from "date-fns";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PurseHistoryPage() {
  // For demo purposes, let's assume the current user is Adventurer Alex
  const currentUser = users.find(u => u.id === '3');

  const totalEarnings = {
    Gold: transactionHistory
      .filter((t) => t.change.currencyName === "Gold" && t.type === "earn")
      .reduce((acc, t) => acc + t.change.amount, 0),
    Gems: transactionHistory
      .filter((t) => t.change.currencyName === "Gems" && t.type === "earn")
      .reduce((acc, t) => acc + t.change.amount, 0),
    Stardust: transactionHistory
      .filter((t) => t.change.currencyName === "Stardust" && t.type === "earn")
      .reduce((acc, t) => acc + t.change.amount, 0),
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

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
            A summary of your current balance vs. total lifetime earnings.
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
                    Current Balance:
                  </span>
                  <span className="font-mono text-xl font-bold">
                    {currentUser.purse[currency.name.toLowerCase() as keyof typeof currentUser.purse].toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm">
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
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionHistory
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="text-muted-foreground">
                      {format(transaction.date, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={cn(
                          transaction.type === "earn"
                            ? "text-green-600 border-green-600/50"
                            : "text-red-600 border-red-600/50"
                        )}
                      >
                        {transaction.type === 'earn' ? '+' : '-'}{transaction.change.amount.toLocaleString()}{" "}
                        {transaction.change.currencyName}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
