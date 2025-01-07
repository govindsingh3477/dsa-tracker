"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@/db";
import {z} from "zod"

interface Problem {
    id: string;
    title: string;
    description?: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    link: string;
    platformName: string;
  }
  const problemSchema = z.object({
    id: z.string().min(1, "ID cannot be empty"), // Ensure non-empty string
    title: z.string().min(1, "Title cannot be empty"), // Ensure non-empty string
    description: z.string().optional(), // Optional but must be non-empty if provided
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    link: z.string().url("Invalid URL format"), // Ensure valid URL format
    platformName: z.string().min(1, "Platform name cannot be empty"), // Ensure non-empty string
  });

export default async function addProblem(problemData: Problem){
    const session = await getServerSession(authOptions)
    if (!session || ! session?.user?.Admin) {
        throw new Error("Unauthorized: Admin access required");
      }
      const parsedResult = problemSchema.safeParse(problemData);
      if (!parsedResult.success) {
        const errors = parsedResult.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`
        );
        throw new Error(`Invalid input: ${errors.join(", ")}`);
      }
      
    const newProblem = await prisma.problem.create({
        data:{
            ...problemData,
            creatorId:session.user.id
        },
        select: {
            id: true,
            title: true,
            difficulty: true,
            platformName: true,
            link:true
          },
    })
    return newProblem;

}