
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
import { Textarea } from "@/components/ui/textarea";
import { Gift } from "lucide-react";
import { type User, users, digitalAssets } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const formSchema = z.object({
  userId: z.string().min(1, { message: "Please select a user." }),
  assetId: z.string().min(1, { message: "Please select a trophy." }),
  note: z
    .string()
    .min(10, { message: "Note must be at least 10 characters." })
    .max(160, { message: "Note must not be longer than 160 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SurprisesPage() {
  const { toast } = useToast();
  const adventurers = users.filter(u => u.role === 'Adventurer');
  const surpriseTrophies = digitalAssets.filter(da => da.category === 'Surprise Trophy');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      assetId: "",
      note: "",
    },
  });

  // NOTE: This is a prototype. The form submission does not actually
  // modify data. In a real application, this would call a server action.
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const user = adventurers.find(u => u.id === data.userId);
    const asset = surpriseTrophies.find(t => t.id === data.assetId);

    console.log("Sending Surprise:", data);
    toast({
        title: "Surprise Sent (Prototype)",
        description: `Sent "${asset?.name}" to ${user?.name}.`,
    });
    form.reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Send a Surprise</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Spontaneous Reward</CardTitle>
          <CardDescription>
            Award an adventurer with a special trophy for behavior that goes above and beyond. This will appear in their transaction history.
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

                <FormField
                    control={form.control}
                    name="assetId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Surprise Trophy</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a trophy to award" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {surpriseTrophies.map((trophy) => (
                                <SelectItem key={trophy.id} value={trophy.id}>
                                    <div className="flex items-center gap-2">
                                        <Image src={trophy.image} alt={trophy.name} width={24} height={24} className="rounded-sm" data-ai-hint={trophy.aiHint} />
                                        <span>{trophy.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Note for Recipient</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="e.g., For showing incredible kindness to your sibling."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    <Gift className="mr-2 h-4 w-4" />
                    Send Surprise
                </Button>
            </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
