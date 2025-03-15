
import { authService } from "./authService";
import { toast } from "@/components/ui/use-toast";

export const subscriptionService = {
  subscribe: async (plan: "monthly" | "yearly"): Promise<boolean> => {
    // In a real app, this would process payment through Stripe or another payment processor
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Get current user
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error("User not found");
      }
      
      // Calculate subscription end date
      const now = new Date();
      const subscriptionEnd = new Date(now);
      
      if (plan === "monthly") {
        subscriptionEnd.setMonth(now.getMonth() + 1);
      } else {
        subscriptionEnd.setFullYear(now.getFullYear() + 1);
      }
      
      // Update user with premium status
      authService.updateUser({
        tier: "premium",
        subscriptionEnd,
      });
      
      toast({
        title: "Subscription Successful!",
        description: `You are now a Premium user${plan === "yearly" ? " for one year" : " for one month"}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  },
  
  // Check if user needs to renew subscription
  checkSubscription: (): boolean => {
    const user = authService.getCurrentUser();
    if (!user || user.tier !== "premium") return false;
    
    if (!user.subscriptionEnd) return false;
    
    const subscriptionEnd = new Date(user.subscriptionEnd);
    const now = new Date();
    
    // If subscription has expired, downgrade to free
    if (subscriptionEnd < now) {
      authService.updateUser({
        tier: "free",
        subscriptionEnd: null,
      });
      return false;
    }
    
    return true;
  }
};
