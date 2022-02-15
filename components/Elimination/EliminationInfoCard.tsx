import { useState } from "react";
import { useCommunity } from "../../Helpers/Hooks/CommunityHook";
import { useCurrentUser } from "../../Helpers/Hooks/CurrentUserHook";
import { useEliminationLeaderboard } from "../../Helpers/Hooks/Elimination/EliminationLeaderboardHook";
import { useEliminationStats } from "../../Helpers/Hooks/Elimination/EliminationStatsHook";
import { useMinigame } from "../../Helpers/Hooks/MinigameHook";
import { useUser } from "../../Helpers/Hooks/UserHook";
import { MinigameType } from "../../Types/MinigameTypes";
import { KillCodeModal } from "./Modals/KillCodeModal";

export const EliminationInfoCard = (props: { gameID?: string }) => {
  const self = useCurrentUser();
  const gameInfo = useMinigame(props.gameID);
  const community = useCommunity(gameInfo?.community);
  const [helpOpen, setHelpOpen] = useState(false);
  const [eliminationPopup, setEliminationPopup] = useState(false);
  const elimInfo = useEliminationStats(props.gameID);
  return (
    <>
      <KillCodeModal
        userData={elimInfo}
        open={eliminationPopup}
        setOpen={setEliminationPopup}
      />
      <div
        className={`w-full h-full dark:bg-gray-750 bg-gray-100 rounded-lg p-4 flex flex-col gap-4 shadow-md`}
      >
        <div className={`text-xl dark:text-gray-200 font-medium`}>
          Miscellaneous
        </div>
        <div
          className={`flex flex-col gap-2 w-full justify-evenly items-center flex-grow`}
        >
          <button
            className={`p-1 px-4 border-collapse text-blue-500 border-blue-500 border-2 rounded-full hover:bg-blue-500 hover:text-white transition-all`}
            onClick={() => setHelpOpen(true)}
          >
            How to Play
          </button>
          {community &&
            (community?.admins as string[]).includes(self?.id || "") && (
              <button
                className={`p-1 px-4 border-collapse text-red-500 border-red-500 border-2 rounded-full hover:bg-red-500 hover:text-white transition-all`}
                onClick={() => setHelpOpen(true)}
              >
                Admin Panel
              </button>
            )}
          <button
            className={`p-1 px-4 border-collapse text-red-500 border-red-500 border-2 rounded-full hover:bg-red-500 hover:text-white transition-all`}
            onClick={() => setEliminationPopup(true)}
          >
            Show Kill Code
          </button>
        </div>
      </div>
    </>
  );
};
