
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PricingCard from "./PricingCard";

type SubscriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: "monthly" | "yearly") => Promise<void>;
  isLoading: boolean;
};

const SubscriptionModal = ({ isOpen, onClose, onSubscribe, isLoading }: SubscriptionModalProps) => {
  const handleSubscribe = async (plan: "monthly" | "yearly") => {
    await onSubscribe(plan);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upgrade to Premium</DialogTitle>
          <DialogDescription>
            Unlock unlimited prompts and advanced customization options
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="grid w-full grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full py-6 flex flex-col"
                onClick={() => handleSubscribe("monthly")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span className="text-lg font-bold">$5</span>
                    <span className="text-sm">Monthly</span>
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full py-6 flex flex-col border-primary"
                onClick={() => handleSubscribe("yearly")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span className="text-lg font-bold">$50</span>
                    <span className="text-sm">Yearly</span>
                    <span className="text-xs text-primary mt-1">Save $10</span>
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Cancel anytime. All payments are secure and encrypted.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
