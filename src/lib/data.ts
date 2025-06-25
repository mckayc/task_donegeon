import type { LucideIcon } from "lucide-react";
import { Coins, Gem, Star, Award, Sword, Shield } from 'lucide-react';

export interface Currency {
  name: string;
  amount: number;
  icon: LucideIcon;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: {
    currencyName: string;
    amount: number;
  };
  status: 'active' | 'completed';
}

export interface MarketItem {
  id: string;
  name: string;
  description: string;
  cost: {
    currencyName: string;
    amount: number;
  };
  image: string;
  aiHint: string;
}

export interface Market {
  id: string;
  name: string;
  description: string;
  status: 'open' | 'locked';
  unlocksAt?: number;
  items: MarketItem[];
}

export const currencies: Currency[] = [
  { name: 'Gold', amount: 1250, icon: Coins },
  { name: 'Gems', amount: 300, icon: Gem },
  { name: 'Stardust', amount: 5000, icon: Star },
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Clean Your Lair',
    description: 'A tidy lair is a happy lair. Sweep, dust, and organize your personal space.',
    reward: { currencyName: 'Gold', amount: 50 },
    status: 'active',
  },
  {
    id: '2',
    title: 'Homework Quest',
    description: 'Conquer the beast of knowledge! Complete all your homework assignments for today.',
    reward: { currencyName: 'Gold', amount: 75 },
    status: 'active',
  },
  {
    id: '3',
    title: 'The Dishes Dragon',
    description: 'This fiery beast has left a pile of dirty plates. Wash and dry them to restore peace to the kitchen.',
    reward: { currencyName: 'Gold', amount: 40 },
    status: 'active',
  },
    {
    id: '4',
    title: 'Yard Guardian',
    description: 'Patrol the yard and defeat the invading weeds. Rake the leaves to clear the pathways.',
    reward: { currencyName: 'Gems', amount: 10 },
    status: 'completed',
  },
];

const allItems: MarketItem[] = [
  {
    id: '1',
    name: 'Sword of Digital Power',
    description: 'An extra hour of video game time.',
    cost: { currencyName: 'Gold', amount: 200 },
    image: 'https://placehold.co/600x400.png',
    aiHint: 'glowing sword'
  },
  {
    id: '2',
    name: 'Scroll of Moving Pictures',
    description: 'Choose the movie for family movie night.',
    cost: { currencyName: 'Gold', amount: 350 },
    image: 'https://placehold.co/600x400.png',
    aiHint: 'movie tickets'
  },
  {
    id: '3',
    name: 'Ice Cream Elixir',
    description: 'A special trip to your favorite ice cream shop.',
    cost: { currencyName: 'Gems', amount: 50 },
    image: 'https://placehold.co/600x400.png',
    aiHint: 'ice cream'
  },
  {
    id: '4',
    name: 'Amulet of the Snooze',
    description: 'Sleep in an extra 30 minutes on a weekend.',
    cost: { currencyName: 'Stardust', amount: 1000 },
    image: 'https://placehold.co/600x400.png',
    aiHint: 'sleeping cat'
  },
];

export const markets: Market[] = [
  {
    id: '1',
    name: 'General Store',
    description: 'Basic goods for the everyday adventurer.',
    status: 'open',
    items: allItems,
  },
  {
    id: '2',
    name: "The Dragon's Hoard",
    description: 'A collection of rare artifacts, available only to the most accomplished heroes.',
    status: 'locked',
    unlocksAt: 10,
    items: [],
  },
];

/**
 * @deprecated The `prizes` export is deprecated and will be removed in a future version. 
 * Please use the `markets` export and access items from there.
 */
export const prizes: MarketItem[] = markets.flatMap(market => market.items);

export const allTasksForSuggester: Task[] = [
    ...tasks,
    {
        id: '5',
        title: 'Walk the dog',
        description: 'Take the family pet for a 20-minute walk.',
        reward: { currencyName: 'Gold', amount: 30 },
        status: 'completed',
    },
    {
        id: '6',
        title: 'Read a book',
        description: 'Read a chapter of a book for 30 minutes.',
        reward: { currencyName: 'Stardust', amount: 200 },
        status: 'completed',
    }
]
