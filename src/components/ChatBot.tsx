
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle, X, Sparkles } from "lucide-react";
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    setMessages((prev) => [...prev, { content: message, isUser: true }]);
    setIsLoading(true);
    setIsTyping(true);

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
      setIsTyping(false);
    }
  };

  // Mock function to simulate AI response
  // Replace this with actual API call to your backend
  const mockLLMResponse = async (userMessage: string): Promise<string> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // More detailed responses
    if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
      return "Hello there! I'm your AI assistant powered by the open-mistral-8x7b model. How can I help you today?";
    } else if (userMessage.toLowerCase().includes("how are you")) {
      return "I'm just an AI assistant, but thanks for asking! I'm here and ready to assist you with any questions or tasks you might have.";
    } else if (userMessage.toLowerCase().includes("bye")) {
      return "Goodbye! Feel free to return if you have more questions. I'll be here to assist you.";
    } else if (userMessage.toLowerCase().includes("help")) {
      return "I can help you with information, answering questions, brainstorming ideas, or solving problems. Just let me know what you'd like assistance with!";
    } else if (userMessage.toLowerCase().includes("mistral") || userMessage.toLowerCase().includes("llm")) {
      return "I'm powered by the open-mistral-8x7b large language model, which is designed to provide helpful, accurate, and safe responses to a wide variety of questions and tasks.";
    } else {
      return "I'm analyzing your message using the open-mistral-8x7b model. In a full implementation, I would provide a detailed response based on that powerful language model. How else can I assist you today?";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[80vh] max-h-[600px] max-w-md flex-col p-0 sm:max-w-[425px] md:h-[500px]">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span>AI Assistant</span>
              <Sparkles className="h-4 w-4 text-amber-400" />
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
          
          {isTyping && (
            <div className="flex items-center gap-2 mr-auto mb-4 bg-muted rounded-lg p-4 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
