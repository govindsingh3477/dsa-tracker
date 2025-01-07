import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfilePageComponent from "@/components/ProfilePageComponent";

export default async function UserProfilePage({ params }: {  params: Promise<{ userId: string }> }) {
  // Get the session for authorization
  const session = await getServerSession(authOptions);
    // console.log("this is gotr hit ");
    
  // Redirect to sign-in page if not authenticated
  if (!(session?.user)) {
    redirect("/api/auth/signin");
  }

  // Fetch the user profile by userId
  const userId =(await params).userId


  return (
    <ProfilePageComponent userId={userId} />
  );
}
