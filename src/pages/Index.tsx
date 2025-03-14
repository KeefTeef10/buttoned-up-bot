
import React from "react";
import ChatBotWidget from "@/components/ChatBotWidget";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 mb-8">
          Click the chat button in the bottom right to start a conversation!
        </p>
        <p className="text-gray-500">
          Powered by the open-mistral-8x7b LLM
        </p>
      </div>
      
      <ChatBotWidget />
    </div>
  );
};

export default Index;
