import { env } from "@/env";
import mongoose from "mongoose";

const MONGODB_URI = env.MONGO_URI;

if (!MONGODB_URI) throw new Error("Mongo URI is required");

let cached = (global as any).mongoose;

if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.info("You successfully Connected");

      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  console.info("connected to Mongoose");
  return cached.conn;
}
