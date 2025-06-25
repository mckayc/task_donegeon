
import type { LucideIcon } from "lucide-react";
import { Coins, Gem, Star, ScrollText, Banknote, FlaskConical, Brush, Map, Timer, CheckCircle, Clock } from 'lucide-react';

export interface CurrencyDefinition {
  name: 'Gold' | 'Gems' | 'Stardust';
  icon: LucideIcon;
  isDeletable: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: {
    currencyName: CurrencyDefinition['name'];
    amount: number;
  };
  status: 'active' | 'completed';
  type: 'duty' | 'venture';
  verification: {
    type: 'manual' | 'auto' | 'timed';
    delayMinutes?: number;
  }
}

export interface MarketItem {
  id: string;
  name: string;
  description: string;
  cost: {
    currencyName: CurrencyDefinition['name'];
    amount: number;
  };
  image: string;
  aiHint: string;
}

export interface InventoryItem extends MarketItem {
  stock: number | 'infinite';
  notifyAt: number | null;
  availability: 'available' | 'unavailable';
  markets: string[];
  limit: {
    period: 'none' | 'daily' | 'weekly' | 'monthly';
    amount: number | null;
  };
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
  category: 'Avatar' | 'Badge' | 'Item' | 'Rank';
  image: string;
  aiHint: string;
}

export type Purse = {
  gold: number;
  gems: number;
  stardust: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Donegeon Master' | 'Bailiff' | 'Adventurer';
  avatar: string;
  rankId: string;
  purse: Purse;
  holdingPurse: Purse;
}

export interface Rank {
  id: string;
  name: string;
  level: number;
  requiredGold: number;
  requiredGems: number;
  requiredStardust: number;
  assetId: string;
}

export interface TransactionHistoryEntry {
  id: string;
  date: Date;
  userId: string;
  description: string;
  status: 'verified' | 'pending' | 'retry' | 'hit' | 'spend' | 'auto-verified';
  change: {
    currencyName: CurrencyDefinition['name'];
    amount: number;
  };
  taskId: string | null;
}

export const users: User[] = [
    { id: '1', name: 'DM Dave', email: 'dave@example.com', role: 'Donegeon Master', avatar: 'https://i.pravatar.cc/150?u=dm-dave', rankId: 'rank-30', purse: { gold: 100000, gems: 50000, stardust: 200000 }, holdingPurse: { gold: 0, gems: 0, stardust: 0 } },
    { id: '2', name: 'Moderator Mary', email: 'mary@example.com', role: 'Bailiff', avatar: 'https://i.pravatar.cc/150?u=mod-mary', rankId: 'rank-15', purse: { gold: 15000, gems: 2500, stardust: 50000 }, holdingPurse: { gold: 0, gems: 0, stardust: 0 } },
    { id: '3', name: 'Adventurer Alex', email: 'alex@example.com', role: 'Adventurer', avatar: 'https://i.pravatar.cc/150?u=adv-alex', rankId: 'rank-5', purse: { gold: 1095, gems: 310, stardust: 5500 }, holdingPurse: { gold: 75, gems: 0, stardust: 0 } },
    { id: '4', name: 'Adventurer Beth', email: 'beth@example.com', role: 'Adventurer', avatar: 'https://i.pravatar.cc/150?u=adv-beth', rankId: 'rank-2', purse: { gold: 450, gems: 50, stardust: 1200 }, holdingPurse: { gold: 50, gems: 0, stardust: 0 } },
];

const rankNames = [
  "Fledgling", "Novice", "Apprentice", "Initiate", "Journeyman", "Squire", 
  "Adept", "Knight-Aspirant", "Artisan", "Veteran", "Knight", "Ranger", 
  "Guardian", "Vanguard", "Sentinel", "Champion", "Master", "Warlord", 
  "Justicar", "Paragon", "Elite", "Conqueror", "Legend", "Mythic", 
  "Titan", "Demigod", "Ascendant", "Celestial", "Ethereal", "The Donegeon"
];

export const ranks: Rank[] = rankNames.map((name, i) => {
    const level = i + 1;
    return {
        id: `rank-${level}`,
        name: name,
        level: level,
        requiredGold: level * 250 + (level > 10 ? (level - 10) * 500 : 0) + (level > 20 ? (level - 20) * 2000 : 0),
        requiredGems: level * 50 + (level > 10 ? (level - 10) * 100 : 0) + (level > 20 ? (level - 20) * 400 : 0),
        requiredStardust: level * 500 + (level > 10 ? (level - 10) * 1000 : 0) + (level > 20 ? (level - 20) * 4000 : 0),
        assetId: `da-rank-${Math.min(level, 5)}` // Use 5 sample assets for all ranks for now
    }
});


export const digitalAssets: DigitalAsset[] = [
  { id: 'da1', name: 'Knight Helmet', category: 'Avatar', image: 'https://placehold.co/200x200.png', aiHint: 'knight helmet' },
  { id: 'da2', name: 'Wizard Hat', category: 'Avatar', image: 'https://placehold.co/200x200.png', aiHint: 'wizard hat' },
  { id: 'da3', name: 'Ranger Hood', category: 'Avatar', image: 'https://placehold.co/200x200.png', aiHint: 'ranger hood' },
  { id: 'da4', name: 'First Quest Badge', category: 'Badge', image: 'https://placehold.co/200x200.png', aiHint: 'bronze medal' },
  { id: 'da5', name: 'Week Streak Badge', category: 'Badge', image: 'https://placehold.co/200x200.png', aiHint: 'silver medal' },
  { id: 'da6', name: 'Master of Chores', category: 'Badge', image: 'https://placehold.co/200x200.png', aiHint: 'gold medal' },
  { id: 'da7', name: 'Health Potion', category: 'Item', image: 'https://placehold.co/200x200.png', aiHint: 'health potion' },
  { id: 'da8', name: 'Magic Key', category: 'Item', image: 'https://placehold.co/200x200.png', aiHint: 'glowing key' },
  // Rank assets
  { id: 'da-rank-1', name: 'Fledgling Crest', category: 'Rank', image: 'https://placehold.co/200x200.png', aiHint: 'bronze shield' },
  { id: 'da-rank-2', name: 'Adept Crest', category: 'Rank', image: 'https://placehold.co/200x200.png', aiHint: 'iron shield' },
  { id: 'da-rank-3', name: 'Knightly Crest', category: 'Rank', image: 'https://placehold.co/200x200.png', aiHint: 'steel shield' },
  { id: 'da-rank-4', name: 'Champion Crest', category: 'Rank', image: 'https://placehold.co/200x200.png', aiHint: 'silver shield' },
  { id: 'da-rank-5', name: 'Legendary Crest', category: 'Rank', image: 'https://placehold.co/200x200.png', aiHint: 'gold shield' },
];

export const earnedAssets: DigitalAsset[] = [
  digitalAssets[0],
  digitalAssets[3],
  digitalAssets[6],
];

export const currencyDefinitions: CurrencyDefinition[] = [
  { name: 'Gold', icon: Coins, isDeletable: false },
  { name: 'Gems', icon: Gem, isDeletable: false },
  { name: 'Stardust', icon: Star, isDeletable: false },
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Clean Your Lair',
    description: 'A tidy lair is a happy lair. Sweep, dust, and organize your personal space.',
    reward: { currencyName: 'Gold', amount: 50 },
    status: 'active',
    type: 'duty',
    verification: { type: 'timed', delayMinutes: 60 },
  },
  {
    id: '2',
    title: 'Homework Quest',
    description: 'Conquer the beast of knowledge! Complete all your homework assignments for today.',
    reward: { currencyName: 'Gold', amount: 75 },
    status: 'active',
    type: 'duty',
    verification: { type: 'manual' },
  },
  {
    id: '3',
    title: 'The Dishes Dragon',
    description: 'This fiery beast has left a pile of dirty plates. Wash and dry them to restore peace to the kitchen.',
    reward: { currencyName: 'Gold', amount: 40 },
    status: 'active',
    type: 'duty',
    verification: { type: 'auto' },
  },
    {
    id: '4',
    title: 'Yard Guardian',
    description: 'Patrol the yard and defeat the invading weeds. Rake the leaves to clear the pathways.',
    reward: { currencyName: 'Gems', amount: 10 },
    status: 'completed',
    type: 'venture',
    verification: { type: 'manual' },
  },
  {
    id: 'venture-2',
    title: 'Library Book Expedition',
    description: 'Embark on a special quest to the local library to find and check out a new book.',
    reward: { currencyName: 'Stardust', amount: 500 },
    status: 'active',
    type: 'venture',
    verification: { type: 'auto' },
  },
  {
    id: 'duty-4',
    title: 'Feed the Familiars',
    description: 'Ensure the household pets are fed and have fresh water.',
    reward: { currencyName: 'Gold', amount: 25 },
    status: 'active',
    type: 'duty',
    verification: { type: 'auto' },
  }
];

export const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Sword of Digital Power',
    description: 'An extra hour of video game time.',
    cost: { currencyName: 'Gold', amount: 200 },
    image: 'https://placehold.co/600x400.png',
    aiHint: 'glowing sword',
    stock: 10,
    notifyAt: 2,
    availability: 'available',
    markets: ["The Royal Scribe's Pass"],
    limit: { period: 'daily', amount: 1 },
  },
  {
    id: '2',
    name: 'Scroll of Moving Pictures',
    description: 'Choose the movie for family movie night.',
    cost: { currencyName: 'Gold', amount: 350 },
    image: 'https://placehold.co/600x400.png',
    aiHint: 'movie tickets',
    stock: 'infinite',
    notifyAt: null,
    availability: 'available',
    markets: ["The Wayfarer's Guild"],
    limit: { period: 'weekly', amount: 1 },
  },
  {
    id: '3',
    name: 'Ice Cream Elixir',
    description: 'A special trip to your favorite ice cream shop.',
    cost: { currencyName: 'Gems', amount: 50 },
    image: 'https://placehold.co/600x400.png',
    aiHint: 'ice cream',
    stock: 5,
    notifyAt: 1,
    availability: 'available',
    markets: ["The Apothecary's Confections"],
    limit: { period: 'none', amount: null },
  },
  {
    id: '4',
    name: 'Amulet of the Snooze',
    description: 'Sleep in an extra 30 minutes on a weekend.',
    cost: { currencyName: 'Stardust', amount: 1000 },
    image: 'https://placehold.co/600x400.png',
    aiHint: 'sleeping cat',
    stock: 'infinite',
    notifyAt: null,
    availability: 'unavailable',
    markets: ["The Royal Scribe's Pass"],
    limit: { period: 'none', amount: null },
  },
];

export const markets: Market[] = [
  {
    id: '1',
    name: 'General Store',
    description: 'Basic goods for the everyday adventurer.',
    status: 'open',
    items: inventoryItems,
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

export const allTasksForSuggester: Task[] = [
    ...tasks,
    {
        id: '5',
        title: 'Walk the dog',
        description: 'Take the family pet for a 20-minute walk.',
        reward: { currencyName: 'Gold', amount: 30 },
        status: 'completed',
        type: 'duty',
        verification: { type: 'manual' },
    },
    {
        id: '6',
        title: 'Read a book',
        description: 'Read a chapter of a book for 30 minutes.',
        reward: { currencyName: 'Stardust', amount: 200 },
        status: 'completed',
        type: 'duty',
        verification: { type: 'auto' },
    }
]

export const transactionHistory: TransactionHistoryEntry[] = [
  { id: 'th-alex-1', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), userId: '3', taskId: '2', description: 'Completed Quest: Homework Quest', status: 'pending', change: { currencyName: 'Gold', amount: 75 } },
  { id: 'th-alex-2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), userId: '3', taskId: '4', description: 'Completed Quest: Yard Guardian', status: 'verified', change: { currencyName: 'Gems', amount: 10 } },
  { id: 'th-alex-3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), userId: '3', taskId: null, description: 'Purchased: Sword of Digital Power', status: 'spend', change: { currencyName: 'Gold', amount: 200 } },
  { id: 'th-alex-4', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), userId: '3', taskId: 'duty-4', description: 'Completed Quest: Feed the Familiars', status: 'auto-verified', change: { currencyName: 'Gold', amount: 25 } },
  { id: 'th-alex-5', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), userId: '3', taskId: 'venture-2', description: 'Completed Quest: Library Book Expedition', status: 'auto-verified', change: { currencyName: 'Stardust', amount: 500 } },
  { id: 'th-alex-6', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), userId: '3', taskId: null, description: 'Penalty: Left adventuring gear in the hall.', status: 'hit', change: { currencyName: 'Gold', amount: 20 } },
  { id: 'th-beth-1', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), userId: '4', taskId: '1', description: 'Completed Quest: Clean Your Lair', status: 'pending', change: { currencyName: 'Gold', amount: 50 } },
];
