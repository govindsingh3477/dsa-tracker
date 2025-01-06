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
    const transaction = await prisma.$transaction(async (tx) => {
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
      await tx.solvedHistory.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        create: {
          userId,
          problemId,
          solvedAt: today,
        },
        update: {},
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
  } catch (error: any) {
    throw new Error(`Error marking problem as solved: ${error.message}`);
  }
}
