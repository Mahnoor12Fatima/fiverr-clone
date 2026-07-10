import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { createMessage, getMessages } from "../controllers/messageController.js";
const messageRouter=express.Router();
messageRouter.post("/",verifyToken,createMessage);

messageRouter.get("/:id",verifyToken,getMessages);
export default messageRouter;