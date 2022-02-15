import { QrcodeIcon } from "@heroicons/react/outline";
import { useEliminationStats } from "../../Helpers/Hooks/Elimination/EliminationStatsHook";
import { useUser } from "../../Helpers/Hooks/UserHook";

export const EliminationEliminateCard = (props: {
  gameID?: string;
  userID?: string;
}) => {
  const eliminationSelf = useEliminationStats(props.gameID);
  const targetUser = useUser(eliminationSelf?.targetID);
  return (
    <div
      className={`w-full h-full dark:bg-gray-750 bg-gray-100 rounded-lg p-4 flex flex-col gap-4 shadow-md`}
    >
      <div className={`text-xl dark:text-gray-200 font-medium`}>
        Kill {targetUser?.firstName} {targetUser?.lastName}
      </div>
      <span className="text-sm">
        Once you tag {targetUser?.firstName}, click on Eliminate below and scan
        their kill code or manually input it.
      </span>
      <div className={`flex flex-row justify-center w-full`}>
        <button
          className={`w-max px-4 py-1 flex flex-row gap-2 justify-evenly items-center text-primary-500 border-primary-500 border-2 rounded-full hover:bg-primary-500 hover:text-white transition-all`}
        >
          <QrcodeIcon className={`h-4 w-4`} />
          Scan Kill Code
        </button>
      </div>
      <hr className="dark:border-gray-600 "/>
      <div className={`flex flex-row justify-center w-full gap-2`}>
        <input
          className={`w-full h-8 px-2 flex flex-row gap-2 justify-evenly items-center  bg-gray-150 dark:bg-gray-800 shadow-inner rounded-lg transition-all focus:shadow-md focus:bg-gray-50 !outline-none border-0!`}
          type="text"
          placeholder="Enter Kill Code"
        />
        {/* SUbmit button */}
        <button
          className={`w-max px-4 flex flex-row gap-2 justify-evenly items-center text-red-500 border-red-500 border-2 rounded-full hover:bg-red-500 hover:text-white transition-all`}
        >
          Kill
        </button>
      </div>
    </div>
  );
};
export default EliminationEliminateCard;
