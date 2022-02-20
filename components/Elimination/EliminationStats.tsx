import { useCurrentUser } from "../../Helpers/Hooks/CurrentUserHook";
import { useEliminationLeaderboard } from "../../Helpers/Hooks/Elimination/EliminationLeaderboardHook";
import { useEliminationStats } from "../../Helpers/Hooks/Elimination/EliminationStatsHook";
import { useUser } from "../../Helpers/Hooks/UserHook";
import { MinigameType } from "../../Types/MinigameTypes";

export const EliminationStats = (props: { gameID?: string }) => {
  const stats = useEliminationStats(props.gameID);
  const self = useCurrentUser();
  const eliminator = useUser(stats?.eliminatedBy);
  const leaderboard = useEliminationLeaderboard(props.gameID);
  const rank = leaderboard?.findIndex((user) => user.userID === self?.userID);

  return (
    <div
      className={`w-full h-full dark:bg-gray-750 bg-gray-100 rounded-lg p-4 flex flex-col gap-4 shadow-md`}
    >
      <div className={`text-xl dark:text-gray-200 font-medium`}>User Stats</div>
      <div className={`flex flex-row gap-2 w-full justify-evenly`}>
        <img
          src={`https://disadus.app/logo.png`}
          className={`w-20 h-20 rounded-full`}
        />
        <div className={`flex flex-col gap-2 flex-grow h-full justify-evenly`}>
          <span className={`text-xl font-bold`}>
            {self?.firstName} {self?.lastName}
          </span>
          <span className={`text-sm font-medium`}>@{self?.userID}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-1 w-full justify-evenly text-lg`}>
        <div
          className={`flex flex-row gap-2 w-full justify-between items-center`}
        >
          Kills <span className={`text-xl font-medium`}>{stats?.kills}</span>
        </div>
        <div
          className={`flex flex-row gap-2 w-full justify-between items-center`}
        >
          Rank{" "}
          <span className={`text-xl font-medium`}>
            {rank === -1 ? `—` : (rank || 0) + 1}
          </span>
        </div>
        <div
          className={`flex flex-row gap-2 w-full justify-between items-center`}
        >
          Eliminated{" "}
          <span className={`text-xl font-medium`}>
            {!stats?.eliminated
              ? `No`
              : `by ${eliminator?.firstName} ${eliminator?.lastName}`}
          </span>
        </div>
      </div>
    </div>
  );
};