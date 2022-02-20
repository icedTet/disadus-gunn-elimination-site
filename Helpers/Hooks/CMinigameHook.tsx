import { User } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";
import { APIDOMAIN } from "../constants";
import { MinigameType } from "../../Types/MinigameTypes";
import EliminationToken from "../../Global/ElimAPIClient";
import LiveEventsListener from "../Listeners/LiveEventsListener";

export const useAllMinigames = () => {
  const [Minigames, setMinigames] = useState(null as null | MinigameType[]);
  useEffect(() => {
    localforage
      .getItem(`Minigames`)
      .then((data) => data && setMinigames(data as MinigameType[]));
    fetch(`${APIDOMAIN}/games`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        const minigames = resp as MinigameType[];
        Promise.all(
          minigames.map(async (m) => {
            const partaking = await fetch(`${APIDOMAIN}/game/${m.id}/joined`, {
              method: "GET",
              headers: {
                Authorization: (await EliminationToken)!,
              },
            });
            if (partaking.status === 200) {
              m.participating = (await partaking.json()).joined as boolean;
            }
            return m;
          })
        ).then((resp) => {
          setMinigames(resp as MinigameType[]);
          localforage.setItem(`Minigames`, resp);
        });
      });
  }, []);
  useEffect(() => {
    const listener = (updatedGame: { gameInfo: MinigameType }) => {
      setMinigames(
        (m) =>
          m?.map((game) => {
            if (game.id !== updatedGame.gameInfo.id) return game;
            return updatedGame.gameInfo;
          }) || null
      );
    };
    LiveEventsListener.addListener("gameUpdated", listener);
    return () => {
      LiveEventsListener.removeListener("gameUpdated", listener);
    };
  }, []);
  return Minigames;
};
