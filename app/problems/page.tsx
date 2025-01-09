import Navbar from "@/components/Navbar";
import ProblemPageComponent from "@/components/ProblemPageComponent";
import getFilteredProblemList from "@/lib/actions/getFilteredProblemList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function ProblemsPage() {
  const session = await getServerSession(authOptions);
        if (!(session?.user)) { 
          redirect("/api/auth/signin");
        }
  const ProblemList = await getFilteredProblemList({});
  const userId = session.user.id;
  return (
    <>
    <Navbar></Navbar>
    <ProblemPageComponent ProblemList={ProblemList} userId={userId}></ProblemPageComponent>
    
    </>);
}
