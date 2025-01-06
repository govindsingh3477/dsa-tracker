import ManageProblems from "@/components/admin/ManageProblems";
import Navbar from "@/components/Navbar";

export default function AdminPanel() {
    return (
        <>
        <Navbar></Navbar>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">DSATracker Admin</h1>
        <ManageProblems />
      </div>
      </>
    );
  }