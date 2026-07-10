import { ConversationModel } from "../models/conversationModel.js";

export const creatConversation = async (req, res) => {
  const conversationId = req.isSeller
    ? req.userId + req.body.to
    : req.body.to + req.userId;

  try {
    const existingConversation =
      await ConversationModel.findOne({
        id: conversationId,
      });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const newConversation = new ConversationModel({
      id: conversationId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });

    const savedConversation =
      await newConversation.save();

    res.status(201).json(savedConversation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const updatedConversation =
      await ConversationModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.isSeller
            ? { readBySeller: true }
            : { readByBuyer: true },
        },
        { new: true }
      );

    res.status(200).json(updatedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleConversation = async (req, res) => {
  try {
    const conversation =
      await ConversationModel.findOne({
        id: req.params.id,
      });
      if(!conversation){
        return 
    res.status(404).json("not found");
      }

    res.status(200).send(conversation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await ConversationModel.find(
      req.isSeller
        ? { sellerId: req.userId }
        : { buyerId: req.userId }
    ).sort({updatedAt:-1});

    res.status(200).json(conversations);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};