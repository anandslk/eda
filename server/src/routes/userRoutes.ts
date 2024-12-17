import { Router, Request, Response } from "express";
import { publishUserCreated } from "../events/publisher";

const router = Router();

router.post("/create", async (req: any, res: any) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required." });
  }

  try {
    const user = { name, email };
    await publishUserCreated(user);
    res
      .status(200)
      .json({ message: "User creation event published successfully.", user });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to publish event." });
  }
});

export default router;
