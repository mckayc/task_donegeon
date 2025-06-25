
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { marketplaceMarkets, users, adventurerStoreItems } from "@/lib/data";
import { Lock, Store, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarketplacePage() {
  const approvedItems = adventurerStoreItems.filter(item => item.approvalStatus === 'approved');
  const userStalls = [...new Set(approvedItems.map(item => item.sellerId))].map(sellerId => {
    return users.find(u => u.id === sellerId);
  }).filter(Boolean); // filter out undefined if user not found

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Marketplace
        </h1>
        <Button asChild className="ml-auto">
          <Link href="/marketplace/my-stall">
            <Store className="mr-2 h-4 w-4" />
            Manage Your Stall
          </Link>
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">Official Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceMarkets.map((market) => (
            <Link
              key={market.id}
              href={`/marketplace/${market.id}`}
              className="block transition-all hover:scale-105"
            >
              <Card
                className={cn(
                  "h-full flex flex-col",
                  market.status === 'locked' && "bg-muted/50"
                )}
              >
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <market.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="font-headline">{market.name}</CardTitle>
                    <CardDescription>{market.description}</CardDescription>
                  </div>
                </CardHeader>
                {market.status === 'locked' && (
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-background/50 rounded-md border border-dashed">
                      <Lock className="w-4 h-4 flex-shrink-0" />
                      <span>{market.unlockCondition}</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">Adventurer Stalls</h2>
        {userStalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userStalls.map((user) => user && (
              <Link key={user.id} href={`/marketplace/stall/${user.id}`} className="block transition-all hover:scale-105">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                       <Image
                        src={user.avatar}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <CardTitle className="font-headline">{user.name}'s Stall</CardTitle>
                        <CardDescription>Browse wares from a fellow adventurer.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                   <CardContent className="flex-grow flex items-end justify-end">
                      <Button variant="outline" size="sm">
                        Visit Stall <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="text-center text-muted-foreground p-8 border-2 border-dashed">
            <p>No adventurer stalls are open at the moment.</p>
            <p className="text-sm">Check back later!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
