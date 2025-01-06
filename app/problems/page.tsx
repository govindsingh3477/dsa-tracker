import FiltersAndSorting from "@/components/FilterAndSorting";
import Navbar from "@/components/Navbar";
import ProblemsList from "@/components/ProblemsList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function ProblemsPage() {
  const session = await getServerSession(authOptions);
        if (!(session?.user)) { 
          redirect("/api/auth/signin");
        }
  return (
    <>
    <Navbar></Navbar>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r shadow-md">
        <FiltersAndSorting/>
      </div>
      <div className="w-full p-4">
      <ProblemsList ></ProblemsList>
      </div>
      
    </div>
    
    </>);
}
