import React from "react";
import TeamListData from "../pages/api/teamList.json";

interface Team {
  name: string;
  imageUrl: string;
}

interface TeamListData {
  TeamList: Team[];
}

const TeamList: React.FC = () => {
  const teamListData: TeamListData = TeamListData as any;
  const teamList: Team[] = teamListData.TeamList;

  return (
    <div>
      <h2 className="text-4xl font-bold mt-12 mb-6 text-center uppercase">Teams</h2>
      <div className="grid grid-cols-6 gap-4 outline outline-4 outline-black rounded-xl">
        {teamList ? (
          teamList.map((team, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <div>
                {/* <h2 className="text-white">{team.name}</h2> */}
                <img
                  src={team.imageUrl}
                  alt={team.name}
                  className="w-142 h-142 object-contain"
                />
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TeamList;
