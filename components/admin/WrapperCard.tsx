import { ReactNode } from "react";

interface WrapperCardProps {
  children: ReactNode;
  bgColor?:string
}

export default function WrapperCard({ children ,bgColor}: WrapperCardProps) {
  return (
    <div className={`p-6  ${bgColor?bgColor:"bg-white"} rounded-lg shadow-md`}>{children}</div>
  );
}
