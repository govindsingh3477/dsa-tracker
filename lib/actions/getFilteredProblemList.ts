"use server";

import prisma from "@/db";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth";

export default async function getFilteredProblemList({
  page = 1,
  difficulty,
  status,
}: {
  page?: number;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  status?: "Pending" | "Completed";
}) {
  // Authenticate the user
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Not authenticated");
  }
  const userId = session.user.id;

  // Validate inputs using Zod
  const pageSchema = z.number().int().positive().optional();
  const difficultySchema = z.enum(["EASY", "MEDIUM", "HARD"]).optional();
  const statusSchema = z.enum(["Completed", "Pending"]).optional();

  const pageValidation = pageSchema.safeParse(page);
  const difficultyValidation = difficultySchema.safeParse(difficulty);
  const statusValidation = statusSchema.safeParse(status);

  if (!pageValidation.success) {
    throw new Error(`Invalid page: ${pageValidation.error.message}`);
  }
  if (difficulty && !difficultyValidation.success) {
    throw new Error(`Invalid difficulty: ${difficultyValidation.error.message}`);
  }
  if (status && !statusValidation.success) {
    throw new Error(`Invalid status: ${statusValidation.error.message}`);
  }

  const ITEMS_PER_PAGE = 50; // Pagination limit
  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Build the `where` clause
  const whereClause: any = {};

  if (difficulty) {
    whereClause.difficulty = difficultyValidation.data;
  }

  if (status) {
    if (status === "Pending") {
      whereClause.solvedBy = {
        none: {
          userId: userId, // Exclude problems solved by the user
        },
      };
    } else if (status === "Completed") {
      whereClause.solvedBy = {
        some: {
          userId: userId, // Include problems solved by the user
        },
      };
    }
    
  }

  try {
    // Fetch problems based on the filters
    const problemList = await prisma.problem.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: whereClause,
      select: {
        id: true,
        title: true,
        difficulty: true,
        link: true,
        platformName: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc", // Order by most recent
      },
    });
    // console.log(problemList);
    
    return problemList;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Error fetching problems: ${error.message}`
        : "Unknown error occurred while fetching problems."
    );
  }
}
