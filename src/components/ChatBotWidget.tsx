
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import ChatBot from "./ChatBot";

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Button
        className={`fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isHovered ? "bg-primary/90 scale-110" : ""
        }`}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        {isHovered && !isOpen && (
          <span className="absolute right-16 whitespace-nowrap rounded bg-background px-2 py-1 text-sm shadow-md">
            Chat with AI
          </span>
        )}
      </Button>
      
      <ChatBot isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default ChatBotWidget;
