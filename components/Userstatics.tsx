import { string } from "zod";
import WrapperCard from "./admin/WrapperCard";
interface Statistics{
  streak:Number,
  problemsSolved:Number,
  score:Number

}
export default function UserStatics({streak,problemsSolved,score}:Statistics){
    return (<>
        <div className=" flex flex-col gap-10 lg:justify-around lg:flex-row items-center bg-white rounded-lg text-center  shadow-md h-full">
          
            <Box content={problemsSolved.toString()} name="Problems Solved" bgcolor="bg-red-50"></Box>
            <Box content={score.toString()} name="Total Score" bgcolor="bg-green-50"></Box>
          <Box content={streak.toString()} name="Days Streak" bgcolor="bg-b"></Box>
        </div>
    </>)
}


function Box({name , bgcolor,content}:{name:string,bgcolor:string,content:string}){
    return (<>
    
            <div className="w-60">
              <WrapperCard bgColor={bgcolor}>
            <h3 className="text-xl font-bold text-red-500">{content}</h3>
            <p className="text-gray-500">{name}</p></WrapperCard>
            </div>
    </>)
}