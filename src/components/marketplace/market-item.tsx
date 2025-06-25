
'use client';

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
import { type InventoryItem, currencyDefinitions } from "@/lib/data";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function MarketItemCard({ item }: { item: InventoryItem }) {
  const { toast } = useToast();
  const currency = currencyDefinitions.find(c => c.name === item.cost.currencyName);

  const handleBuy = () => {
    // In a real app, this would trigger a server action to
    // process the purchase. For this prototype, we'll just show a toast.
    toast({
      title: `Purchase (${item.isDigital ? 'Instant' : 'Pending'})`,
      description: `Your purchase of "${item.name}" has been submitted.`,
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
            <CardDescription className="flex-grow min-h-[40px]">{item.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center mt-auto pt-4">
            <Badge variant="secondary" className="text-lg flex items-center gap-2">
                {currency && <currency.icon className="w-4 h-4" />}
                {item.cost.amount.toLocaleString()}
            </Badge>
            <Button size="sm" onClick={handleBuy}>
                <ShoppingCart className="mr-2 h-4 w-4"/>
                Buy
            </Button>
        </CardFooter>
    </Card>
  )
}
