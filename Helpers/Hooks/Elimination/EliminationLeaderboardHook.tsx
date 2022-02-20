import localforage from "localforage";
import { useState, useEffect } from "react";
import APIClient from "../../../Global/APIClient";
import { APIDOMAIN } from "../../constants";
import { MinigameType } from "../../../Types/MinigameTypes";
import {
  EliminationLeaderboardEntry,
  EliminationUserData,
} from "../../../Types/EliminationTypes";
import EliminationToken from "../../../Global/ElimAPIClient";

export const useEliminationLeaderboard = (gameID?: string) => {
  const [leaderboard, setLeaderboard] = useState(
    null as null | EliminationLeaderboardEntry[]
  );
  useEffect(() => {
    if (!gameID) return;
    let cancelled = false;
    localforage
      .getItem(`eliminationLeaderboard-${gameID}`)
      .then(
        (data) =>
          data &&
          !cancelled &&
          setLeaderboard(data as EliminationLeaderboardEntry[])
      );
    EliminationToken.then((token) => {
      fetch(`${APIDOMAIN}/elimination/game/${gameID}/top`, {
        headers: {
          Authorization: token!,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          localforage.setItem(`eliminationLeaderboard-${gameID}`, resp);
          !cancelled && setLeaderboard(resp as EliminationLeaderboardEntry[]);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [gameID]);
  return leaderboard;
};
