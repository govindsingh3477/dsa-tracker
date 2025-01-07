import React from "react";

const ProfileWrapperCard = ({ children, className }:{children:React.ReactNode,className:string}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className || ""}`}>
      {children}
    </div>
  );
};

export default ProfileWrapperCard;
