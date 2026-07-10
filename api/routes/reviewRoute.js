import express from "express"
import { loginUser,registerUser } from "../controllers/authController.js";
import { deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/jwt.js";
import { createReview, deleteReview, getReviews } from "../controllers/reviewController.js";
const reviewRouter=express.Router();
reviewRouter.post("/",verifyToken,createReview);
reviewRouter.get("/:gigId",getReviews);
reviewRouter.delete("/:id",deleteReview);
export default reviewRouter;