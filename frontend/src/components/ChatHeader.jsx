import { X, ShieldCheck, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const {
    selectedUser,
    setSelectedUser,
    isTyping,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="shrink-0 border-b border-base-300 bg-base-100/85 backdrop-blur-xl px-4 sm:px-5 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-11 sm:size-12 rounded-full object-cover ring-2 ring-base-300 shadow-sm"
            />

            <span
              className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-base-100 ${
                isOnline ? "bg-green-500" : "bg-zinc-400"
              }`}
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold truncate text-sm sm:text-base">
              {selectedUser.fullName}
            </h3>

            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs sm:text-sm text-base-content/60">
                {isTyping
                  ? "Typing..."
                  : isOnline
                  ? "Online"
                  : "Offline"}
              </p>

              {(isOnline || isTyping) && (
                <Sparkles className="size-3 text-green-500" />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1 text-xs px-3 h-9 rounded-xl bg-base-200 border border-base-300">
            <ShieldCheck className="size-3.5 text-primary" />
            Secure Chat
          </div>

          <button
            onClick={() => setSelectedUser(null)}
            className="size-10 rounded-xl border border-base-300 bg-base-100 flex items-center justify-center hover:bg-base-200 hover:scale-105 transition-all"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;