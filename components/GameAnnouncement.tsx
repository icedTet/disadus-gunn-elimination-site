import { SpeakerphoneIcon } from "@heroicons/react/outline";
import { useUser } from "../Helpers/Hooks/UserHook";
import { GameAnnouncement } from "../Types/MinigameTypes";
import { MonogramPFP } from "./Monogram";

export const AnnouncementViewer = (props: {
  announcement: GameAnnouncement;
}) => {
  const { announcement } = props;
  const userInfo = useUser(announcement.userID);
  return (
    <div
      className={
        "rounded-md mb-2 bg-amber-500/20 text-amber-900 dark:bg-yellow-400/10 dark:text-yellow-400 px-3 py-2 flex flex-row gap-2 rounded-lg w-full"
      }
    >
      <SpeakerphoneIcon className={`h-8 w-8`} />
      {announcement && (
        <div className={`w-full`}>
          <div className={`flex flex-row items-center justify-between w-full`}>
            <h2 className={"text-lg font-bold"}>Announcement</h2>
            <span className={`text-sm ml-4`}>
              {new Date(announcement.time).toLocaleDateString()}{" "}
              {new Date(announcement.time).toLocaleTimeString()}
            </span>
          </div>
          <p>{announcement.message}</p>
          <p className={`dark:text-yellow-100 flex flex-row items-center gap-2 pt-4`}>
            - <MonogramPFP user={userInfo} className={`w-8 h-8 !text-sm`} /> {userInfo?.firstName} {userInfo?.lastName}
          </p>
        </div>
      )}
    </div>
  );
};
