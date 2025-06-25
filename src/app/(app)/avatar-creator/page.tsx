
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Star } from 'lucide-react';

export default function AvatarCreatorPage() {
  // In a real app, these would come from user data and be more complex
  const [hair, setHair] = useState('short');
  const [eyes, setEyes] = useState('blue');
  const [shirt, setShirt] = useState('tunic');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline flex items-center gap-2">
          <Palette className="w-6 h-6" />
          Avatar Creator
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Avatar Preview */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Adventurer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-muted">
                <Image
                  src="https://placehold.co/256x256.png"
                  alt="Avatar Preview"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="pixel art adventurer"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Your custom avatar will appear here. As you unlock more items, new options will become available.
              </p>
              <Button>Save Avatar</Button>
            </CardContent>
          </Card>
        </div>

        {/* Customization Options */}
        <div className="md:col-span-2">
          <Tabs defaultValue="features">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="clothing">Clothing</TabsTrigger>
              <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Select your adventurer's features.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="font-semibold">Hair Style</Label>
                    <RadioGroup defaultValue={hair} onValueChange={setHair} className="grid grid-cols-2 gap-4 mt-2">
                      <Label htmlFor="hair-short" className="flex items-center gap-2 border rounded-md p-2 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary">
                        <RadioGroupItem value="short" id="hair-short" />
                        Short
                      </Label>
                      <Label htmlFor="hair-long" className="flex items-center gap-2 border rounded-md p-2 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary">
                        <RadioGroupItem value="long" id="hair-long" />
                        Long
                      </Label>
                      <Label htmlFor="hair-spiky" className="flex items-center justify-between border rounded-md p-2 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary text-muted-foreground has-[input:disabled]:hover:bg-transparent">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="spiky" id="hair-spiky" disabled />
                          Spiky (Locked)
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          1000 <Star className="w-3 h-3 text-yellow-400" />
                        </Badge>
                      </Label>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label className="font-semibold">Eye Color</Label>
                    <RadioGroup defaultValue={eyes} onValueChange={setEyes} className="grid grid-cols-2 gap-4 mt-2">
                      <Label htmlFor="eyes-blue" className="flex items-center gap-2 border rounded-md p-2 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary">
                        <RadioGroupItem value="blue" id="eyes-blue" />
                        Blue
                      </Label>
                       <Label htmlFor="eyes-green" className="flex items-center gap-2 border rounded-md p-2 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary">
                        <RadioGroupItem value="green" id="eyes-green" />
                        Green
                      </Label>
                      <Label htmlFor="eyes-brown" className="flex items-center gap-2 border rounded-md p-2 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary">
                        <RadioGroupItem value="brown" id="eyes-brown" />
                        Brown
                      </Label>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="clothing">
                <Card>
                <CardHeader>
                  <CardTitle>Apparel</CardTitle>
                  <CardDescription>Outfit your adventurer for their quests.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div>
                    <Label className="font-semibold">Shirt</Label>
                    <RadioGroup defaultValue={shirt} onValueChange={setShirt} className="grid grid-cols-2 gap-4 mt-2">
                      <Label htmlFor="shirt-tunic" className="flex items-center gap-2 border rounded-md p-2 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary">
                        <RadioGroupItem value="tunic" id="shirt-tunic" />
                        Simple Tunic
                      </Label>
                      <Label htmlFor="shirt-armor" className="flex items-center justify-between border rounded-md p-2 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary text-muted-foreground has-[input:disabled]:hover:bg-transparent">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="armor" id="shirt-armor" disabled />
                          Leather Armor (Locked)
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          2500 <Star className="w-3 h-3 text-yellow-400" />
                        </Badge>
                      </Label>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
             <TabsContent value="backgrounds">
               <Card>
                 <CardHeader>
                    <CardTitle>Backgrounds</CardTitle>
                    <CardDescription>Set the scene for your adventurer's portrait.</CardDescription>
                 </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                      <p>Backgrounds are coming soon!</p>
                    </div>
                  </CardContent>
               </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
