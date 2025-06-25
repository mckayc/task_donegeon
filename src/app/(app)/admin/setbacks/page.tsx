
'use client';

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShieldOff } from "lucide-react";
import { type User, currencyDefinitions, users } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  userId: z.string().min(1, { message: "Please select a user." }),
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  currency: z.string().min(1, { message: "Please select a currency." }),
  reason: z
    .string()
    .min(10, { message: "Reason must be at least 10 characters." })
    .max(160, { message: "Reason must not be longer than 160 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SetbacksPage() {
  const { toast } = useToast();
  const adventurers = users.filter(u => u.role === 'Adventurer');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      amount: 10,
      currency: "Gold",
      reason: "",
    },
  });

  // NOTE: This is a prototype. The form submission does not actually
  // modify data. In a real application, this would call a server action.
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const user = adventurers.find(u => u.id === data.userId);
    console.log("Applying Setback:", data);
    toast({
        title: "Setback Applied (Prototype)",
        description: `Applied a setback of ${data.amount} ${data.currency} to ${user?.name}.`,
    });
    form.reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Apply Setback</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manual Penalty</CardTitle>
          <CardDescription>
            Deduct from an adventurer's purse for a rule infraction. This will
            appear in their transaction history.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
                <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Adventurer</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select an adventurer" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {adventurers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a currency" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {currencyDefinitions.map((c) => (
                                <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Reason for Penalty</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="e.g., Penalty for leaving adventuring gear in the main hall."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" variant="destructive">
                    <ShieldOff className="mr-2 h-4 w-4" />
                    Confirm Setback
                </Button>
            </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
