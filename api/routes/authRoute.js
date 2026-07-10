import express from "express"
import { loginUser,registerUser,logout } from "../controllers/authController.js";
import { deleteUser } from "../controllers/userController.js";

const authRouter=express.Router();

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
 authRouter.post("/logout",logout);
export default authRouter;