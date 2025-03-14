
import React from "react";
import { cn } from "@/lib/utils";

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
      <p className="whitespace-pre-wrap break-words">{message}</p>
    </div>
  );
};

export default ChatMessage;
