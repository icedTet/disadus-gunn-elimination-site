import { Transition } from "@headlessui/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { EliminationInfoboard } from "../../../components/Elimination/EliminationInfoboard";
import { EliminationKillFeedBase } from "../../../components/Elimination/KillFeed/EliminationKillFeedBase";
import EliminationLeaderboard from "../../../components/Elimination/Leaderboard/EliminationLeaderboardBase";
import { APIDOMAIN } from "../../../Helpers/constants";
import UserContext from "../../../Helpers/Contexts/UserContext";
import { useMinigame } from "../../../Helpers/Hooks/MinigameHook";
import { MinigameType } from "../../../Types/MinigameTypes";
import InferNextPropsType from "infer-next-props-type";
import { EliminationStarted } from "../../../components/Elimination/States/EliminationStarted";
import { EliminationUnStarted } from "../../../components/Elimination/States/EliminationUnStarted";
import LiveEventsListener from "../../../Helpers/Listeners/LiveEventsListener";
export const EliminationPage = (
  props: InferNextPropsType<typeof getServerSideProps>
) => {
  const user = useContext(UserContext);
  const { query } = useRouter();
  const [gameID, setGameID] = useState(props && props.minigame.id);
  const [minigame, setMinigame] = useState(props.minigame);
  useEffect(() => {
    // setup listener for minigame changes
    const listener = (updatedGame: { gameInfo: MinigameType }) => {
      setMinigame(updatedGame.gameInfo);
    };
    LiveEventsListener.addListener("gameStarted", listener);
    return () => {
      LiveEventsListener.removeListener("gameStarted", listener);
    };
  }, [props.minigame.id]);
  if (minigame?.start) return <EliminationStarted game={minigame} />;
  return <EliminationUnStarted game={minigame!} />;
};
export default EliminationPage;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const minigameRequest = await fetch(`${APIDOMAIN}/game/${context.query.id}`);
  if (minigameRequest.status !== 200) return null;
  const minigame = (await minigameRequest.json()) as MinigameType;
  return {
    props: {
      minigame,
    },
  };
}
