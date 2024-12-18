import { NextRequest, NextResponse } from "next/server";
import { publishUserCreated } from "@/events/publisher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required." },
        { status: 400 },
      );
    }

    const user = { name, email };
    await publishUserCreated(user);

    return NextResponse.json(
      {
        message: "User creation event published successfully.",
        user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to publish event." },
      { status: 500 },
    );
  }
}
