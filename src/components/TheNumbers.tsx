import React from "react";
import gameScheduleData from "../pages/api/theNumbers.json";

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

const TheNumbers: React.FC = () => {
  const gameSchedule: GameSchedule = gameScheduleData as any;

  return (
    <div className="mb-16">
      <div className="">
        {/* {gameSchedule.GameSchedule.map((game, index) => ( */}
        <div className="bg-black pt-8 pb-4 px-4 rounded-b-xl">
          {/* <div className="background1"></div>
          <div className="background2"></div> */}
          <div className="grid grid-cols-5">
            <div className="bg-opacity-20 flex items-center justify-center">
              <p className="text-volt text-center text-2xl font-bold">
                The Numbers
              </p>
            </div>
            <div>
              <p className="text-volt text-center text-4xl font-bold mb-0">45</p>
              <p className="text-white text-center">Total Winnings</p>
            </div>
            <div className="">
              <p className="text-volt text-center text-4xl font-bold mb-0">45</p>
              <p className="text-white text-center">Total Draws</p>
            </div>
            <div className="">
              <p className="text-volt text-center text-4xl font-bold mb-0">45</p>
              <p className="text-white text-center">Best Win Streak</p>
            </div>
            <div className="">
              <p className="text-volt text-center text-4xl font-bold mb-0">45</p>
              <p className="text-white text-center">Best Win Streak</p>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default TheNumbers;
