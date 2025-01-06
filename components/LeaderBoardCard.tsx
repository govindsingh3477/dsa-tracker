import Link from 'next/link'; // Import Link for Next.js navigation
import { OuterBox } from './OuterBox';
import getLeaderBoard from '@/lib/actions/getLeaderBoard';

interface UserProfileProps {
  rank: number; // The rank of the user
  user_id: string; // The user ID
  name: string; // The user's name
  points: number; // The user's points
}

export const UserProfile: React.FC<UserProfileProps> = ({ rank, user_id, name, points }) => {
  return (
    <div className="p-4 shadow-md rounded-md bg-slate-50 flex justify-between items-center space-x-4 border border-gray-200">
      <div className="flex items-center">
        {/* Use Link directly and pass the classes */}
        <Link href={`/profile/${user_id}`} className="font-semibold text-lg">
          {rank}. {name}
        </Link>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium">{points} Points</span>
      </div>
    </div>
  );
};

const LeadBoardCard = async() => {
  const leaderBoard=await getLeaderBoard()
  return (
    <div>
      <OuterBox bgColor="bg-white" title="Leaderboard">
        {leaderBoard.map((user,index)=><UserProfile key={user.id} rank={index} user_id={user.id} name={(user.name?user.name:"")} points={user.score} />)}
      </OuterBox>
    </div>
  );
};

export default LeadBoardCard;
