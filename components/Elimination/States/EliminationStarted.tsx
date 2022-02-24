import { useState } from "react";
import { useAnnouncements } from "../../../Helpers/Hooks/AnnouncementHook";
import { useScreenResize } from "../../../Helpers/Hooks/ScreenResizeHook";
import {
  getCurrentBreakpoint,
  screenSmallerThan,
} from "../../../Helpers/TailwindHelpers/getBreakpoint";
import { MinigameType } from "../../../Types/MinigameTypes";
import { EliminationBottomBar } from "../BottomBar/EliminationBottomBar";
import { EliminationInfoboard } from "../EliminationInfoboard";
import { EliminationKillFeedBase } from "../KillFeed/EliminationKillFeedBase";
import EliminationLeaderboard from "../Leaderboard/EliminationLeaderboardBase";

export const EliminationStarted = (props: { game: MinigameType }) => {
  const screenSize = useScreenResize();
  const [currentTab, setCurrentTab] = useState(0);
  
  return (
    <div className={`w-full h-full flex flex-row md:flex-col`}>
      <div className={`flex-grow flex flex-col relative`}>
        <div
          className={`absolute top-0 left-0 w-full h-full p-8 md:p-0 overflow-auto flex flex-col gap-8`}
        >
          {(!screenSmallerThan("md") || currentTab === 0) && (
            <EliminationInfoboard game={props.game || undefined} />
          )}
          {screenSmallerThan("md") && currentTab === 1 && (
            <EliminationLeaderboard gameID={props.game.id} />
          )}
          {(!screenSmallerThan("md") || currentTab === 2) && (
            <EliminationKillFeedBase gameID={props.game.id} />
          )}
        </div>
      </div>
      {screenSmallerThan("md") && (
        <EliminationBottomBar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
      {!screenSmallerThan("md") && (
        <EliminationLeaderboard gameID={props.game.id} />
      )}
    </div>
  );
};
