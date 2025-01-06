const UserStatisticsCard = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-between">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">120</h2>
          <p className="text-gray-500">Challenges Completed</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">85%</h2>
          <p className="text-gray-500">Success Rate</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">30</h2>
          <p className="text-gray-500">Days Streak</p>
        </div>
      </div>
    );
  };
  
  export default UserStatisticsCard;
  