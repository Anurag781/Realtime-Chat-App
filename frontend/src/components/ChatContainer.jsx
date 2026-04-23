import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    // mark received messages as seen
    axiosInstance.put(`/messages/seen/${selectedUser._id}`);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 h-full min-h-0 flex flex-col overflow-hidden bg-base-100/30">
        <ChatHeader />

        <div className="flex-1 min-h-0 overflow-y-auto">
          <MessageSkeleton />
        </div>

        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 h-full min-h-0 flex flex-col overflow-hidden bg-base-100/30">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-4 space-y-4 custom-scrollbar">
        {messages.map((message) => {
          const isSender =
            message.senderId.toString() === authUser._id.toString();

          return (
            <div
              key={message._id}
              className={`chat ${
                isSender ? "chat-end" : "chat-start"
              }`}
            >
              {/* Avatar */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border border-base-300 shadow-sm">
                  <img
                    src={
                      isSender
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="chat-header mb-1">
                <time className="text-[11px] opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Bubble */}
              <div
                className={`
                  chat-bubble flex flex-col shadow-sm
                  ${
                    isSender
                      ? "bg-primary text-primary-content"
                      : "bg-base-200 text-base-content"
                  }
                `}
              >
                {/* Image */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[220px] sm:max-w-[260px] rounded-xl mb-2"
                  />
                )}

                {/* Text */}
                {message.text && (
                  <p className="break-words whitespace-pre-wrap">
                    {message.text}
                  </p>
                )}

                {/* Seen / Delivered Status */}
                {isSender && (
                  <span className="text-[10px] mt-1 opacity-70 self-end">
                    {message.seen
                      ? "✓✓ Seen"
                      : message.delivered
                      ? "✓✓"
                      : "✓"}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Scroll Target */}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;