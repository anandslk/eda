import { createClient } from "redis";
import mongoose from "mongoose";
import User from "../models/user";

const subscriber = createClient();

export const connectSubscriber = async () => {
  try {
    await subscriber.connect();
    console.log("Redis Subscriber connected.");

    // Subscribe to the 'user:created' event
    subscriber.subscribe("user:created", async (message: string) => {
      try {
        const userData = JSON.parse(message);
        console.log("Event Received:", userData);

        // Save user data to MongoDB
        const newUser = new User(userData);
        await newUser.save();
        console.log("User saved to MongoDB:", newUser);
      } catch (error: any) {
        console.error("Error handling event:", error.message);
      }
    });
  } catch (error: any) {
    console.error("Redis Subscriber Connection Error:", error.message);
  }
};
