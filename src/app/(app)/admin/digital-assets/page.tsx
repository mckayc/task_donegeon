import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { digitalAssets } from "@/lib/data";
import { Upload } from "lucide-react";

export default function DigitalAssetsPage() {
  const categories = [...new Set(digitalAssets.map((asset) => asset.category))];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Digital Assets</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <Upload className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Upload Asset
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Asset Library</CardTitle>
          <CardDescription>
            Manage your library of digital rewards. Categorize and upload new assets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={categories[0]}>
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}s
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-4">
                  {digitalAssets
                    .filter((asset) => asset.category === category)
                    .map((asset) => (
                      <Card key={asset.id} className="overflow-hidden">
                        <div className="relative aspect-square">
                           <Image
                            alt={asset.name}
                            className="object-cover"
                            fill
                            src={asset.image}
                            data-ai-hint={asset.aiHint}
                          />
                        </div>
                        <div className="p-2 text-center">
                           <p className="text-xs font-medium truncate">{asset.name}</p>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
