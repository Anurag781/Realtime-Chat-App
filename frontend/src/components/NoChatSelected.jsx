import { MessageSquare, Sparkles, ShieldCheck } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center bg-base-200 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-16 right-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="max-w-2xl px-6 sm:px-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="size-24 rounded-3xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-2xl animate-bounce">
              <MessageSquare className="size-12" />
            </div>

            <div className="absolute -top-2 -right-2 size-8 rounded-full bg-base-100 shadow-md flex items-center justify-center">
              <Sparkles className="size-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Welcome to ChitChat
        </h1>

        <p className="text-base-content/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Select a conversation from the sidebar to start chatting,
          connect instantly, and continue your conversations smoothly.
        </p>

        {/* Feature Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <div className="badge badge-outline gap-2 px-4 py-4 text-sm">
            <ShieldCheck className="size-4" />
            Secure Chats
          </div>

          <div className="badge badge-outline gap-2 px-4 py-4 text-sm">
            <Sparkles className="size-4" />
            Real-time Messaging
          </div>
        </div>

        {/* Bottom Hint */}
        <p className="mt-10 text-sm text-base-content/50">
          Choose a contact to begin messaging
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;