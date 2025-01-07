"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@/db";
import { z } from "zod";

export default async function markProblemSolved(userId: string, problemId: string,score:number) {
  // Get the session
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not Authenticated: Please Login");
  }

  // Validate inputs using zod
  const res1 = z.string().safeParse(userId);
  const res2 = z.string().safeParse(problemId);

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
  const res3=z.number().safeParse(score);
  if (!res3.success) {
    const errors = res3.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new Error(`Invalid input: ${errors.join(", ")}`);
  }

  // Perform upsert to insert or update the solved history
  try {
    // Start a transaction
    const transaction = await prisma.$transaction(async (tx:any) => {
      // Get the user's last solved date and current streak
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { lastCompletedDate: true, streak: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Determine if the solve is on consecutive days
      const today = new Date();
      const lastSolvedDate = user.lastCompletedDate ? new Date(user.lastCompletedDate) : null;
      let newStreak = 1;

      if (lastSolvedDate) {
        const timeDiff = today.getTime() - lastSolvedDate.getTime();
        const dayDifference = timeDiff / (1000 * 3600 * 24); // Difference in days

        if (dayDifference === 1) {
          newStreak = user.streak + 1; // Increment streak if consecutive day
        } else if (dayDifference > 1) {
          newStreak = 1; // Reset streak if more than 1 day gap
        }
      }

      // Mark the problem as solved in the solvedHistory table
     // Check if the record already exists
      const existingEntry = await tx.solvedHistory.findUnique({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
      });

      if (existingEntry) {
        throw new Error("Problem is already marked as solved.");
      }

      // Create a new entry if no duplicate exists
      await tx.solvedHistory.create({
        data: {
          userId,
          problemId,
          solvedAt: today,
        },
      });


      // Increase the solvedProblems count and update streak
      await tx.user.update({
        where: { id: userId },
        data: {
          problemsSolved: {
            increment: 1, // Increment the solvedProblems count by 1
          },
          streak: newStreak, // Update streak
          lastCompletedDate: today, // Update lastSolved
          score:{
            increment:score
          }
        },
      });

      return { message: "Problem marked as solved, streak updated, and solvedProblems count updated." };
    });

    return transaction;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error getting the problem history: ${error.message}`);
    } else {
      throw new Error("Error getting the problem history: Unknown error occurred");
    }
  }
}
