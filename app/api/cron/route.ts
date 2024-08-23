import { NextResponse } from "next/server";
import { readRepos } from "@/utils/helper";
import { fetchInfoFromGithub } from "@/scripts/populate";
import Project from "@/models/Project";
import mongoose from "mongoose";

export const GET = async (req: Request) => {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const repos = await readRepos();
    const fullRepoList = await fetchInfoFromGithub(repos);
    await mongoose.connect(process.env.MONGODB_URI!);
    if(fullRepoList.length > 0){
      await Project.deleteMany({});
      await Project.insertMany(fullRepoList);
      return NextResponse.json({ message: "Job ran successfully", Data: fullRepoList });
    }
    return NextResponse.json({ message: "Job failed ", error: "0 Repositories found" });
  } catch (error) {
    console.log("[CronError]: ", error);
    return NextResponse.json({ message: "Job failed ", error: error });
  }
};
