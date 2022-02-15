import { BiTargetLock } from "react-icons/bi";
import { useCurrentUser } from "../../Helpers/Hooks/CurrentUserHook";
import { useEliminationLeaderboard } from "../../Helpers/Hooks/Elimination/EliminationLeaderboardHook";
import { useEliminationStats } from "../../Helpers/Hooks/Elimination/EliminationStatsHook";
import { useEliminationUserData } from "../../Helpers/Hooks/Elimination/EliminationUserDataHook";
import { useUser } from "../../Helpers/Hooks/UserHook";
import { MinigameType } from "../../Types/MinigameTypes";

export const EliminationTarget = (props: { gameID?: string }) => {
  const stats = useEliminationStats(props.gameID);
  const target = useUser(stats?.targetID);
  const leaderboard = useEliminationLeaderboard(props.gameID);
  const targetRank = leaderboard?.findIndex(
    (user) => user.userID === stats?.targetID
  );
  const elimTarget = useEliminationUserData(props.gameID, target?.id);
  return (
    <div
      className={`w-full h-full rounded-lg p-4 pb-6 flex flex-col gap-4 dark:bg-red-700 bg-red-300 dark:bg-opacity-30 group shadow-md`}
    >
      <div
        className={`text-2xl dark:text-red-500 text-red-700 font-bold text-center flex flex-row gap-2 items-center justify-center `}
      >
        <BiTargetLock className={`w-8 h-8`} /> Current Target
      </div>
      <div className={`flex flex-row gap-8 w-full justify-center items-center flex-grow`}>
        <img
          src={target?.pfp || `https://disadus.app/logo.png`}
          className={`w-24 h-24 rounded-full`}
        />
        <div className={`flex flex-col gap-1 h-full justify-center `}>
          <span className={`text-3xl font-bold font-varela text-white`}>
            {target?.firstName} {target?.lastName}
          </span>
          <span className={`text-xl font-medium text-yellow-100`}>
            @{target?.username}
          </span>
        </div>
      </div>
    </div>
  );
};
