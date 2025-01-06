"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@/db";
export default async function getAdminProblems(){
    const session = await getServerSession(authOptions)
    if (!session || ! session?.user?.Admin) {
        throw new Error("Unauthorized: Admin access required");
      }
    const Problems = await prisma.problem.findMany({
        select: {
            id: true,
            title: true,
            difficulty: true,
            platformName: true,
            link:true
          },
          take:3,
          orderBy: {
            updatedAt: "desc", // Order by most recently solved problems
          },
    })
    return Problems;

}