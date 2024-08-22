import mongoose from "mongoose";
import Feedback from "@/models/Feedback";

export const POST = async (req: Request) => {
  const { name, email, feedback } = await req.json();

  if (!feedback && !email) {
    return new Response(JSON.stringify({ message: "Feedback is required" }), {
      status: 400,
    });
  }

  try {
    // await mongoose.connect(process.env.MONGODB_URI!);

    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();

    return new Response(
      JSON.stringify({ message: "Feedback submitted successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
export const GET = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URI!);

    const feedbacks = await Feedback.find();

    return new Response(JSON.stringify(feedbacks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
