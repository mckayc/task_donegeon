import type { LucideIcon } from "lucide-react";
import { Coins, Gem, Star, Award, Sword, Shield, ScrollText, Banknote, FlaskConical, Brush, Map } from 'lucide-react';

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
  type: 'duty' | 'venture';
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
  unlockCondition?: string;
  items: MarketItem[];
}

export interface MarketplaceMarket extends Market {
    icon: LucideIcon;
}


export interface DigitalAsset {
  id: string;
  name: string;
  category: 'Avatar' | 'Badge' | 'Item';
  image: string;
  aiHint: string;
}

export const digitalAssets: DigitalAsset[] = [
  { id: 'da1', name: 'Knight Helmet', category: 'Avatar', image: 'https://placehold.co/200x200.png', aiHint: 'knight helmet' },
  { id: 'da2', name: 'Wizard Hat', category: 'Avatar', image: 'https://placehold.co/200x200.png', aiHint: 'wizard hat' },
  { id: 'da3', name: 'Ranger Hood', category: 'Avatar', image: 'https://placehold.co/200x200.png', aiHint: 'ranger hood' },
  { id: 'da4', name: 'First Quest Badge', category: 'Badge', image: 'https://placehold.co/200x200.png', aiHint: 'bronze medal' },
  { id: 'da5', name: 'Week Streak Badge', category: 'Badge', image: 'https://placehold.co/200x200.png', aiHint: 'silver medal' },
  { id: 'da6', name: 'Master of Chores', category: 'Badge', image: 'https://placehold.co/200x200.png', aiHint: 'gold medal' },
  { id: 'da7', name: 'Health Potion', category: 'Item', image: 'https://placehold.co/200x200.png', aiHint: 'health potion' },
  { id: 'da8', name: 'Magic Key', category: 'Item', image: 'https://placehold.co/200x200.png', aiHint: 'glowing key' },
];

export const earnedAssets: DigitalAsset[] = [
  digitalAssets[0],
  digitalAssets[3],
  digitalAssets[6],
];

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
    type: 'duty',
  },
  {
    id: '2',
    title: 'Homework Quest',
    description: 'Conquer the beast of knowledge! Complete all your homework assignments for today.',
    reward: { currencyName: 'Gold', amount: 75 },
    status: 'active',
    type: 'duty',
  },
  {
    id: '3',
    title: 'The Dishes Dragon',
    description: 'This fiery beast has left a pile of dirty plates. Wash and dry them to restore peace to the kitchen.',
    reward: { currencyName: 'Gold', amount: 40 },
    status: 'active',
    type: 'duty',
  },
    {
    id: '4',
    title: 'Yard Guardian',
    description: 'Patrol the yard and defeat the invading weeds. Rake the leaves to clear the pathways.',
    reward: { currencyName: 'Gems', amount: 10 },
    status: 'completed',
    type: 'venture',
  },
  {
    id: 'venture-2',
    title: 'Library Book Expedition',
    description: 'Embark on a special quest to the local library to find and check out a new book.',
    reward: { currencyName: 'Stardust', amount: 500 },
    status: 'active',
    type: 'venture',
  },
  {
    id: 'duty-4',
    title: 'Feed the Familiars',
    description: 'Ensure the household pets are fed and have fresh water.',
    reward: { currencyName: 'Gold', amount: 25 },
    status: 'active',
    type: 'duty'
  }
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
    unlockCondition: 'Complete 10 Ventures to unlock.',
    items: [],
  },
];

export const marketplaceMarkets: MarketplaceMarket[] = [
  {
    id: 'scribe',
    name: "The Royal Scribe's Pass",
    description: "Exchange currency for screen time.",
    status: 'locked',
    unlockCondition: "Complete all Daily Duties to unlock.",
    icon: ScrollText,
    items: [],
  },
  {
    id: 'treasury',
    name: "The Royal Treasury",
    description: "Deposit and manage your earnings.",
    status: 'open',
    icon: Banknote,
    items: [],
  },
  {
    id: 'apothecary',
    name: "The Apothecary's Confections",
    description: "Purchase sweet treats and elixirs.",
    status: 'open',
    icon: FlaskConical,
    items: [],
  },
  {
    id: 'artificer',
    name: "The Artificer's Emporium",
    description: "Acquire rare and beautiful digital assets.",
    status: 'open',
    icon: Brush,
    items: [],
  },
  {
    id: 'wayfarer',
    name: "The Wayfarer's Guild",
    description: "Plan and purchase real-world excursions.",
    status: 'locked',
    unlockCondition: "Save up 500 Gems to unlock.",
    icon: Map,
    items: [],
  }
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
        type: 'duty'
    },
    {
        id: '6',
        title: 'Read a book',
        description: 'Read a chapter of a book for 30 minutes.',
        reward: { currencyName: 'Stardust', amount: 200 },
        status: 'completed',
        type: 'duty'
    }
]
