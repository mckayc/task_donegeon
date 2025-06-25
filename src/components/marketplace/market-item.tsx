
'use client';

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { type InventoryItem, currencyDefinitions, type Purse } from "@/lib/data";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

export function MarketItemCard({ item }: { item: InventoryItem }) {
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const [quantity, setQuantity] = useState(1);
  
  const currency = currencyDefinitions.find(c => c.name === item.cost.currencyName);

  const userBalance = currentUser.purse[item.cost.currencyName.toLowerCase() as keyof Purse];
  const totalCost = quantity * item.cost.amount;
  const canAfford = userBalance >= totalCost;

  const stockLimit = item.stock === 'infinite' ? Number.MAX_SAFE_INTEGER : item.stock;
  const purchaseLimit = item.limit.period !== 'none' && item.limit.amount ? item.limit.amount : Number.MAX_SAFE_INTEGER;
  const maxQuantity = Math.min(stockLimit, purchaseLimit);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(Math.min(value, maxQuantity));
    }
  };
  
  const handleBuy = () => {
    toast({
      title: `Purchase (${item.isDigital ? 'Instant' : 'Pending'})`,
      description: `Your purchase of ${quantity}x "${item.name}" for ${totalCost.toLocaleString()} ${item.cost.currencyName} has been submitted.`,
    });
  };

  return (
    <Card key={item.id} className="flex flex-col">
        <CardHeader>
            <div className="relative aspect-video w-full mb-4 rounded-md overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    data-ai-hint={item.aiHint}
                />
            </div>
            <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex-grow min-h-[40px]">{item.description}</CardDescription>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground border-t pt-2">
            <div className="flex justify-between items-center">
              <span>Unit Price:</span>
              <Badge variant="outline" className="flex items-center gap-1">
                {currency && <currency.icon className="w-3 h-3" />}
                {item.cost.amount.toLocaleString()}
              </Badge>
            </div>
             <div className="flex justify-between items-center">
              <span>In Stock:</span>
              <span>{item.stock}</span>
            </div>
            {item.limit.period !== 'none' && item.limit.amount && (
              <div className="flex justify-between items-center">
                <span>Limit:</span>
                <span className="capitalize">{item.limit.amount} / {item.limit.period.slice(0, -2)}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-3 mt-auto pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-r-none" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
              </Button>
              <Input
                  type="number"
                  className="h-9 w-12 text-center border-y-0 border-x bg-transparent shadow-none focus-visible:ring-0"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  max={maxQuantity}
              />
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-l-none" onClick={() => setQuantity(q => Math.min(q + 1, maxQuantity))} disabled={quantity >= maxQuantity}>
                  <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">Total Cost</span>
              <Badge variant="secondary" className="text-base flex items-center gap-2">
                  {currency && <currency.icon className="w-4 h-4" />}
                  {totalCost.toLocaleString()}
              </Badge>
            </div>
          </div>

          <Button size="sm" onClick={handleBuy} disabled={!canAfford}>
              <ShoppingCart className="mr-2 h-4 w-4"/>
              {canAfford ? `Buy (${quantity})` : 'Not enough funds'}
          </Button>
        </CardFooter>
    </Card>
  )
}
