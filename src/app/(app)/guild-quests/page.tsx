import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

export default function GuildQuestsPage() {
  // For now, we'll assume the user is not in a guild.
  const isInGuild = false;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Guild Quests
        </h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Users /> Your Guild
          </CardTitle>
          <CardDescription>
            Team up with others to tackle greater challenges.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isInGuild ? (
            <p>Guild quests will appear here.</p>
          ) : (
            <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
              <p>You are not yet part of a guild.</p>
              <p className="text-sm">
                Join a guild to participate in special quests!
              </p>
              <Button className="mt-4">Join a Guild</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
