
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/context/UserContext";
import { Sparkles, User, LogOut } from "lucide-react";
import PricingCard from "@/components/subscription/PricingCard";
import SubscriptionModal from "@/components/subscription/SubscriptionModal";
import { toast } from "@/components/ui/use-toast";

const UserSettings = () => {
  const { user, logout, subscribe } = useUser();
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
    return null;
  }

  const promptsPercentage = (user.promptsUsedToday / user.promptsLimit) * 100;
  const formattedDate = user.subscriptionEnd 
    ? new Date(user.subscriptionEnd).toLocaleDateString() 
    : null;

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const handleUpgradeClick = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleSubscribe = async (plan: "monthly" | "yearly") => {
    setIsSubscribing(true);
    try {
      const success = await subscribe(plan);
      if (success) {
        setIsSubscriptionModalOpen(false);
        toast({
          title: "Subscription Successful",
          description: "You now have access to all premium features!",
        });
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          Account Settings <Sparkles className="h-5 w-5 text-amber-400" />
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account and subscription</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  {user.tier === "premium" ? "Premium User" : "Free User"}
                </p>
              </div>
            </div>
            
            {user.tier === "premium" && formattedDate && (
              <div className="text-sm">
                <p className="text-muted-foreground">
                  Subscription ends: <span className="font-medium">{formattedDate}</span>
                </p>
              </div>
            )}
            
            {user.tier === "free" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Prompts</span>
                  <span>{user.promptsUsedToday} / {user.promptsLimit}</span>
                </div>
                <Progress value={promptsPercentage} className="h-2" />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>

        {/* Subscription Cards */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <PricingCard 
            tier="free" 
            isCurrentTier={user.tier === "free"} 
            onUpgrade={handleUpgradeClick} 
          />
          <PricingCard 
            tier="premium" 
            isCurrentTier={user.tier === "premium"} 
            onUpgrade={handleUpgradeClick} 
          />
        </div>
      </div>

      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSubscribe={handleSubscribe}
        isLoading={isSubscribing}
      />
    </div>
  );
};

export default UserSettings;
