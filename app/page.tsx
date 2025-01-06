import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LeadBoardCard from "@/components/LeaderBoardCard";
import ProblemCard from "@/components/ProblemCard";
import ResourcesCard from "@/components/ResourcesCard";
import Footer from "@/components/Footer";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.Admin);
  
  if (!(session?.user)) {
    // console.log("hi there");
    
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-slate-50 min-h-screen p-6">
      {/* Daily Problems and Useful Resources */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Daily Problems */}
       <ProblemCard title="Daily Problems"></ProblemCard>

        {/* Useful Resources */}
        <ResourcesCard></ResourcesCard>
      </div>

      {/* Leaderboard */}
      <LeadBoardCard></LeadBoardCard>
      

      {/* Footer */}
      
    </div>
    <Footer></Footer>
    </div>
  );
}
