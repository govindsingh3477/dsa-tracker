import FiltersAndSorting from "@/components/FilterAndSorting";
import Navbar from "@/components/Navbar";
import ProblemsList from "@/components/ProblemsList";


export default function ProblemsPage() {
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
