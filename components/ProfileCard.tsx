import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
interface userPropInterface{
  name: string|null,
  email: string|null,
  image: string|null,    
  id: string,
  Admin: boolean
}


const ProfileCard = async ({user}:{user:userPropInterface}) => {
  const session = await getServerSession(authOptions)
  
    return (
      <div className="max-w-sm bg-red-50 rounded-lg text-center p-3 shadow-md">
      <div className="flex items-center justify-center">
      <Image
        src={user.image || "/default-profile.png"} // Add a default profile image
        alt="Profile"
        width={96}
        height={96}
        className="rounded-full border-4 border-gray-200"
      />


      <div className="ml-2">
      <h2 className="text-xl font-semibold text-gray-800 ">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p></div>
      </div>{ user.id===session.user.id?
      <SignOutButton ></SignOutButton> :null}
    </div>
    );
  };
  
  export default ProfileCard;
  