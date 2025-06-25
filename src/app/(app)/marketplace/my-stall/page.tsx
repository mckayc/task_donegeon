
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adventurerStoreItems } from "@/lib/data";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AddItemDialog } from '@/components/marketplace/add-item-dialog';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, className: 'text-yellow-500' },
  approved: { label: 'Approved', icon: CheckCircle, className: 'text-green-500' },
  rejected: { label: 'Rejected', icon: XCircle, className: 'text-red-500' },
}

export default function MyStallPage() {
  const currentUser = useCurrentUser();
  
  // NOTE: In a real app, this would be a state managed by adding new items
  const myItems = adventurerStoreItems.filter(item => item.sellerId === currentUser.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Manage Your Stall
        </h1>
        <div className="ml-auto">
           <AddItemDialog />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Wares for Sale</CardTitle>
          <CardDescription>
            Here are the items you've listed for sale. New items require DM approval before they appear to others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myItems.length > 0 ? myItems.map((item) => {
                const status = statusConfig[item.approvalStatus];
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground max-w-sm truncate">{item.description}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.cost.amount} {item.cost.currencyName}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <status.icon className={cn("w-4 h-4", status.className)} />
                        <span>{status.label}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" disabled={item.approvalStatus === 'approved'}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={item.approvalStatus === 'approved'}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }) : (
                 <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    You have no items for sale. Add one to get started!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
