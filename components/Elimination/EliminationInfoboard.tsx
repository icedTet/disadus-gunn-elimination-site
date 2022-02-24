import { useAnnouncements } from "../../Helpers/Hooks/AnnouncementHook";
import { MinigameType } from "../../Types/MinigameTypes";
import { AnnouncementViewer } from "../GameAnnouncement";
import { EliminationInfoCard } from "./EliminationInfoCard";
import { EliminationStats } from "./EliminationStats";
import { EliminationTarget } from "./EliminationTarget";
import EliminationEliminateCard from "./EliminiationEliminateCard";

export const EliminationInfoboard = (props: { game?: MinigameType }) => {
  const { game } = props;
  const announcements = useAnnouncements(props.game?.id);
  return (
    <div className={`w-full h-full md:py-16 md:p-8`}>
      {announcements && announcements.length > 0 && (
        <AnnouncementViewer
          announcement={announcements.sort((b, a) => a.time - b.time)[0]}
        />
      )}

      <div
        className={`2xl:flex 2xl:flex-col grid grid-cols-2 justify-evenly gap-8 w-full items-center flex-nowrap md:pt-4`}
      >
        <EliminationTarget gameID={game?.id} />
        <EliminationEliminateCard gameID={game?.id} />
        <EliminationStats gameID={game?.id} />
        <EliminationInfoCard gameID={game?.id} />
      </div>
    </div>
  );
};
