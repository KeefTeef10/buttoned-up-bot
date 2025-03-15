
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserTier } from "@/types/user";
import { authService } from "@/services/authService";
import { subscriptionService } from "@/services/subscriptionService";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  subscribe: (plan: "monthly" | "yearly") => Promise<boolean>;
  checkPromptAvailability: () => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const initializeUser = () => {
      try {
        const currentUser = authService.getCurrentUser();
        
        // If premium user, check subscription status
        if (currentUser && currentUser.tier === "premium") {
          subscriptionService.checkSubscription();
          // Refresh user data after checking subscription
          setUser(authService.getCurrentUser());
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await authService.signup(email, password);
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser = authService.updateUser(userData);
    setUser(updatedUser);
  };

  const subscribe = async (plan: "monthly" | "yearly") => {
    const success = await subscriptionService.subscribe(plan);
    if (success) {
      // Refresh user data
      setUser(authService.getCurrentUser());
    }
    return success;
  };

  const checkPromptAvailability = () => {
    return authService.incrementPromptCount();
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    subscribe,
    checkPromptAvailability,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
