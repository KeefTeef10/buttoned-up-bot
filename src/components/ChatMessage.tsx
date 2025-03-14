
import React from "react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

type ChatMessageProps = {
  message: string;
  isUser: boolean;
};

const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "mb-4 flex w-full max-w-[80%] rounded-lg p-4",
        isUser
          ? "ml-auto bg-primary text-primary-foreground"
          : "mr-auto bg-muted"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
          isUser ? "bg-primary-foreground" : "bg-primary"
        )}>
          {isUser ? (
            <User className={cn("h-4 w-4", isUser ? "text-primary" : "text-primary-foreground")} />
          ) : (
            <Bot className={cn("h-4 w-4", isUser ? "text-primary" : "text-primary-foreground")} />
          )}
        </div>
        <p className="whitespace-pre-wrap break-words">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
