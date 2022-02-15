import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { EliminationInfoboard } from "../components/Elimination/EliminationInfoboard";
import { EliminationKillFeedBase } from "../components/Elimination/KillFeed/EliminationKillFeedBase";
import EliminationLeaderboard from "../components/Elimination/Leaderboard/EliminationLeaderboardBase";
import UserContext from "../Helpers/Contexts/UserContext";
import { useMinigame } from "../Helpers/Hooks/MinigameHook";

export const EliminationPage = () => {
  const user = useContext(UserContext);
  const { query } = useRouter();
  const [gameID, setGameID] = useState(undefined as string | undefined);
  const minigame = useMinigame(typeof gameID === "string" ? gameID : undefined);
  useEffect(() => {
    typeof query.id === "string" && query.id && setGameID(query.id);
  }, []);
  return (
    <div className={`w-full h-full flex flex-row`}>
      <div className={`flex-grow flex flex-col relative`}>
        <div
          className={`absolute top-0 left-0 w-full h-full p-8 overflow-auto flex flex-col gap-8`}
        >
          {" "}
          <EliminationInfoboard game={minigame || undefined} />
          <EliminationKillFeedBase gameID={gameID} />
        </div>
        {/* <div
        className={`dark:text- font-inter text-3xl drop-shadow-md animate-gradient-slow !bg-clip-text w-full`}
      >
        Elimination
        {user && community && ` - ${community.name} `}
        {JSON.stringify(minigame)}
       
      </div> */}
      </div>
      <EliminationLeaderboard gameID={gameID} />
    </div>
  );
};
export default EliminationPage;
