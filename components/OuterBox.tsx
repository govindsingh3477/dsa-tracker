export const OuterBox = ({ bgColor = "bg-white", children, className = "" ,title}:{bgColor:string,children:React.ReactNode,className?:string,title:string}) => {
  return (
    <div className={`p-6 py-6 rounded-xl shadow-md border ${bgColor} ${className}`}>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};