
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ranks, digitalAssets, users } from "@/lib/data";
import { CheckCircle2, Lock, Coins, Gem, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function RanksPage() {
  // Assuming current user is Adventurer Alex for demo
  const currentUser = users.find(u => u.id === '3');
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  
  const currentRank = ranks.find(r => r.id === currentUser?.rankId);
  const { gold, gems, stardust } = currentUser.purse;


  if (!currentRank) {
    return <div>Loading...</div>;
  }

  const getRankAsset = (assetId: string) => {
    return digitalAssets.find(asset => asset.id === assetId);
  }

  const isRankUnlocked = (rankLevel: number) => {
    return rankLevel <= currentRank.level;
  }

  const getProgress = (required: number, current: number) => {
    if (current >= required) return 100;
    return (current / required) * 100;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline flex items-center gap-2">
          <Award />
          Ranks of the Donegeon
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Path to Glory</CardTitle>
          <CardDescription>
            Complete tasks, earn currency, and ascend through the ranks. Your current rank is <span className="font-bold text-primary">{currentRank.name}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ranks.map((rank) => {
              const asset = getRankAsset(rank.assetId);
              const unlocked = isRankUnlocked(rank.level);

              return (
                <Card 
                  key={rank.id} 
                  className={cn(
                    "flex flex-col transition-all", 
                    !unlocked && "bg-muted/50 text-muted-foreground",
                    rank.id === currentRank.id && "border-primary border-2 shadow-lg"
                  )}
                >
                  <CardHeader className="flex-row items-center gap-4">
                    {asset && (
                      <Image
                        alt={rank.name}
                        className={cn("rounded-md", !unlocked && "grayscale")}
                        height="64"
                        src={asset.image}
                        width="64"
                        data-ai-hint={asset.aiHint}
                      />
                    )}
                    <div>
                       <p className="text-xs">Level {rank.level}</p>
                      <CardTitle className="text-lg font-headline">{rank.name}</CardTitle>
                    </div>
                     <div className="ml-auto">
                        {unlocked ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Lock className="w-6 h-6" />
                        )}
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="font-semibold">Requirements:</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                           <Coins className="w-4 h-4 text-yellow-500"/>
                           <span>{rank.requiredGold.toLocaleString()} Gold</span>
                        </div>
                        {!unlocked && <Progress value={getProgress(rank.requiredGold, gold)} className="h-2"/>}

                        <div className="flex items-center gap-2">
                           <Gem className="w-4 h-4 text-blue-500"/>
                           <span>{rank.requiredGems.toLocaleString()} Gems</span>
                        </div>
                        {!unlocked && <Progress value={getProgress(rank.requiredGems, gems)} className="h-2"/>}
                        
                        <div className="flex items-center gap-2">
                           <Star className="w-4 h-4 text-purple-500"/>
                           <span>{rank.requiredStardust.toLocaleString()} Stardust</span>
                        </div>
                         {!unlocked && <Progress value={getProgress(rank.requiredStardust, stardust)} className="h-2"/>}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
