import { ChatInterface } from "@/components/chat/chat-interface";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      <ChatInterface />
    </div>
  );
}
