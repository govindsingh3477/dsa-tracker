"use client"

import React, {  useState } from 'react'
import FiltersAndSorting from './FilterAndSorting'
import ProblemsList from './ProblemsList'
interface Problem {
    id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    platformName: string;
    link: string;
    createdAt: Date;
  }
export default function ProblemPageComponent({ProblemList ,userId}:{ProblemList:Problem[],userId:string}) {
    const [Problems,setProblems]=useState<Problem[]>(ProblemList)
    
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r shadow-md">
        <FiltersAndSorting setProblems={setProblems}/>
      </div>
      <div className="w-full p-4">
      <ProblemsList ProblemList={Problems}  userId={userId}></ProblemsList>
      </div>
      
    </div>
  )
}
