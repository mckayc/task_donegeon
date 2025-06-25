
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
import { Trophy, Award, History } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function QuestItem({ task }: { task: Task }) {
  return (
    <Card className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
      <div className="flex-shrink-0 text-right space-y-2">
        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
          +{task.reward.amount} {task.reward.currencyName}
        </Badge>
        <Button size="sm">Complete</Button>
      </div>
    </Card>
  )
}

export default function QuestsPage() {
  const activeDuties = tasks.filter(task => task.status === 'active' && task.type === 'duty');
  const activeVentures = tasks.filter(task => task.status === 'active' && task.type === 'venture');
  
  // For demo purposes, let's assume the current user is Adventurer Alex
  const currentUser = users.find(u => u.id === '3');
  const currentRank = ranks.find(r => r.id === currentUser?.rankId);
  const rankAsset = digitalAssets.find(da => da.id === currentRank?.assetId);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const userTransactions = transactionHistory.filter(t => t.userId === currentUser.id);

  return (
    <div className="container mx-auto p-0">
      <h1 className="text-4xl font-headline font-bold mb-2">Your Quests</h1>
      <p className="text-muted-foreground mb-8">Adventure awaits! Complete quests to earn rewards.</p>
      
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
                  <CardTitle className="font-headline">Daily & Recurring Duties ({activeDuties.length})</CardTitle>
                  <CardDescription>The backbone of a true adventurer's discipline.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  {activeDuties.length > 0 ? activeDuties.map(task => (
                      <QuestItem key={task.id} task={task} />
                  )) : <p className="text-muted-foreground">No active duties at the moment. Check back later!</p>}
              </CardContent>
            </Card>

             <Card className="shadow-lg">
              <CardHeader>
                  <CardTitle className="font-headline">Unique Ventures ({activeVentures.length})</CardTitle>
                  <CardDescription>One-time quests for special rewards.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  {activeVentures.length > 0 ? activeVentures.map(task => (
                      <QuestItem key={task.id} task={task} />
                  )) : <p className="text-muted-foreground">No active ventures available. A new adventure will begin soon!</p>}
              </CardContent>
            </Card>
        </div>
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><History /> Recent Activity</CardTitle>
          <CardDescription>Your last 5 recorded activities in the Donegeon.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {userTransactions
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .slice(0, 5)
              .map((transaction) => {
                const isEarn = ['verified', 'auto-verified'].includes(transaction.status);
                const isSpend = ['spend', 'hit'].includes(transaction.status);
                const isPending = transaction.status === 'pending';
                return (
                  <li key={transaction.id} className="flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{format(transaction.date, "MMM d, yyyy 'at' h:mm a")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Badge variant="outline" className={cn({
                          "text-yellow-600 border-yellow-600/50": isPending,
                       })}>
                        {transaction.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          isEarn && "text-green-600 border-green-600/50",
                          isSpend && "text-red-600 border-red-600/50",
                          isPending && "text-yellow-600 border-yellow-600/50"
                        )}
                      >
                        {isEarn ? '+' : isSpend ? '-' : ''}{transaction.change.amount.toLocaleString()} {transaction.change.currencyName}
                      </Badge>
                    </div>
                  </li>
                )
              })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
