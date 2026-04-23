import { Users, Wifi } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="
        h-full w-20 lg:w-80 shrink-0
        border-r border-base-300
        bg-base-100/80 backdrop-blur-xl
        flex flex-col transition-all duration-300
        shadow-xl overflow-hidden
      "
    >
      {/* Header */}
      <div className="border-b border-base-300 p-5 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg">
            <Users className="size-5" />
          </div>

          <div className="hidden lg:block">
            <div className="skeleton h-5 w-24 mb-2 rounded-full" />
            <div className="skeleton h-3 w-32 rounded-full opacity-70" />
          </div>
        </div>

        {/* Filter Placeholder */}
        <div className="hidden lg:flex items-center justify-between gap-3 rounded-2xl bg-base-200 px-4 py-3 border border-base-300">
          <div className="flex items-center gap-3">
            <div className="skeleton size-4 rounded-sm" />

            <div className="flex items-center gap-2">
              <Wifi className="size-4 text-primary/60" />
              <div className="skeleton h-4 w-20 rounded-full" />
            </div>
          </div>

          <div className="skeleton h-3 w-14 rounded-full" />
        </div>
      </div>

      {/* Contact Skeletons */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 custom-scrollbar">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full rounded-2xl p-3 flex items-center gap-3"
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0 shrink-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User Info */}
            <div className="hidden lg:block min-w-0 flex-1">
              <div
                className={`skeleton h-4 rounded-full mb-2 ${
                  idx % 3 === 0
                    ? "w-28"
                    : idx % 3 === 1
                    ? "w-36"
                    : "w-24"
                }`}
              />

              <div className="skeleton h-3 w-16 rounded-full opacity-70" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;