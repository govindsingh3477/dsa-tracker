import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LeadBoardCard from "@/components/LeaderBoardCard";
import ProblemCard from "@/components/ProblemCard";
import ResourcesCard from "@/components/ResourcesCard";
import Footer from "@/components/Footer";
import AboutCard from "@/components/AboutCard";
export default async function Home() {
  const session = await getServerSession(authOptions);
  
  
  if (!(session?.user)) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-red-50 min-h-screen p-6">
      {/* Daily Problems and Useful Resources */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Daily Problems */}
       <ProblemCard ></ProblemCard>

        {/* Useful Resources */}
        <LeadBoardCard></LeadBoardCard>
       
      </div>

      {/* Leaderboard */}
      {/* <ResourcesCard></ResourcesCard> */}
      {/* <AboutCard></AboutCard> */}
      <div className="mt-6">
          <AboutCard></AboutCard> {/* Add AboutCard component */}
        </div>
      {/* Footer */}
      
    </div>
    <Footer></Footer>
    </div>
  );
}
