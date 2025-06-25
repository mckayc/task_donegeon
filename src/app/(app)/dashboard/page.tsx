import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currencies, tasks, prizes } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const activeTasks = tasks.filter(task => task.status === 'active');
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-headline font-bold mb-2">Welcome, Adventurer!</h1>
      <p className="text-muted-foreground mb-8">Your journey continues. Here's your status.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                My Wallet
              </CardTitle>
              <CardDescription>Your hard-earned treasure.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {currencies.map(currency => (
                  <li key={currency.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <currency.icon className="w-6 h-6 text-accent" />
                      <span className="font-semibold">{currency.name}</span>
                    </div>
                    <span className="font-mono text-lg">{currency.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Active Quests</CardTitle>
              <CardDescription>Challenges await. Complete them for glorious rewards!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTasks.map(task => (
                <Card key={task.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <Badge variant="secondary" className="mb-2 bg-accent/20 text-accent-foreground">
                      +{task.reward.amount} {task.reward.currencyName}
                    </Badge>
                    <Button size="sm">Complete</Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>

           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Prize Trove</CardTitle>
              <CardDescription>Spend your loot on amazing prizes.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prizes.slice(0, 3).map(prize => (
                <Card key={prize.id} className="flex flex-col">
                  <div className="relative w-full h-40">
                    <Image
                      src={prize.image}
                      alt={prize.name}
                      fill
                      className="object-cover rounded-t-lg"
                      data-ai-hint={prize.aiHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{prize.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{prize.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Redeem for {prize.cost.amount} {prize.cost.currencyName}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
