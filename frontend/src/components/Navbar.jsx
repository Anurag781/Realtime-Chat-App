import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className="
        fixed top-0 z-40 w-full
        border-b border-white/10
        bg-base-100/80 backdrop-blur-2xl
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      "
    >
      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>

      <div className="container mx-auto px-3 sm:px-4 h-16">
        <div className="flex items-center justify-between h-full gap-3">
          {/* Left Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group min-w-0"
          >
            <div className="size-10 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
              <MessageSquare className="size-5" />
            </div>

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold tracking-tight truncate">
                ChitChat
              </h1>

              <p className="hidden md:flex items-center gap-1 text-[11px] text-base-content/55">
                <Sparkles className="size-3 text-primary" />
                Premium Messaging
              </p>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Settings */}
            <Link
              to="/settings"
              state={{ from: location.pathname }}
              className={`
                h-10 px-3 rounded-xl border text-sm font-medium
                flex items-center gap-2 transition-all
                ${
                  isActive("/settings")
                    ? "bg-primary text-primary-content border-primary shadow-md"
                    : "bg-base-100 border-base-300 hover:bg-base-200"
                }
              `}
            >
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  state={{ from: location.pathname }}
                  className={`
                    h-10 px-3 rounded-xl border text-sm font-medium
                    flex items-center gap-2 transition-all
                    ${
                      isActive("/profile")
                        ? "bg-primary text-primary-content border-primary shadow-md"
                        : "bg-base-100 border-base-300 hover:bg-base-200"
                    }
                  `}
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="
                    h-10 px-3 rounded-xl border border-base-300
                    bg-base-100 hover:bg-red-500 hover:text-white
                    text-sm font-medium
                    flex items-center gap-2 transition-all
                  "
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;