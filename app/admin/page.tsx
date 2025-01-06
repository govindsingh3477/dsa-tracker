import ManageProblems from "@/components/admin/ManageProblems";
import Navbar from "@/components/Navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminPanel() {
  const session = await getServerSession(authOptions);
          if (!(session?.user)) { 
            redirect("/api/auth/signin");
          }
    return (
        <>
        <Navbar></Navbar>
      <div className="p-8 bg-red-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">DSATracker Admin</h1>
        <ManageProblems />
      </div>
      </>
    );
  }