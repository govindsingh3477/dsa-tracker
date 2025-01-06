"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@/db";

export default async function getTodaysProblems() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Not Authenticated: Please Login");
  }

  // Get the start and end of today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); // Start of the day

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999); // End of the day

  // Fetch problems created today
  const problems = await prisma.problem.findMany({
    where: {
      createdAt: {
        gte: startOfToday, // Greater than or equal to start of today
        lte: endOfToday,   // Less than or equal to end of today
      },
    },
    select: {
      id: true,
      title: true,
      difficulty: true,
      platformName: true,
      link: true,
    },
  });

  return problems;
}
