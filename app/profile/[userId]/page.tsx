import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfilePageComponent from "@/components/ProfilePageComponent";

export default async function UserProfilePage({ params }: { params: { userId: string } }) {
  // Get the session for authorization
  const session = await getServerSession(authOptions);
    console.log("this is gotr hit ");
    
  // Redirect to sign-in page if not authenticated
  if (!(session?.user)) {
    redirect("/api/auth/signin");
  }

  // Fetch the user profile by userId
  const { userId } = params;

  // Dummy user data (replace with actual database call in real implementation)
  const user = {
    name: "samriddhi",
    image: "https://www.bing.com/images/search?view=detailV2&ccid=ABxetoZW&id=5334F81E815C511DCB942030AF5A30B9BAEED60D&thid=OIP.ABxetoZWRGN9HRaOLYK-JgHaE5&mediaurl=https%3a%2f%2fd27jswm5an3efw.cloudfront.net%2fapp%2fuploads%2f2019%2f07%2fhow-to-make-a-url-for-a-picture-on-your-computer-4.jpg&exph=529&expw=800&q=image+url&simid=607991701631423003&FORM=IRPRST&ck=BE537CA6B6E6EA5B97721CBDAC37F7DB&selectedIndex=1&itb=0",
    email: userId,
    id: "string",
    Admin: true
  };

  // Handle case when no user is found (in case the userId doesn't match)
  if (!user) {
    return redirect("/404"); // This ensures that the user is redirected to 404 page if not found
  }

  return (
    <ProfilePageComponent userId={params.userId} />
  );
}
