import express from "express"
import { loginUser,registerUser, } from "../controllers/authController.js";
import { deleteUser,getUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/jwt.js";


const userRouter=express.Router();

userRouter.delete("/:id",verifyToken,deleteUser);

userRouter.get("/:id",verifyToken,getUser);
userRouter.get("/public/:id", getUser);

export default userRouter;