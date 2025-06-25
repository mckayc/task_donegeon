import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { marketplaceMarkets } from "@/lib/data";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarketplacePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Marketplace
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceMarkets.map((market) => (
          <Link
            key={market.id}
            href={market.status === 'open' ? `/marketplace/${market.id}` : '#'}
            className={cn(
              "block transition-all hover:scale-105",
              market.status === 'locked' && "pointer-events-none"
            )}
            aria-disabled={market.status === 'locked'}
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
  );
}
