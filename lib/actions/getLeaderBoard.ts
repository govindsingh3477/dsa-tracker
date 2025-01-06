"use server"
import prisma from "@/db";
export default async function getLeaderBoard(){
    
    const leaderBoard = await prisma.user.findMany({
        
        select: {
            id: true,
            score:true,
            name:true,
            image:true
          },
          take:10,
          orderBy: {
            score: "desc", // Order by most recently solved problems
          },
    })
    return leaderBoard ;

}