import React from "react";
import gameScheduleData from "../pages/api/gameSchedule.json";

// Define your TypeScript interfaces
interface Game {
  day: string;
  time: string;
  matchup: {
    team1: string;
    team2: string;
  };
  rate: {
    [key: string]: number | null;
  };
  winner: string | null;
}

interface GameSchedule {
  GameSchedule: Game[];
}

const MyPickEm: React.FC = () => {
  const gameSchedule: GameSchedule = gameScheduleData as any;

  return (
    <div className="my-16">
      <h2 className="text-4xl font-bold mb-6 text-center uppercase">
        My Pick&apos;em
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {gameSchedule.GameSchedule.map((game, index) => (
          <div key={index} className="bg-black pt-4 px-4 pb-2 rounded-xl">
            <p className="text-white text-xl font-bold text-center">
              {game.matchup.team1} vs {game.matchup.team2}
            </p>
            {/* <div className="background1"></div>
            <div className="background2"></div> */}
            <div className="grid grid-cols-3">
              <div className="bg-opacity-20 flex items-center justify-center">
                <p className="text-volt text-center text-4xl font-bold -mt-6">
                  {game.rate.team1 !== undefined
                    ? `${game.rate.team1}%`
                    : "--%"}
                </p>
              </div>
              <div>
                <p className="cta-btn">Pick&apos;em!</p>
                <p className="text-white text-center">
                  {/* {game.day} */}
                  {game.time}
                </p>
              </div>
              <div className="bg-opacity-20 flex items-center justify-center">
                <p className="text-volt text-center text-4xl font-bold -mt-6">
                  {game.rate.team2 !== undefined
                    ? `${game.rate.team2}%`
                    : "--%"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPickEm;
