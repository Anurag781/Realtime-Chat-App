import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 relative overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      {/* Main Layout */}
      <div className="h-[calc(100vh-5rem)] px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4">
        <div className="mx-auto h-full max-w-7xl">
          {/* Main Container */}
          <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-base-100/75 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
            {/* Top Border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            {/* Chat Layout */}
            <div className="flex h-full min-h-0">
              {/* Sidebar */}
              <div className="h-full shrink-0 border-r border-base-300/60 bg-base-100/40">
                <Sidebar />
              </div>

              {/* Chat Area */}
              <main className="flex-1 min-w-0 h-full bg-base-100/30 flex flex-col">
                {!selectedUser ? (
                  <NoChatSelected />
                ) : (
                  <ChatContainer />
                )}
              </main>
            </div>

            {/* Bottom Border */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;