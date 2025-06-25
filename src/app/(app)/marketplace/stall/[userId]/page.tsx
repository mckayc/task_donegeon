
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { users, adventurerStoreItems, currencyDefinitions } from "@/lib/data";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function UserStallPage({ params }: { params: { userId: string } }) {
  const user = users.find(u => u.id === params.userId);

  if (!user) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <h1 className="text-2xl font-headline">Adventurer's Stall Not Found</h1>
        <Button asChild>
          <Link href="/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>
    )
  }

  const userItems = adventurerStoreItems
    .filter((item) => item.sellerId === user.id && item.approvalStatus === 'approved');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
         <Button asChild variant="outline" size="icon">
          <Link href="/marketplace">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Image
          src={user.avatar}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
           <h1 className="text-lg font-semibold md:text-2xl font-headline">
            {user.name}'s Stall
          </h1>
          <p className="text-sm text-muted-foreground">Wares and services offered by a fellow adventurer.</p>
        </div>
      </div>
      
      {userItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userItems.map(item => {
            const currency = currencyDefinitions.find(c => c.name === item.cost.currencyName);
            return (
              <Card key={item.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription className="flex-grow">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center mt-auto pt-4">
                  <Badge variant="secondary" className="text-lg flex items-center gap-2">
                    {currency && <currency.icon className="w-4 h-4" />}
                    {item.cost.amount.toLocaleString()}
                  </Badge>
                  <Button size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4"/>
                    Buy
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="text-center text-muted-foreground p-8 border-2 border-dashed">
            <p>This adventurer has no approved items for sale right now.</p>
        </Card>
      )}
    </div>
  );
}
