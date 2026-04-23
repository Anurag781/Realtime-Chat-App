import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Wifi, Sparkles } from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    unreadMessages,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 bg-base-100/80 backdrop-blur-xl flex flex-col transition-all duration-300 shadow-xl">
      {/* Header */}
      <div className="border-b border-base-300 p-5 space-y-4">
        {/* Top Title */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg">
            <Users className="size-5" />
          </div>

          <div className="hidden lg:block">
            <h2 className="font-semibold text-lg tracking-tight">
              Contacts
            </h2>
            <p className="text-xs text-base-content/60">
              Connect with your chats
            </p>
          </div>
        </div>

        {/* Online Filter */}
        <div className="hidden lg:flex items-center justify-between gap-3 rounded-2xl bg-base-200 px-4 py-3 border border-base-300">
          <label className="cursor-pointer flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />

            <div className="flex items-center gap-2">
              <Wifi className="size-4 text-primary" />
              <span className="text-sm font-medium">
                Online Only
              </span>
            </div>
          </label>

          <div className="text-xs text-base-content/60 whitespace-nowrap">
            {onlineUsers.length - 1} online
          </div>
        </div>
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto flex-1 px-2 py-3 space-y-1 custom-scrollbar">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full rounded-2xl p-3 flex items-center gap-3 text-left
                transition-all duration-200 group
                ${isSelected
                  ? "bg-primary/10 border border-primary/20 shadow-md"
                  : "hover:bg-base-200 border border-transparent"
                }
              `}
            >
              {/* Avatar */}
              <div className="relative mx-auto lg:mx-0 shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 rounded-full object-cover ring-2 ring-base-300"
                />

                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                )}

                {unreadMessages[user._id] > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-primary text-primary-content text-[10px] font-bold flex items-center justify-center ring-2 ring-base-100">
                    {unreadMessages[user._id]}
                  </span>
                )}
              </div>

              {/* User Info */}
              <div className="hidden lg:block min-w-0 flex-1">
                <div className="font-medium truncate flex items-center gap-2">
                  <span className="truncate">{user.fullName}</span>

                  {unreadMessages[user._id] > 0 && (
                    <span className="badge badge-primary badge-sm shrink-0">
                      {unreadMessages[user._id]}
                    </span>
                  )}
                </div>

                <div className="text-sm text-base-content/60 flex items-center gap-1 mt-0.5">
                  {isOnline ? (
                    <>
                      <Sparkles className="size-3 text-green-500" />
                      Online
                    </>
                  ) : (
                    "Offline"
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-10 px-4">
            <div className="mx-auto size-14 rounded-2xl bg-base-200 flex items-center justify-center mb-3">
              <Users className="size-6 text-base-content/40" />
            </div>

            <p className="text-sm font-medium">
              No online users
            </p>

            <p className="text-xs text-base-content/50 mt-1">
              Try disabling the online filter
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;