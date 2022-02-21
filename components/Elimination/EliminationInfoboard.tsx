import { MinigameType } from "../../Types/MinigameTypes";
import { EliminationInfoCard } from "./EliminationInfoCard";
import { EliminationStats } from "./EliminationStats";
import { EliminationTarget } from "./EliminationTarget";
import EliminationEliminateCard from "./EliminiationEliminateCard";

export const EliminationInfoboard = (props: { game?: MinigameType }) => {
  const { game } = props;
  return (
    <div
      className={`2xl:flex 2xl:flex-col grid grid-cols-2 justify-evenly gap-8 w-full items-center flex-nowrap md:p-8 md:py-12`}
    >
      <EliminationTarget gameID={game?.id} />
      <EliminationEliminateCard gameID={game?.id} />
      <EliminationStats gameID={game?.id} />
      <EliminationInfoCard gameID={game?.id} />
    </div>
  );
};
