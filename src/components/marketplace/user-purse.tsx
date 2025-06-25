
'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { currencyDefinitions } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

export function UserPurse() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-headline flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Your Purse
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="flex flex-col sm:flex-row gap-x-6 gap-y-2">
          {currencyDefinitions.map(currency => (
            <li key={currency.name} className="flex items-center justify-between sm:justify-start sm:gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <currency.icon className="w-5 h-5 text-accent" />
                <span className="font-semibold">{currency.name}</span>
              </div>
              <span className="font-mono text-sm font-semibold">{currentUser.purse[currency.name.toLowerCase() as keyof typeof currentUser.purse].toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
