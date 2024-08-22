import { connectDb } from '@/config/db';
import Project from '@/models/Project';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url || "");
    const lang = url.searchParams.get("lang")?.toLowerCase() || "";
    const sortBy = url.searchParams.get("sort_by")?.toLowerCase() || "";
    const order = url.searchParams.get("order")?.toLowerCase() === "desc" ? -1 : 1;
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "100");

    const query: any = {};
    if (lang) {
      query.language = { $regex: new RegExp(lang, "i") }; 
    }

    const sort: any = {};
    if (sortBy) {
      if (sortBy === "stars") {
        sort.stars = order;
      } else if (sortBy === "last_active") {
        sort.last_modified = order;
      } else if (sortBy === "num_of_issues") {
        sort.issues = order;
      }
    }
    
    await connectDb();

    const totalRecords = await Project.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limit);

    const paginatedData = await Project.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const response = {
      total: totalRecords,
      pages: totalPages,
      current: page,
      recordsPerPage: limit,
      data: paginatedData,
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse(`Failed to fetch projects - ${error}`, { status: 500 });
  }
};