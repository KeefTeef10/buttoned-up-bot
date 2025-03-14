
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { toast } from "@/components/ui/use-toast";

type Message = {
  content: string;
  isUser: boolean;
};

type ChatBotProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChatBot = ({ isOpen, onOpenChange }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I assist you today?", isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    setMessages((prev) => [...prev, { content: message, isUser: true }]);
    setIsLoading(true);

    try {
      // This is a placeholder for the actual API call to the LLM
      // In a real implementation, you would call your backend API
      // that interacts with the open-mistral-8x7b model
      const response = await mockLLMResponse(message);
      
      // Add AI response to chat
      setMessages((prev) => [...prev, { content: response, isUser: false }]);
    } catch (error) {
      console.error("Error getting response from AI:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to simulate AI response
  // Replace this with actual API call to your backend
  const mockLLMResponse = async (userMessage: string): Promise<string> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simple response logic - in reality, you would call your backend API
    // that interfaces with the open-mistral-8x7b model
    if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
      return "Hello there! How can I help you today?";
    } else if (userMessage.toLowerCase().includes("how are you")) {
      return "I'm just an AI assistant, but thanks for asking! How can I assist you?";
    } else if (userMessage.toLowerCase().includes("bye")) {
      return "Goodbye! Feel free to return if you have more questions.";
    } else {
      return "I'm a placeholder response. In a real implementation, I would be powered by the open-mistral-8x7b model. How else can I help you?";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[80vh] max-h-[600px] max-w-md flex-col p-0 sm:max-w-[425px] md:h-[500px]">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              AI Assistant
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.content}
              isUser={msg.isUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
