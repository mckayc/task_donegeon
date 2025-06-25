
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ShieldMinus } from "lucide-react";
import { type User, currencyDefinitions } from "@/lib/data";

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  currency: z.string().min(1, { message: "Please select a currency." }),
  reason: z
    .string()
    .min(10, { message: "Reason must be at least 10 characters." })
    .max(160, { message: "Reason must not be longer than 160 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export function ApplySetbackDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 10,
      currency: "Gold",
      reason: "",
    },
  });

  // NOTE: This is a prototype. The form submission does not actually
  // modify data. In a real application, this would call a server action.
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Applying Setback:", {
      userId: user.id,
      ...data,
    });
    // Here you would typically call a server action to update the database
    // and revalidate the page data.
    alert(
      `Prototype: Applied a setback of ${data.amount} ${data.currency} to ${user.name}. Check the console for details.`
    );
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <ShieldMinus className="mr-2 h-4 w-4" />
          Apply Setback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply Setback to {user.name}</DialogTitle>
          <DialogDescription>
            Deduct from an adventurer's purse for a rule infraction. This will
            appear in their transaction history.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
                      placeholder="e.g., Penalty: Left adventuring gear in the hall."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" variant="destructive">
                Confirm Setback
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
