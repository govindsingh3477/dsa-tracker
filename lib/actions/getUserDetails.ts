"use server";

import prisma from "@/db";
import { z } from "zod";
export default async function getUserDetails(userId: string) {
    // Get the session
   
    // Validate inputs using zod
    const res1 = z.string().safeParse(userId);
    // const res2 = z.string().safeParse(problemId);
  
    if (!res1.success) {
      const errors = res1.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      throw new Error(`Invalid input: ${errors.join(", ")}`);
    }
    
  
    // Perform upsert to insert or update the solved history
    try {
      const userDetails = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            id: true,
            name: true,
            email: true,
            role: true,
            streak: true,
            problemsSolved: true,
            _count: {
                select: { solvedHistory: true }, // Get the count of solvedHistory directly
             },
            image:true,
            score:true
        },
        
      });
      if (!userDetails) {
        throw new Error("User not found");
      }
    
      const totalCount = userDetails._count.solvedHistory;
      return {
        totalCount,
        userDetails
      }

    } catch (error:any) {
      throw new Error(`Error getting the information  ${error.message}`);
    }
  }
  