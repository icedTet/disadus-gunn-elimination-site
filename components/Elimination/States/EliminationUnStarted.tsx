import { RefreshIcon } from "@heroicons/react/outline";
import { useState } from "react";
import EliminationToken from "../../../Global/ElimAPIClient";
import { APIDOMAIN } from "../../../Helpers/constants";
import { useAnnouncements } from "../../../Helpers/Hooks/AnnouncementHook";
import { useCurrentUser } from "../../../Helpers/Hooks/CurrentUserHook";
import { MinigameType } from "../../../Types/MinigameTypes";
import { AnnouncementViewer } from "../../GameAnnouncement";
import { EliminationInfoboard } from "../EliminationInfoboard";
import { EliminationKillFeedBase } from "../KillFeed/EliminationKillFeedBase";
import EliminationLeaderboard from "../Leaderboard/EliminationLeaderboardBase";

export const EliminationUnStarted = (props: { game: MinigameType }) => {
  const [starting, setStarting] = useState(false);
  const announcements = useAnnouncements(props.game.id);
  const user = useCurrentUser();
  return (
    <div className={`w-full h-full flex flex-col gap-4`}>
      <div
        className={`flex-grow flex flex-col relative justify-center items-center`}
      >
        <h1 className={`text-xl`}> Waiting for game </h1>
        <h1
          className={`text-6xl md:text-3xl p-2 animate-gradient-slow bg-clip-text text-transparent from-red-500 to-red-500 via-yellow-300 bg-gradient-to-r`}
        >
          {props.game.name}
        </h1>
        <h1 className={`text-xl`}> to start </h1>
        {user?.admin && (
          <div className={`flex flex-row pt-4 `}>
            <button
              className={`btn-primary`}
              onClick={async () => {
                setStarting(true);
                fetch(
                  `${APIDOMAIN}/elimination/game/${props.game.id}/admin/start`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: (await EliminationToken)!,
                    },
                  }
                ).then((x) => {
                  setStarting(false);
                });
              }}
            >
              {starting ? (
                <div className={`flex flex-row gap-2 items-center`}>
                  <RefreshIcon className={`w-4 h-4 animate-reverse-spin`} />
                  Starting Game
                </div>
              ) : (
                "Start Game"
              )}
            </button>
          </div>
        )}
        {announcements && !!announcements.length && (
          <div className={`flex flex-row w-full max-w-prose mt-4`}>
            <AnnouncementViewer
              announcement={announcements?.sort((b, a) => a.time - b.time)[0]}
            />
          </div>
        )}
      </div>
    </div>
  );
};
