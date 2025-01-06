"use server";

import prisma from "@/db";
import { z } from "zod";

export default async function getProblemList(page: number=1) {
  // Validate inputs using Zod
  const res2 = z.number().int().positive().safeParse(page);

  if (!res2.success) {
    const errors = res2.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new Error(`Invalid input: ${errors.join(", ")}`);
  }

  const ITEMS_PER_PAGE = 50; // Number of records per page for pagination
  const offset = (page - 1) * ITEMS_PER_PAGE; // Calculate the offset

  try {
    // Fetch the paginated problem history for the user
    const problemList = await prisma.problem.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      select:{
        title:true,
        platformName:true,
        difficulty:true,
        link:true,
        id:true,
        createdAt:true
      },
      orderBy: {
        createdAt: "desc", // Order by most recently solved problems
      },
    });


    return problemList;
  } catch (error: any) {
    throw new Error(`Error getting the problem history: ${error.message}`);
  }
}
