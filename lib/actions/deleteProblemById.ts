"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@/db";

export default async function deleteProblemById(id: string) {
    const session = await getServerSession(authOptions);
    
    if (!session || !session?.user?.Admin) {
      console.error("Session or admin check failed:", session);
      throw new Error("Unauthorized: Admin access required");
    }
  
    if (!id || typeof id !== 'string') {
      console.error("Invalid problem ID:", id);
      throw new Error("Invalid problem ID");
    }
    
  
    try {
        await prisma.problem.delete({
        where: { id: id },
      });
      console.log('Problem deleted successfully:');
    } catch (error) {
      console.error("Error deleting problem:"+error);
      throw new Error("Error deleting problem, please try again later.");
    }
  }
  