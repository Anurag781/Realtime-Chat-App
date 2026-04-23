import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-16 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-10 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette className="size-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Personalization
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Theme Settings
            </h1>

            <p className="text-base-content/65 mt-2">
              Customize your chat experience with premium themes and live preview.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-base-100 border border-base-300 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>

            <span className="text-sm font-medium">
              Go Back
            </span>
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
          {/* Theme Card */}
          <div className="rounded-3xl border border-white/10 bg-base-100/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.12)] p-6 sm:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-4 text-primary" />
                <h2 className="text-xl font-semibold">Choose Theme</h2>
              </div>

              <p className="text-sm text-base-content/70">
                Hover and scroll to explore all available themes.
              </p>
            </div>

            {/* Scrollable Theme Area */}
            <div className="max-h-[520px] overflow-y-auto pr-2 custom-scrollbar hover:scroll-smooth">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`
                      group rounded-2xl p-3 border transition-all duration-300
                      ${theme === t
                        ? "border-primary bg-primary/10 shadow-lg scale-[1.03]"
                        : "border-base-300 hover:border-primary/40 hover:bg-base-200/60"
                      }
                    `}
                  >
                    <div
                      className="relative h-10 w-full rounded-xl overflow-hidden mb-2"
                      data-theme={t}
                    >
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                        <div className="rounded bg-primary"></div>
                        <div className="rounded bg-secondary"></div>
                        <div className="rounded bg-accent"></div>
                        <div className="rounded bg-neutral"></div>
                      </div>
                    </div>

                    <span className="text-xs font-medium block truncate">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-base-100/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="px-6 py-5 border-b border-base-300 bg-base-100/70">
              <h3 className="text-xl font-semibold">Live Preview</h3>
              <p className="text-sm text-base-content/65 mt-1">
                See how your chat interface will look.
              </p>
            </div>

            <div className="p-5">
              <div className="bg-base-100 rounded-2xl shadow-md overflow-hidden border border-base-300">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold">
                      J
                    </div>

                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4 min-h-[320px] max-h-[320px] overflow-y-auto">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${message.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200"
                          }`}
                      >
                        <p className="text-sm">{message.content}</p>

                        <p
                          className={`text-[10px] mt-1.5 ${message.isSent
                              ? "text-primary-content/70"
                              : "text-base-content/70"
                            }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value="This is a preview"
                      className="input input-bordered flex-1 text-sm h-11 rounded-xl"
                    />

                    <button className="btn btn-primary h-11 min-h-0 rounded-xl px-5">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Preview */}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;