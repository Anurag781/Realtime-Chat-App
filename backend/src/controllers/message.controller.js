import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSockets = getReceiverSocketId(receiverId);

    // receiver online
    if (receiverSockets && receiverSockets.length) {
      receiverSockets.forEach((socketId) => {
        io.to(socketId).emit("newMessage", newMessage);
      });

      newMessage.delivered = true;
      await newMessage.save();
    }

    // notify sender delivered
    const senderSockets = getReceiverSocketId(senderId);

    if (senderSockets && senderSockets.length) {
      senderSockets.forEach((socketId) => {
        io.to(socketId).emit("messageDelivered", {
          messageId: newMessage._id,
        });
      });
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markMessagesAsSeen = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    await Message.updateMany(
      {
        senderId: userToChatId,
        receiverId: myId,
        seen: false,
      },
      {
        seen: true,
        seenAt: new Date(),
      }
    );

    // notify original sender
    const senderSockets = getReceiverSocketId(userToChatId);

    if (senderSockets && senderSockets.length) {
      senderSockets.forEach((socketId) => {
        io.to(socketId).emit("messagesSeen", {
          userId: myId,
        });
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error marking seen:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};