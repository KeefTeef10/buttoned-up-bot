
export type UserTier = "free" | "premium";

export interface User {
  id: string;
  email: string;
  tier: UserTier;
  promptsUsedToday: number;
  promptsLimit: number;
  subscriptionEnd?: Date | null;
}
