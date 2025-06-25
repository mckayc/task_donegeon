import { users, type User } from "@/lib/data";

// For demo purposes, we'll simulate a logged-in user.
// In a real app, this would come from an auth context.
export function useCurrentUser(): User {
  // We'll return the Donegeon Master by default to show all admin controls.
  // To test other roles, you can change this to 'Bailiff' or 'Adventurer'.
  return users.find(u => u.role === 'Donegeon Master')!;
}
