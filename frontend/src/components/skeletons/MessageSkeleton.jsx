const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-4 space-y-5 custom-scrollbar bg-base-100/20">
      {skeletonMessages.map((_, idx) => {
        const isStart = idx % 2 === 0;

        return (
          <div
            key={idx}
            className={`chat ${isStart ? "chat-start" : "chat-end"}`}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full ring-2 ring-base-300/60">
                <div className="skeleton w-full h-full rounded-full" />
              </div>
            </div>

            {/* Time */}
            <div className="chat-header mb-1">
              <div className="skeleton h-3 w-14 rounded-full opacity-70" />
            </div>

            {/* Bubble */}
            <div className="chat-bubble bg-transparent p-0 shadow-none">
              <div
                className={`
                  skeleton rounded-2xl
                  ${isStart ? "w-[180px] sm:w-[220px]" : "w-[160px] sm:w-[210px]"}
                  ${idx === 1 || idx === 4 ? "h-20" : "h-16"}
                `}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;