import Link from "next/link";
import { APIDOMAIN } from "../../Helpers/constants";
import { MinigameType } from "../../Types/MinigameTypes";

export const GameOverviewCard = (props: { game: MinigameType }) => {
  const { game } = props;
  const joinGame = async () => {
    const response = await fetch(`${APIDOMAIN}/game/${game.id}/join`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    });
    if (response.status === 200) {
    } else {
    }
  };
  return (
    <div
      key={game.id}
      className="w-full px-4 py-3 bg-white rounded-lg shadow-sm dark:bg-gray-750"
    >
      <span className="text-lg font-bold">{game.name}</span>
      <span></span>
      <p className="text-xs whitespace-pre-wrap opacity-50">
        {game.description}
      </p>
      <div className={`flex flex-row justify-end`}>
        {game.participating ? (
          <Link href={`/game/${game.game}/${game.id}`}>
            <span className="btn-primary">Open</span>
          </Link>
        ) : (
          <button onClick={() => joinGame()} className="btn-primary">
            Join
          </button>
        )}
      </div>
    </div>
  );
};
