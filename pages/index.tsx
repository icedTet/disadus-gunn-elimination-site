import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { EliminationInfoboard } from "../components/Elimination/EliminationInfoboard";
import { EliminationKillFeedBase } from "../components/Elimination/KillFeed/EliminationKillFeedBase";
import EliminationLeaderboard from "../components/Elimination/Leaderboard/EliminationLeaderboardBase";
import { GameOverviewCard } from "../components/General/GameOverviewCard";
import UserContext from "../Helpers/Contexts/UserContext";
import { useAllMinigames } from "../Helpers/Hooks/CMinigameHook";
import { useMinigame } from "../Helpers/Hooks/MinigameHook";

export const EliminationPage = () => {
  const minigames = useAllMinigames();
  const user = useContext(UserContext);
  return (
    <div className={`w-full flex flex-col items-center`}>
      <div className={`max-w-prose flex flex-col items-center gap-8 w-full p-8`}>
        {minigames?.map((minigame) => (
          <GameOverviewCard game={minigame} />
        ))}
      </div>
    </div>
  );
};
export default EliminationPage;
