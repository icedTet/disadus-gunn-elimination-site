import { useContext, useState } from "react";
import CommunityContext from "../Helpers/Contexts/CommunityContext";
import { useCurrentCommunityMinigame } from "../Helpers/Hooks/CurrentMinigame";
import { useAllMinigames } from "../Helpers/Hooks/CMinigameHook";
import GameInfoCard from "./GameInfoCard";
import UserContext from "../Helpers/Contexts/UserContext";
import { PlusIcon } from "@heroicons/react/outline";
import { CreateGameModal } from "./Admin/CreateGameModal";
const timeLeftFormatted = (time: number) => {
  const now = Date.now();
  const timeLeft = time - now;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor(timeLeft / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
export const GamesSidebar = () => {
  const community = useContext(CommunityContext);
  const user = useContext(UserContext);
  const gameInfo = useCurrentCommunityMinigame();
  const allGames = useAllMinigames();
  const [createGameOpen, setCreateGameOpen] = useState(false);
  
  return (
    <div
      className={` top-0 z-20 h-full overflow-visible bg-gray-100 w-80 course-sidebar dark:bg-gray-800 lg:bottom-0 lg:h-16 lg:w-full lg:block transition-all lg:order-1 flex-shrink-0`}
    >
      <CreateGameModal
        visible={createGameOpen}
        onClose={() => setCreateGameOpen(false)}
      />
      <div
        className={`flex flex-col h-full gap-2 overflow-visible w-full relative`}
      >
        <div className={`flex flex-row w-full gap-4 z-10 relative lg:hidden`}>
          <div className={`absolute top-0 left-0 w-full h-full z-0`}>
            <div
              className={`w-full h-[130%]`}
              style={{
                WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.0) 100%)`,
              }}
            >
              <img
                src={community?.vanitybg}
                className={`h-full w-auto min-w-[100%] object-cover object-center`}
              />
            </div>
          </div>
          <div
            className={`flex flex-row w-full gap-4 z-10 relative p-4 lg:pt-14`}
          >
            <img
              src={community?.image}
              className={`w-20 h-20 rounded-full object-cover object-center drop-shadow-md text-gray-650 dark:text-gray-200`}
            />
            <div className={`flex flex-col justify-evenly`}>
              <div className={`flex flex-row items-center gap-4`}>
                <span
                  className={`font-inter font-medium text-xl drop-shadow-md`}
                >
                  {community?.name}
                </span>
              </div>
              <span
                className={`font-inter font-normal text-sm dark:text-gray-300 drop-shadow-md`}
              >
                Disadus Minigames
              </span>
              {user?.admin && (
                <div
                  className={`dark:hover:bg-gray-800/80 hover:bg-gray-500/20 cursor-pointer rounded-lg group overflow-hidden flex flex-row items-center px-2`}
                  onClick={() => setCreateGameOpen(true)}
                >
                  <PlusIcon className={`w-6 h-6 group-hover:text-red-500`} />
                  <span
                    className={`group-hover:bg-gradient-to-r from-red-500 via-orange-400 to-red-500 animate-gradient-slow flex flex-row gap-2 p-2 w-full group-hover:!text-transparent group-hover:bg-clip-text transition-all`}
                  >
                    Add Game
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col items-start justify-start p-4 gap-2 lg:flex-row lg:justify-evenly lg:items-center lg:w-full lg:h-full`}
        ></div>

        {gameInfo && (
          <div className={`flex flex-col items-start justify-start p-4 gap-2 `}>
            <div className={`text-sm dark:text-gray-400 font-ubuntu`}>
              Current Game
            </div>
            <GameInfoCard game={gameInfo} />
          </div>
        )}
        <div className={`px-4 w-full`}>
          <hr className={`border dark:border-gray-600 border-gray-200`} />
        </div>
        <div className={`flex flex-col items-start justify-start p-4 gap-2 `}>
          <div className={`text-sm dark:text-gray-400 font-ubuntu`}>
            Upcoming Games
          </div>
          {allGames
            ?.filter(
              (g) => g.id !== gameInfo?.id && g.end && g.end > Date.now()
            )
            .map((game, index) => (
              <GameInfoCard game={game} key={JSON.stringify(game)} />
            ))}
          {allGames?.filter(
            (g) => g.id !== gameInfo?.id && g.end && g.end > Date.now()
          ).length === 0 && (
            <div
              className={`text-sm dark:text-gray-500 font-ubuntu w-full text-center py-16`}
            >
              No upcoming games
            </div>
          )}
        </div>
        <div className={`px-4 w-full`}>
          <hr className={`border dark:border-gray-600 border-gray-200`} />
        </div>
        <div className={`flex flex-col items-start justify-start p-4 gap-2 `}>
          <div className={`text-sm dark:text-gray-400 font-ubuntu`}>
            Past Games
          </div>
          {allGames

            ?.filter(
              (g) => g.id !== gameInfo?.id && g.end && g.end < Date.now()
            )
            .map((game, index) => (
              <GameInfoCard game={game} key={JSON.stringify(game)} />
            ))}
          {allGames?.filter(
            (g) => g.id !== gameInfo?.id && g.end && g.end < Date.now()
          ).length === 0 && (
            <div
              className={`text-sm dark:text-gray-500 font-ubuntu w-full text-center py-16`}
            >
              No past games
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
