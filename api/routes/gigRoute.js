import express from "express";
import { createGig,deleteGig,getGig,getGigs } from "../controllers/gigController.js";
import { verifyToken } from "../middleware/jwt.js";


const gigRouter = express.Router();

//gigRouter.get("/test", deleteUser);
gigRouter.post("/", verifyToken,createGig);
gigRouter.delete("/:id", verifyToken,deleteGig);
gigRouter.get("/single/:id",getGig);
gigRouter.get("/", getGigs);

export default gigRouter;