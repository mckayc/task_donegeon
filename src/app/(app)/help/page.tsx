
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline flex items-center gap-2">
          <HelpCircle className="w-6 h-6" />
          Help &amp; Guidance
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What is Task Donegeon?</CardTitle>
          <CardDescription>Your guide to understanding the purpose of this application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Task Donegeon transforms everyday tasks and chores into an exciting fantasy adventure. It's a gamified productivity tool designed for families, groups, or even individuals who want to make tracking responsibilities more engaging and rewarding.
          </p>
          <p>
            The goal is simple: complete real-world tasks, known as <strong>Quests</strong>, to earn virtual currency. You can then use this currency to purchase real-life rewards, level up through <strong>Ranks</strong>, and become a legendary hero in your own household!
          </p>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Terminology</CardTitle>
            <CardDescription>Learn the lingo of the Donegeon.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Adventurer</AccordionTrigger>
                <AccordionContent>
                  The hero of the story! An Adventurer is anyone who completes Quests to earn rewards.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Donegeon Master (DM)</AccordionTrigger>
                <AccordionContent>
                  The administrator of the app. The DM creates quests, manages users, defines rewards, and sets the rules of the game.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Bailiff</AccordionTrigger>
                <AccordionContent>
                  A moderator role appointed by the DM. Bailiffs can help verify that Adventurers have completed their quests.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Quests (Duties & Ventures)</AccordionTrigger>
                <AccordionContent>
                  <strong>Duties</strong> are recurring, everyday tasks like "Clean Your Lair" or "Homework Quest." <strong>Ventures</strong> are special, one-time quests that often carry greater rewards.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Purse & Currencies</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>Your purse holds three types of currency, each with a different purpose:</p>
                  <p><strong>Gold:</strong> Primarily earned from special <strong>Ventures</strong>, Gold is used to purchase tangible, real-world rewards from the Marketplace, like toys or special items.</p>
                  <p><strong>Gems:</strong> Also earned from <strong>Ventures</strong>, Gems are typically used to purchase experiences, activities, or special privileges, like a trip to the park or choosing the family movie.</p>
                  <p><strong>Stardust:</strong> The most common currency, earned from completing daily <strong>Duties</strong>. Stardust is used for in-game or digital purchases, like extra screen time or digital avatar items.</p>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-6">
                <AccordionTrigger>Hits</AccordionTrigger>
                <AccordionContent>
                  A penalty applied by a DM or Bailiff for a rule infraction, which deducts currency from an Adventurer's purse.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>Marketplace</AccordionTrigger>
                <AccordionContent>
                 A place to spend your currency. You can buy items from official markets or from stalls run by other Adventurers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Effective Use</CardTitle>
            <CardDescription>Suggestions for DMs and Adventurers.</CardDescription>
          </CardHeader>
          <CardContent>
             <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>For Donegeon Masters</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-2">
                    <p><strong>Start Simple:</strong> Begin with a few essential daily or weekly Duties to build a routine.</p>
                    <p><strong>Reward Behavior:</strong> Use Ventures to incentivize specific goals, like reading a book or helping with a big project.</p>
                    <p><strong>Keep it Balanced:</strong> Make Stardust the primary reward for most daily tasks, saving Gold and Gems for truly challenging Ventures.</p>
                    <p><strong>Get Creative:</strong> Use the "Suggest Tasks" AI feature in the Duties/Ventures pages to get new ideas tailored to your adventurers.</p>
                    <p><strong>Stay Engaged:</strong> Regularly check the User Dashboard and Approvals pages to verify tasks and keep the game economy flowing.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>For Adventurers</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-2">
                    <p><strong>Consistency is Key:</strong> Focus on completing your daily Duties to build up a steady income of Stardust.</p>
                    <p><strong>Save Up:</strong> Don't spend all your currency at once! Save your Gold and Gems for that big-ticket item you really want from the Marketplace.</p>
                    <p><strong>Become an Entrepreneur:</strong> Have a skill or a fun idea? Open your own stall in the Marketplace to sell goods or services to other players.</p>
                    <p><strong>Aim for the Top:</strong> Keep an eye on the Ranks page to see what you need to achieve your next level of glory!</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
