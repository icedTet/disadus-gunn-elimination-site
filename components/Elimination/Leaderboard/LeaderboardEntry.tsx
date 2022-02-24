import { BiCrown, BiMedal } from "react-icons/bi";
import { useCurrentUser } from "../../../Helpers/Hooks/CurrentUserHook";
import { useUser } from "../../../Helpers/Hooks/UserHook";
import { EliminationLeaderboardEntry } from "../../../Types/EliminationTypes";
import { MonogramPFP } from "../../Monogram";

export const EliminationLeaderboardEntryViewer = (props: {
  userData: EliminationLeaderboardEntry;
  gameID: string;
  index: number;
}) => {
  const { userData, gameID, index } = props;
  const user = useUser(userData.userID);
  const currentUser = useCurrentUser();
  return (
    <div
      className={`w-full flex flex-row gap-2 inf:rounded-lg lg:rounded-none items-center`}
    >
      <div
        className={`flex-shrink-0 p-2 h-8 w-8 text-center rounded-full ${
          currentUser?.userID === userData.userID
            ? `bg-emerald-400 bg-opacity-50`
            : `bg-gray-100 dark:bg-gray-800`
        } flex flex-row items-center justify-center shadow-md `}
      >
        {index === -1 ? `—` : index + 1}
      </div>
      <div
        className={`flex flex-grow h-16 bg-gray-100 ${
          currentUser?.userID === userData.userID
            ? `bg-emerald-400 bg-opacity-50`
            : `bg-gray-100 dark:bg-gray-750`
        }  rounded-full flex-row gap-2 shadow-sm ${
          userData.eliminated && `opacity-50`
        }`}
      >
        <MonogramPFP
          user={user}
          className={`w-16 h-16 rounded-full flex-shrink-0 drop-shadow `}
        />
        <div className={`flex flex-col flex-grow justify-evenly`}>
          <span
            className={`text-xl font-bold flex flex-row gap-4 items-center`}
          >
            {user?.firstName} {user?.lastName}
            {index === 0 && <BiCrown className={`w-6 h-6 text-yellow-500`} />}
            {index === 1 && <BiMedal className={`w-6 h-6 text-gray-500`} />}
            {index === 2 && <BiMedal className={`w-6 h-6 text-orange-500`} />}
          </span>
          <span className={`text-sm font-medium`}>@{user?.userID}</span>
        </div>

        <div className={`flex flex-row items-center gap-1 px-2 pr-4`}>
          <span className={`text-xl font-semibold`}>{userData.kills}</span>
          <span>Kills</span>
        </div>
      </div>
    </div>
  );
};
