import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { connectPublisher } from "./events/publisher";
import { connectSubscriber } from "./events/subscriber";
import cors from "cors";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "", {})
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB Connection Error:", err.message));

// Redis Connections
connectPublisher();
connectSubscriber();

// Routes
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
