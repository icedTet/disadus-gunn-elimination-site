import { User } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";
import { APIDOMAIN } from "../constants";
import { MinigameType } from "../../Types/MinigameTypes";
import EliminationToken from "../../Global/ElimAPIClient";

export const useMinigame = (gameID?: string) => {
  const [Minigame, setMinigame] = useState(null as null | MinigameType);
  useEffect(() => {
    if (!gameID) return;
    localforage
      .getItem(`minigame-${gameID}`)
      .then((data) => data && setMinigame(data as MinigameType));
    fetch(`${APIDOMAIN}/game/${gameID}`).then(async (minigame) => {
      if (minigame.status === 200) {
        const mgame = (await minigame.json()) as MinigameType;
        const partaking = await fetch(`${APIDOMAIN}/game/${gameID}/joined`, {
          method: "GET",
          headers: {
            Authorization: await EliminationToken,
          },
        });
        if (partaking.status === 200) {
          mgame.participating = true;
        }
        setMinigame(mgame);
        localforage.setItem(`minigame-${gameID}`, mgame);
      }
    });
  }, [gameID]);
  return Minigame;
};
