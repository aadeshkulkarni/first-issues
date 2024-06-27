import mongoose from "mongoose";
import Feedback from "@/models/Feedback";

export const POST = async (req: Request) => {
  const { name, feedback } = await req.json();

  if (!feedback) {
    return new Response(JSON.stringify({ message: "Feedback is required" }), {
      status: 400,
    });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const newFeedback = new Feedback({ name, feedback });
    await newFeedback.save();

    return new Response(
      JSON.stringify({ message: "Feedback submitted successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
