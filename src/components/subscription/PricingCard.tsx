
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type PricingTier = "free" | "premium";

type PricingCardProps = {
  tier: PricingTier;
  isCurrentTier: boolean;
  onUpgrade: () => void;
};

const PricingCard = ({ tier, isCurrentTier, onUpgrade }: PricingCardProps) => {
  const tierInfo = {
    free: {
      name: "Free Tier",
      price: "$0",
      description: "Basic access for occasional users",
      features: [
        "5 prompts per day",
        "Basic customization options",
        "Genre and tone options",
        "Standard processing time"
      ]
    },
    premium: {
      name: "Premium Tier",
      price: "$5",
      description: "Unlimited access with advanced features",
      features: [
        "Unlimited prompts",
        "Advanced customization options",
        "Word count and complexity control",
        "Specific themes and characters",
        "Priority processing"
      ]
    }
  };

  const info = tierInfo[tier];

  return (
    <Card className={`w-full ${tier === "premium" ? "border-primary shadow-md" : ""}`}>
      <CardHeader>
        <CardTitle>{info.name}</CardTitle>
        <CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">{info.price}</span>
            {tier === "premium" && <span className="text-sm ml-1">/month</span>}
          </div>
          <p className="mt-2">{info.description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {info.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {tier === "free" ? (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onUpgrade}
          >
            Upgrade to Premium
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={onUpgrade}
            disabled={isCurrentTier}
          >
            {isCurrentTier ? "Current Plan" : "Subscribe Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
