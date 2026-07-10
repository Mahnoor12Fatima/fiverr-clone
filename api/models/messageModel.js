import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel =
  mongoose.models.Message ||
  mongoose.model("Message", messageSchema);