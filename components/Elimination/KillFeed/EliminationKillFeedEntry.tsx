import dayjs from "dayjs";
import { useUser } from "../../../Helpers/Hooks/UserHook";
import { EliminationKillFeed } from "../../../Types/EliminationTypes";
import { MonogramPFP } from "../../Monogram";
const Killtypes = {
  kill: "Eliminated",
};
export const EliminationKillFeedEntry = (props: {
  killItem: EliminationKillFeed;
  index: number;
}) => {
  const { killItem } = props;
  const target = useUser(killItem.target);
  const user = useUser(killItem.entity);
  return (
    <div className={`w-full px-4 py-2`}>
      <div
        className={`w-full bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg flex flex-row gap-4 px-6 py-4 items-center md:mb-6`}
      >
        <MonogramPFP
          user={target}
          className={`w-16 h-16 rounded-full flex-shrink-0 drop-shadow`}
        />
        <div className={`flex flex-col gap-1`}>
          <span className={`text-xl font-medium`}>
            {target?.firstName} {target?.lastName}
          </span>
          <span className={`text-sm text-primary-500`}>@{target?.userID}</span>
          <span className={`text-sm italic text-gray-500`}>
            Eliminated by {user?.firstName} {user?.lastName} (@{user?.userID})
            on {dayjs(killItem.at).format("MMM D, YYYY")} at{" "}
            {dayjs(killItem.at).format("h:mm A")}
          </span>
        </div>
      </div>
    </div>
  );
};
