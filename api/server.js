import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import gigRouter from "./routes/gigRoute.js";
import conversationRouter from "./routes/conversationRoute.js";
import orderRouter from "./routes/orderRoute.js";
import messageRouter from "./routes/messageRoute.js";
import authRouter from "./routes/authRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Fiverr Clone API is running");
});
// Middleware
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
// Routes
app.use("/auth",authRouter );
app.use("/users", userRouter);
app.use("/gigs", gigRouter);
app.use("/conversations", conversationRouter);
app.use("/orders", orderRouter);
app.use("/messages", messageRouter);
app.use("/reviews", reviewRouter);
// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

connectDB();
