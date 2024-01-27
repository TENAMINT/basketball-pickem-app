import LeaderboardData from "../pages/api/leaderboardList.json";

const LeaderboardList = () => {
  // Sort the leaderboard based on points
  const sortedLeaderboard = LeaderboardData.leaderboard.sort(
    (a, b) => b.points - a.points
  );

  return (
    <div className="bg-black pt-6 px-12 pb-8 mt-12 rounded-xl">
      <h2 className="text-4xl font-bold mb-10 text-center uppercase text-volt">
        Leaderboard
      </h2>
      {sortedLeaderboard && (
        <div className="grid grid-cols-2 gap-4">
          {sortedLeaderboard.map((player, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                className="h-16 w-16"
                src={player.profile_image}
                alt={`${player.name}'s profile`}
              />
              <div className="flex gap-2">
                <span className="font-bold text-volt text-2xl">#{index + 1} </span>
                <span className="block font-semibold text-white mt-1">
                  {player.name}
                </span>
                <span className="font-bold block text-2xl text-volt">
                  {player.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderboardList;
