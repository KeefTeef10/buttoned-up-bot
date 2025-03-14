
import React from "react";
import ChatBotWidget from "@/components/ChatBotWidget";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center max-w-2xl px-4">
        <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full border border-gray-200 shadow-sm mb-6">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium">Powered by AI</span>
        </div>
        
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Welcome to Your AI Assistant
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Experience the power of conversational AI right at your fingertips. Click the chat button in the bottom right to start a conversation!
        </p>
        
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <span>Powered by the</span>
            <span className="font-semibold">open-mistral-8x7b LLM</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </p>
        </div>
      </div>
      
      <ChatBotWidget />
    </div>
  );
};

export default Index;
