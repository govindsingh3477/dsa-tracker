import React, { use } from 'react'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'
import UserStatics from './Userstatics'
import ProblemHistory from './ProblemHistory'
import Footer from './Footer'
import getUserDetails from '@/lib/actions/getUserDetails'
interface userPropInterface{
  name: string|null,
  email: string|null,
  image: string|null,    
  id: string,
  Admin: boolean
}
export default async function ProfilePageComponent({userId}:{userId:string}) {
  const {totalCount,userDetails} = await getUserDetails(userId)
  const user:userPropInterface={
    name:userDetails.name,
    email:userDetails.email,
    image:userDetails.image,
    id:userDetails.id,
    Admin:(userDetails.role=="ADMIN")
  }
  console.log(user);
  
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6 bg-red-50">
        {/* Profile Section */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            <div className="p-2 m-auto sm:m-0 sm:col-span-6 lg:col-span-3 bg-white rounded-lg ">
                <ProfileCard user={user} ></ProfileCard>
                </div>
            <div className=" sm:col-span-6 lg:col-span-9 p-2 bg-white rounded-lg ">
            <UserStatics streak={userDetails.streak} problemsSolved={userDetails.problemsSolved} score={userDetails.score} ></UserStatics>
            </div>
          {/* User Statistics */}
          
        </div>

        {/* Challenge History */}
        <ProblemHistory userId={userId}></ProblemHistory>
      </div>
      <Footer/>
    </>
  )
}
