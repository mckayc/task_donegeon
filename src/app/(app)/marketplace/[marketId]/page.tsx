
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { marketplaceMarkets, inventoryItems, currencyDefinitions } from "@/lib/data";
import { ArrowLeft, Lock } from "lucide-react";
import { MarketItemCard } from "@/components/marketplace/market-item";

export default function MarketPage({ params }: { params: { marketId: string } }) {
  const market = marketplaceMarkets.find(m => m.id === params.marketId);

  if (!market) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <h1 className="text-2xl font-headline">Market Not Found</h1>
        <Button asChild>
          <Link href="/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>
    )
  }

  const marketItems = inventoryItems.filter(item => 
    item.markets.includes(market.name) && item.availability === 'available'
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
         <Button asChild variant="outline" size="icon">
          <Link href="/marketplace">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <market.icon className="w-6 h-6" />
        </div>
        <div>
           <h1 className="text-lg font-semibold md:text-2xl font-headline">
            {market.name}
          </h1>
          <p className="text-sm text-muted-foreground">{market.description}</p>
        </div>
      </div>
      
      {market.status === 'locked' ? (
        <Card className="flex flex-col items-center justify-center p-8 border-2 border-dashed">
            <Lock className="w-12 h-12 text-muted-foreground mb-4"/>
            <h2 className="text-xl font-headline">This Market is Locked</h2>
            <p className="text-muted-foreground">{market.unlockCondition}</p>
        </Card>
      ) : marketItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marketItems.map(item => (
            <MarketItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <Card className="text-center text-muted-foreground p-8 border-2 border-dashed">
            <p>There are no items currently available in this market.</p>
        </Card>
      )}
    </div>
  );
}
