
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { useUser } from "@/context/UserContext";
import { Sparkles } from "lucide-react";

const Auth = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { user, login, signup, isLoading } = useUser();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/prompt-generator");
    }
  }, [user, navigate]);

  const handleSubmit = async (email: string, password: string) => {
    if (authMode === "login") {
      await login(email, password);
    } else {
      await signup(email, password);
    }
    navigate("/prompt-generator");
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full border border-gray-200 shadow-sm mb-4">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium">AI Prompt Generator</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">Welcome to AI Prompt Generator</h1>
        <p className="text-lg text-gray-600">
          {authMode === "login" 
            ? "Sign in to continue generating amazing prompts" 
            : "Create an account to start your prompt generation journey"}
        </p>
      </div>
      
      <AuthForm 
        mode={authMode} 
        onSubmit={handleSubmit} 
        onToggleMode={toggleAuthMode} 
      />
    </div>
  );
};

export default Auth;
