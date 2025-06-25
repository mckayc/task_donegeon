
'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tasks, currencyDefinitions, type Task } from "@/lib/data";
import { Compass } from 'lucide-react';

const taskCategories = [...new Set(tasks.map(t => t.category))];

function QuestItem({ task }: { task: Task }) {
  return (
    <Card className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <Badge variant="outline" className="mt-2 capitalize">{task.category}</Badge>
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

export default function VenturesPage() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');
  const [amountFilter, setAmountFilter] = useState('');
  
  const activeVentures = useMemo(() => {
    return tasks.filter(task => {
      let passes = task.type === 'venture' && task.status === 'active';
      if (categoryFilter !== 'all' && task.category !== categoryFilter) {
        passes = false;
      }
      if (currencyFilter !== 'all' && task.reward.currencyName !== currencyFilter) {
        passes = false;
      }
      if (amountFilter && task.reward.amount < parseInt(amountFilter, 10)) {
        passes = false;
      }
      return passes;
    });
  }, [categoryFilter, currencyFilter, amountFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline flex items-center gap-2">
          <Compass /> Ventures
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Ventures</CardTitle>
          <CardDescription>
            Find specific ventures using the filters below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {taskCategories.map(category => (
                <SelectItem key={category} value={category} className="capitalize">{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Filter by currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Currencies</SelectItem>
              {currencyDefinitions.map(currency => (
                <SelectItem key={currency.name} value={currency.name}>{currency.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input 
            type="number"
            placeholder="Minimum reward amount"
            className="sm:w-[220px]"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {activeVentures.length > 0 ? activeVentures.map(task => (
            <QuestItem key={task.id} task={task} />
        )) : (
          <Card className="text-center text-muted-foreground p-8">
            <p>No ventures match your current filters.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
