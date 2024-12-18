import { createClient } from "redis";

const publisher = createClient();

export const connectPublisher = async () => {
  try {
    await publisher.connect();
    console.log("Redis Publisher connected.");
  } catch (error: any) {
    console.error("Redis Publisher Connection Error:", error.message);
  }
};

export const publishUserCreated = async (user: {
  name: string;
  email: string;
}) => {
  try {
    console.log("Publishing event: user:created");
    await publisher.publish("user:created", JSON.stringify(user));
  } catch (error: any) {
    console.error("Failed to publish event:", error.message);
  }
};
