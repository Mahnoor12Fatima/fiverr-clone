import { MessageModel } from "../models/messageModel.js";
import { ConversationModel } from "../models/conversationModel.js";

export const createMessage = async (req, res) => {
  const newMessage = new MessageModel({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const savedMessage = await newMessage.save();

    await ConversationModel.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      {
        new: true,
      }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.id,
    });

    res.status(200).send(messages);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};