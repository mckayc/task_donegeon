
'use client';

import { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { transactionHistory, digitalAssets } from '@/lib/data';
import { useCurrentUser } from '@/hooks/use-current-user';
import { CalendarDays, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ActivityCalendarPage() {
  const currentUser = useCurrentUser();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const userTransactions = transactionHistory.filter(t => t.userId === currentUser?.id);

  const transactionDates = userTransactions.map(t => t.date);

  const dailyTransactions = userTransactions.filter(transaction =>
    date ? isSameDay(transaction.date, date) : false
  ).sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline flex items-center gap-2">
          <CalendarDays className="w-6 h-6" />
          Activity Calendar
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2">
               <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                modifiers={{
                  hasActivity: transactionDates,
                }}
                modifiersStyles={{
                  hasActivity: {
                    border: "2px solid hsl(var(--primary))",
                    borderRadius: 'var(--radius)',
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                Activity for {date ? format(date, 'PPP') : '...'}
              </CardTitle>
              <CardDescription>
                A log of your earnings and spendings for the selected day.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dailyTransactions.length > 0 ? (
                 <ul className="space-y-3">
                  {dailyTransactions.map((transaction) => {
                      const isEarn = ['verified', 'auto-verified'].includes(transaction.status);
                      const isSpend = ['spend', 'setback'].includes(transaction.status);
                      const isPending = transaction.status === 'pending';
                      const isAward = transaction.status === 'awarded';
                      const asset = isAward && transaction.assetId ? digitalAssets.find(da => da.id === transaction.assetId) : null;

                      return (
                        <li key={transaction.id} className="flex items-center justify-between text-sm p-3 rounded-lg bg-background border">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">{format(transaction.date, "h:mm a")}</p>
                          </div>
                           <div className="flex items-center gap-2">
                             {transaction.change ? (
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
                              ) : isAward && asset ? (
                                <Badge variant="outline" className="text-purple-600 border-purple-600/50">
                                  <Gift className="mr-1 h-3 w-3" />
                                  Award: {asset.name}
                                </Badge>
                              ) : (
                                <Badge variant="secondary">{transaction.status}</Badge>
                              )}
                          </div>
                        </li>
                      )
                    })}
                </ul>
              ) : (
                <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                  <p>No activity recorded for this day.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
