
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currencyDefinitions, tasks, earnedAssets, users, ranks, digitalAssets, transactionHistory, type Task } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, History, Repeat, Compass, Gift, Hourglass } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const activeDutiesCount = tasks.filter(task => task.status === 'active' && task.type === 'duty').length;
  const activeVenturesCount = tasks.filter(task => task.status === 'active' && task.type === 'venture').length;
  
  // For demo purposes, let's assume the current user is Adventurer Alex
  const currentUser = users.find(u => u.id === '3');
  const currentRank = ranks.find(r => r.id === currentUser?.rankId);
  const rankAsset = digitalAssets.find(da => da.id === currentRank?.assetId);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const userTransactions = transactionHistory.filter(t => t.userId === currentUser.id);
  const hasHolding = Object.values(currentUser.holdingPurse).some(v => v > 0);

  return (
    <div className="container mx-auto p-0">
      <h1 className="text-4xl font-headline font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">An overview of your adventurer's journey.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">

           {currentRank && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Award />
                  Rank
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center gap-4">
                {rankAsset && (
                  <Image
                    alt={currentRank.name}
                    className="rounded-full border-4 border-primary"
                    height="100"
                    width="100"
                    src={rankAsset.image}
                    data-ai-hint={rankAsset.aiHint}
                  />
                )}
                <div className="space-y-1">
                   <p className="text-2xl font-bold font-headline">{currentRank.name}</p>
                   <p className="text-sm text-muted-foreground">Level {currentRank.level}</p>
                </div>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full">
                  <Link href="/ranks">
                    View All Ranks <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">
                Purse
              </CardTitle>
              <CardDescription>Your hard-earned treasure.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {currencyDefinitions.map(currency => (
                  <li key={currency.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <currency.icon className="w-6 h-6 text-accent" />
                      <span className="font-semibold">{currency.name}</span>
                    </div>
                    <span className="font-mono text-lg">{currentUser.purse[currency.name.toLowerCase() as keyof typeof currentUser.purse].toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              {hasHolding && (
                <div className="mt-4 pt-4 border-t border-dashed">
                  <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2 mb-2"><Hourglass className="w-4 h-4" /> In Holding</p>
                  <ul className="space-y-2">
                    {currencyDefinitions.map(currency => {
                      const holdingAmount = currentUser.holdingPurse[currency.name.toLowerCase() as keyof typeof currentUser.holdingPurse];
                      if (holdingAmount > 0) {
                        return (
                          <li key={`${currency.name}-holding`} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <currency.icon className="w-4 h-4" />
                              <span className="font-semibold">{currency.name}</span>
                            </div>
                            <span className="font-mono">{holdingAmount.toLocaleString()}</span>
                          </li>
                        )
                      }
                      return null;
                    })}
                  </ul>
                </div>
              )}
            </CardContent>
             <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href="/purse">
                  <History className="mr-2" />
                  View History
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Trophy />
                Trophies
              </CardTitle>
              <CardDescription>Your collection of digital awards.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    {earnedAssets.map(asset => (
                        <div key={asset.id} className="relative aspect-square" title={asset.name}>
                             <Image
                                alt={asset.name}
                                className="object-cover rounded-md border-2 border-accent/50"
                                fill
                                src={asset.image}
                                data-ai-hint={asset.aiHint}
                             />
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><History /> Recent Activity</CardTitle>
                <CardDescription>Your last 10 recorded activities in the Donegeon.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {userTransactions
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .slice(0, 10)
                    .map((transaction) => {
                      const isEarn = ['verified', 'auto-verified'].includes(transaction.status);
                      const isSpend = transaction.status === 'spend';
                      const isSetback = transaction.status === 'setback';
                      const isPending = transaction.status === 'pending';
                      const isAward = transaction.status === 'awarded';
                      const asset = isAward && transaction.assetId ? digitalAssets.find(da => da.id === transaction.assetId) : null;

                      return (
                        <li key={transaction.id} className="flex items-center justify-between text-sm">
                          <div className="flex flex-col">
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">{format(transaction.date, "MMM d, yyyy 'at' h:mm a")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={cn({
                                "text-yellow-600 border-yellow-600/50": isPending,
                                "text-purple-600 border-purple-600/50": isAward,
                            })}>
                              {transaction.status}
                            </Badge>
                             {transaction.change ? (
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    isEarn && "text-green-600 border-green-600/50",
                                    (isSpend || isSetback) && "text-red-600 border-red-600/50",
                                    isPending && "text-yellow-600 border-yellow-600/50"
                                  )}
                                >
                                  {isEarn ? '+' : (isSpend || isSetback) ? '-' : ''}{transaction.change.amount.toLocaleString()} {transaction.change.currencyName}
                                </Badge>
                              ) : isAward && asset ? (
                                <Badge variant="outline" className="text-purple-600 border-purple-600/50">
                                  <Gift className="mr-1 h-3 w-3" />
                                  {asset.name}
                                </Badge>
                              ) : null}
                          </div>
                        </li>
                      )
                    })}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Repeat /> Daily & Recurring Duties</CardTitle>
                    <CardDescription>The backbone of a true adventurer's discipline. You have {activeDutiesCount} active duties.</CardDescription>
                </CardHeader>
                <CardFooter>
                   <Button asChild className="w-full">
                    <Link href="/duties">
                      View All Duties <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

               <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Compass /> Unique Ventures</CardTitle>
                    <CardDescription>One-time quests for special rewards. There are {activeVenturesCount} ventures available.</CardDescription>
                </CardHeader>
                <CardFooter>
                   <Button asChild className="w-full">
                    <Link href="/ventures">
                      View All Ventures <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
