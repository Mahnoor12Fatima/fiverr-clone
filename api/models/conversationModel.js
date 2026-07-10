import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
    readBySeller: { type: Boolean, required: true },
    readByBuyer: { type: Boolean, required: true },
    lastMessage: { type: String },
  },
  { timestamps: true }
);

export const ConversationModel =
  mongoose.models.ConversationModel ||
  mongoose.model("ConversationModel", conversationSchema);