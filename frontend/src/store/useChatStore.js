import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadMessages: {},
  isTyping: false,
  typingUserId: null,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({
        messages: [...messages, res.data],
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();

    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;

    socket.off("newMessage");
    socket.off("messageDelivered");
    socket.off("messagesSeen");
    socket.off("userTyping");
    socket.off("userStopTyping");

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, unreadMessages } = get();

      if (newMessage.senderId.toString() === authUser._id.toString()) return;

      const isCurrentChat =
        selectedUser &&
        newMessage.senderId.toString() === selectedUser._id.toString();

      if (isCurrentChat) {
        set({
          messages: [...get().messages, newMessage],
        });
      } else {
        const senderId = newMessage.senderId.toString();

        set({
          unreadMessages: {
            ...unreadMessages,
            [senderId]: (unreadMessages[senderId] || 0) + 1,
          },
        });
      }
    });

    socket.on("messageDelivered", ({ messageId }) => {
      set({
        messages: get().messages.map((msg) =>
          msg._id === messageId ? { ...msg, delivered: true } : msg
        ),
      });
    });

    socket.on("messagesSeen", () => {
      set({
        messages: get().messages.map((msg) =>
          msg.senderId.toString() === authUser._id.toString()
            ? { ...msg, seen: true }
            : msg
        ),
      });
    });

    socket.on("userTyping", ({ from }) => {
      if (from !== selectedUser?._id) return;

      set({
        isTyping: true,
        typingUserId: from,
      });
    });

    socket.on("userStopTyping", ({ from }) => {
      if (from !== selectedUser._id) return;

      set({
        isTyping: false,
        typingUserId: null,
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
    socket.off("messageDelivered");
    socket.off("messagesSeen");
    socket.off("userTyping");
    socket.off("userStopTyping");
  },

  setSelectedUser: (selectedUser) =>
    set((state) => {
      const updatedUnread = { ...state.unreadMessages };

      if (selectedUser?._id) {
        delete updatedUnread[selectedUser._id];
      }

      return {
        selectedUser,
        unreadMessages: updatedUnread,
      };
    }),
}));
