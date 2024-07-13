import Project from "@/models/Project";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const aggregationPipeline = [
      {
        $group: {
          _id: "$language",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          language: "$_id",
          count: 1,
        },
      },
    ];
    await mongoose.connect(process.env.MONGODB_URI!);
    const result = await Project.aggregate(aggregationPipeline).exec();
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to fetch project language filters - ${error}`,
      status: 500,
    });
  }
};
