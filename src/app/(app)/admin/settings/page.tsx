
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {

  const { toast } = useToast();

  const handleSave = () => {
    // In a real application, you would save these settings to a database.
    // For this prototype, we'll just show a success message.
    toast({
      title: "Settings Saved",
      description: "Your new settings have been successfully saved.",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Settings
        </h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>
              Manage general settings for your Donegeon.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="donegeon-name">Donegeon Name</Label>
              <Input
                id="donegeon-name"
                defaultValue="Task Donegeon"
                placeholder="Your Donegeon's Name"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moderation</CardTitle>
            <CardDescription>
              Configure rules for applying penalties and rewards.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="setbacks-in-debt" className="font-normal">
                  Allow Setbacks to Cause Debt
                </Label>
                <p className="text-sm text-muted-foreground">
                  If enabled, a user's currency can go into negative values.
                </p>
              </div>
              <Switch id="setbacks-in-debt" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure which email notifications are sent to users and admins.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="notif-task-verified" className="font-normal">
                  Task Verified
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notify adventurer when a task is verified by a DM.
                </p>
              </div>
              <Switch id="notif-task-verified" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="notif-rank-up" className="font-normal">
                  Rank Up
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notify adventurer when they achieve a new rank.
                </p>
              </div>
              <Switch id="notif-rank-up" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="notif-low-inventory" className="font-normal">
                  Low Inventory
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notify DMs when an inventory item is low on stock.
                </p>
              </div>
              <Switch id="notif-low-inventory" defaultChecked />
            </div>
             <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="notif-new-venture" className="font-normal">
                  New Venture Available
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notify adventurers when a new venture is added.
                </p>
              </div>
              <Switch id="notif-new-venture" />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
}
