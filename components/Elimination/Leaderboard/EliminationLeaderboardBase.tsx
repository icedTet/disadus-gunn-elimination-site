import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useEliminationLeaderboard } from "../../../Helpers/Hooks/Elimination/EliminationLeaderboardHook";
import { EliminationLeaderboardEntryViewer } from "./LeaderboardEntry";

export const EliminationLeaderboard = (props: { gameID?: string }) => {
  let leaderboard = useEliminationLeaderboard(props.gameID);
  const [showEliminated, setShowEliminated] = useState(true);
  const alives = leaderboard?.filter((entry) => !entry.eliminated);
  const aliveRanks = new Map();
  alives?.forEach((entry, index) => {
    aliveRanks.set(entry.userID, index);
  });
  if (!showEliminated) {
    leaderboard = alives!;
  }
  return (
    <div
      className={`w-128 1.5xl:w-104 max-w-[100vw] h-full lg:p-0 flex-grow-0 md:w-full`}
    >
      <div
        className={`w-full h-full flex flex-col gap-4 bg-gray-100 dark:bg-gray-900 dark:md:bg-gray-850 p-4 pt-8 overflow-auto`}
      >
        <Switch.Group>
          <div className="flex items-center">
            <Switch.Label className="mr-4">Show Dead People</Switch.Label>
            <Switch
              checked={showEliminated}
              onChange={setShowEliminated}
              className={`${
                showEliminated ? "bg-primary-600" : "bg-gray-200"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              <span
                className={`${
                  showEliminated ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
        {leaderboard &&
          leaderboard.map((userData, index) => (
            <EliminationLeaderboardEntryViewer
              userData={userData}
              gameID={props.gameID!}
              index={index}
              key={JSON.stringify(userData)}
            />
          ))}
      </div>
    </div>
  );
};
export default EliminationLeaderboard;
