import { useState, useEffect } from "react";
import { GameAnnouncement } from "../../Types/MinigameTypes";
import { APIDOMAIN } from "../constants";
import LiveEventsListener from "../Listeners/LiveEventsListener";

export const useAnnouncements = (gameID?: string) => {
  const [announcements, setAnnouncements] = useState(
    null as GameAnnouncement[] | null
  );
  useEffect(() => {
    if (!gameID) return;
    if (localStorage.getItem(`announcements-${gameID}`)) {
      setAnnouncements(
        JSON.parse(
          localStorage.getItem(`announcements-${gameID}`) as string
        ) as GameAnnouncement[]
      );
    }
    fetch(`${APIDOMAIN}/game/${gameID}/announcements`).then(
      async (response) => {
        const resp = await response.json();
        setAnnouncements(resp);
        localStorage.setItem(`announcements-${gameID}`, JSON.stringify(resp));
      }
    );
    const onAnnouncement = (event: { announcement: GameAnnouncement }) => {
      const { announcement } = event;
      if (announcement.game === gameID) {
        setAnnouncements((announcements) => [announcement, announcement]);
      }
    };
    LiveEventsListener.on("gameAnnouncement", onAnnouncement);
    return () => {
      LiveEventsListener.off("gameAnnouncement", onAnnouncement);
    };
  }, [gameID]);
  return announcements;
};
