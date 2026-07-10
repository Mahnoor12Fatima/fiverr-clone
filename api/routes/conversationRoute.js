import express from "express"
import { loginUser,registerUser } from "../controllers/authController.js";
import { deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/jwt.js";
import { creatConversation, getConversations, getSingleConversation, updateConversation } from "../controllers/conversationController.js";

const conversationRouter=express.Router();
conversationRouter.get("/",verifyToken,getConversations);

conversationRouter.post("/",verifyToken,creatConversation);

conversationRouter.get("/single/:id",verifyToken,getSingleConversation);

conversationRouter.put("/:id",verifyToken,updateConversation);
export default conversationRouter;