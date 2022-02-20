import localforage from "localforage";
import { useState, useEffect } from "react";
import APIClient from "../../../Global/APIClient";
import { APIDOMAIN } from "../../constants";
import { MinigameType } from "../../../Types/MinigameTypes";
import { EliminationUserData } from "../../../Types/EliminationTypes";
import { EliminationToken } from "../../../Global/ElimAPIClient";

export const useEliminationStats = (gameID?: string) => {
  const [stats, setStats] = useState(null as null | EliminationUserData);
  useEffect(() => {
    if (!gameID) return;
    let cancelled = false;
    localforage
      .getItem(`eliminationStats-${gameID}`)
      .then(
        (data) => data && !cancelled && setStats(data as EliminationUserData)
      );
    EliminationToken.then((token) => {
      fetch(`${APIDOMAIN}/elimination/game/${gameID}/user/@me`, {
        headers: {
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          localforage.setItem(`eliminationStats-${gameID}`, resp);
          !cancelled && setStats(resp as EliminationUserData);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [gameID]);
  return stats;
};
