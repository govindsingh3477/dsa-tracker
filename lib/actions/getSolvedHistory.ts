"use server";

import prisma from "@/db";
import { z } from "zod";

export default async function getUserProblemHistory(userId: string, page: number=1) {
  // Validate inputs using Zod
  const res1 = z.string().safeParse(userId);
  const res2 = z.number().int().positive().safeParse(page);

  if (!res1.success) {
    const errors = res1.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new Error(`Invalid input: ${errors.join(", ")}`);
  }

  if (!res2.success) {
    const errors = res2.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new Error(`Invalid input: ${errors.join(", ")}`);
  }

  const ITEMS_PER_PAGE = 10; // Number of records per page for pagination
  const offset = (page - 1) * ITEMS_PER_PAGE; // Calculate the offset

  try {
    // Fetch the paginated problem history for the user
    const problemHistory = await prisma.solvedHistory.findMany({
      where: {
        userId: userId,
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        // Include related Problem fields
        problem: {
          select: {
            title: true,
            difficulty: true,
            platformName: true,
            link: true,
          },
        },
      },
      orderBy: {
        solvedAt: "desc", // Order by most recently solved problems
      },
    });

    // Fetch the total count of solved problems for pagination meta
    const totalSolvedCount = await prisma.solvedHistory.count({
      where: {
        userId: userId,
      },
    });

    // Map problem history to include related problem fields and solvedAt date
    const formattedProblemHistory = problemHistory.map((entry) => ({
      problemId: entry.problemId,
      title: entry.problem?.title || "Unknown",
      difficulty: entry.problem?.difficulty || "Unknown",
      platform: entry.problem?.platformName || "Unknown",
      link: entry.problem?.link || "#",
      solvedAt: entry.solvedAt, // Include the solved date
    }));

    // Return problem history with pagination meta
    return {
      problemHistory: formattedProblemHistory,
      pagination: {
        currentPage: page,
        totalItems: totalSolvedCount,
        totalPages: Math.ceil(totalSolvedCount / ITEMS_PER_PAGE),
      },
    };
  } catch (error: any) {
    throw new Error(`Error getting the problem history: ${error.message}`);
  }
}
