import { MinigameType } from "../../../Types/MinigameTypes";
import { EliminationInfoboard } from "../EliminationInfoboard";
import { EliminationKillFeedBase } from "../KillFeed/EliminationKillFeedBase";
import EliminationLeaderboard from "../Leaderboard/EliminationLeaderboardBase";

export const EliminationStarted = (props: { game: MinigameType }) => (
  <div className={`w-full h-full flex flex-row`}>
    <div className={`flex-grow flex flex-col relative`}>
      <div
        className={`absolute top-0 left-0 w-full h-full p-8 overflow-auto flex flex-col gap-8`}
      >
        <EliminationInfoboard game={props.game || undefined} />
        <EliminationKillFeedBase gameID={props.game.id} />
      </div>
    </div>
    <EliminationLeaderboard gameID={props.game.id} />
  </div>
);
