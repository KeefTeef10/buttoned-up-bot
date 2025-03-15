
import { User, UserTier } from "@/types/user";
import { toast } from "@/components/ui/use-toast";

// Mock storage keys
const USER_STORAGE_KEY = "promptgen_user";
const PROMPTS_COUNT_KEY = "promptgen_prompts_count";

// In a real app, these would be API calls to your backend
export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, validate credentials against backend
    if (!email.includes('@') || password.length < 6) {
      throw new Error("Invalid credentials");
    }
    
    // Check if user exists in local storage
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email) {
        // Check if we need to reset the daily prompt count (in a real app, this would be on the server)
        const lastUsedDate = localStorage.getItem("promptgen_last_used_date");
        const today = new Date().toDateString();
        
        if (lastUsedDate !== today) {
          user.promptsUsedToday = 0;
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
          localStorage.setItem("promptgen_last_used_date", today);
        }
        
        return user;
      }
    }
    
    // Create a new user if not found
    const newUser: User = {
      id: Date.now().toString(),
      email,
      tier: "free",
      promptsUsedToday: 0,
      promptsLimit: 5,
      subscriptionEnd: null
    };
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem("promptgen_last_used_date", new Date().toDateString());
    
    return newUser;
  },
  
  signup: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      tier: "free",
      promptsUsedToday: 0,
      promptsLimit: 5,
      subscriptionEnd: null
    };
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem("promptgen_last_used_date", new Date().toDateString());
    
    return newUser;
  },
  
  logout: async (): Promise<void> => {
    // Clear user data from storage
    localStorage.removeItem(USER_STORAGE_KEY);
  },
  
  getCurrentUser: (): User | null => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) return null;
    
    const user = JSON.parse(storedUser);
    
    // Check if we need to reset the daily prompt count
    const lastUsedDate = localStorage.getItem("promptgen_last_used_date");
    const today = new Date().toDateString();
    
    if (lastUsedDate !== today) {
      user.promptsUsedToday = 0;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem("promptgen_last_used_date", today);
    }
    
    return user;
  },
  
  updateUser: (userData: Partial<User>): User => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("No user logged in");
    }
    
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  },
  
  incrementPromptCount: (): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    
    // For premium users, don't limit
    if (user.tier === "premium") return true;
    
    // For free users, check limit
    if (user.promptsUsedToday >= user.promptsLimit) {
      toast({
        title: "Daily Limit Reached",
        description: "You've reached your daily limit of 5 prompts. Upgrade to Premium for unlimited access!",
        variant: "destructive",
      });
      return false;
    }
    
    // Increment count
    user.promptsUsedToday += 1;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    
    return true;
  }
};
