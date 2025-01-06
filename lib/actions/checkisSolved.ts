"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@/db";
import {z} from "zod"


export default async function checkisSolved(userId:string,problemId:string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not Authenticated: Please Login");
  }
  const res1=z.string().safeParse(userId)
  const res2=z.string().safeParse(problemId)
  if(!res1.success ||!res2.success){
    throw new Error("Invalid input")
  }
  const solvedHistory = await prisma.solvedHistory.findUnique({
    where: {
      userId_problemId: {
        userId,
        problemId,
      },
    },
  });

  const isSolved = Boolean(solvedHistory);

  return isSolved;
}
