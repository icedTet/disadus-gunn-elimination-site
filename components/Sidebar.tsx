import { useContext } from "react";
import CommunityContext from "../Helpers/Contexts/CommunityContext";
import { useCurrentCommunityMinigame } from "../Helpers/Hooks/CurrentMinigame";
import { useCommunityMinigames } from "../Helpers/Hooks/CMinigameHook";
import GameInfoCard from "./GameInfoCard";
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
  const gameInfo = useCurrentCommunityMinigame(community?.id);
  const allGames = useCommunityMinigames(community?.id);

  return (
    <div
      className={` top-0 z-20 h-full overflow-visible bg-gray-100 w-80 course-sidebar dark:bg-gray-800 lg:bottom-0 lg:h-16 lg:w-full lg:block transition-all lg:order-1 flex-shrink-0`}
    >
      {/* <div
      className={`w-full h-[130%] inf:hidden lg:block`}
      style={{
        WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 100%)`,
      }}
    >
      <img src={community?.vanitybg} className={`h-full w-auto min-w-[100%] object-cover object-center`} />
    </div> */}
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
                <div
                  className={`p-1.5 hover:bg-gray-500 !bg-opacity-40 transition-all duration-200 rounded-full cursor-pointer relative group lg:hidden`}
                  onClick={() => {
                    // courseContext?.setViewMembers!((x) => !x);
                    // screenSmallerThan("md") && setSidebarExpanded(false);
                  }}
                >
                  {/* <UserGroupIcon className="w-5 h-5" /> */}
                  <div
                    className={`absolute translate-y-[125%] bottom-0 -translate-x-1/2 left-1/2 group-hover:scale-100 scale-0 origin-top whitespace-nowrap p-2 bg-gray-900 text-gray-200 transition-all rounded-default`}
                  >
                    View Classmates
                  </div>
                </div>
              </div>
              <span
                className={`font-inter font-normal text-sm dark:text-gray-300 drop-shadow-md`}
              >
                Disadus Minigames
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col items-start justify-start p-4 gap-2 lg:flex-row lg:justify-evenly lg:items-center lg:w-full lg:h-full`}
        >
          {/* <CourseSidebarProvider value={{ selectedTab, setSelectedTab }}>
            {props.items?.map((item, index) => (
              <CourseSidebarItemLink key={index} item={item} />
            ))}
            <div className={`inf:hidden lg:block`}>
              <CourseSidebarItemLink
                key={props.items.length}
                item={{
                  name: "View Classmates",
                  icon: () => <UserGroupIcon className="w-5 h-5" />,
                  select: 3,
                  disabled: false,
                }}
              />
            </div>
          </CourseSidebarProvider> */}
        </div>

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
