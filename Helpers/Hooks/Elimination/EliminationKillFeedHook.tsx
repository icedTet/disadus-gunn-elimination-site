import localforage from "localforage";
import { useState, useEffect } from "react";
import APIClient from "../../../Global/APIClient";
import { APIDOMAIN } from "../../constants";
import { MinigameType } from "../../../Types/MinigameTypes";
import { EliminationKillFeed } from "../../../Types/EliminationTypes";
import { EliminationEvent } from "../../Listeners/EventsTypes";
import { EliminationListener } from "../../Listeners/EliminationListener";

export const useEliminationKillFeed = (gameID?: string) => {
  const [killfeed, setKillFeed] = useState(
    null as null | EliminationKillFeed[]
  );

  useEffect(() => {
    if (!gameID) return;
    let cancelled = false;
    localforage
      .getItem(`eliminationKillFeed-${gameID}`)
      .then(
        (data) =>
          data && !cancelled && setKillFeed(data as EliminationKillFeed[])
      );
    APIClient!.waitForToken().then((token) => {
      fetch(`${APIDOMAIN}/elimination/game/${gameID}/kills`, {
        headers: {
          Authorization: token.token,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          localforage.setItem(`eliminationKillFeed-${gameID}`, resp);
          const killfeedChunk = resp as EliminationKillFeed[];
          !cancelled &&
            setKillFeed((currentKillFeed) => {
              if (!currentKillFeed) {
                return killfeedChunk;
              }
              const killfeedMap = new Map(
                currentKillFeed
                  .concat(...killfeedChunk)
                  .map((kill) => [
                    `${kill.at}${kill.entity}${kill.target}`,
                    kill,
                  ])
              );
              return Array.from(killfeedMap.values()).sort(
                (a, b) => b.at - a.at
              );
            });
        });
    });
    return () => {
      cancelled = true;
    };
  }, [gameID]);
  useEffect(() => {
    const onEliminate = (data: EliminationEvent) => {
      setKillFeed((currentKillFeed) => {
        if (!currentKillFeed) {
          return [data.kill];
        }
        const killfeedMap = new Map(
          currentKillFeed
            .concat(...[data.kill])
            .map((kill) => [`${kill.at}${kill.entity}${kill.target}`, kill])
        );
        return Array.from(killfeedMap.values()).sort((a, b) => b.at - a.at);
      });
    };
    EliminationListener.getInstance().on("elimination", onEliminate);
    return () => {
      EliminationListener.getInstance().off("elimination", onEliminate);
    };
  }, [gameID]);
  const fetchMore = async (limit: number, before: number) => {
    APIClient!.waitForToken().then((token) => {
      fetch(
        `${APIDOMAIN}/elimination/game/${gameID}/kills?limit=${limit}&before=${before}`,
        {
          headers: {
            Authorization: token.token,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          const killfeedChunk = resp as EliminationKillFeed[];
          setKillFeed((currentKillFeed) => {
            if (!currentKillFeed) {
              return killfeedChunk;
            }
            const killfeedMap = new Map(
              currentKillFeed
                .concat(...killfeedChunk)
                .map((kill) => [`${kill.at}${kill.entity}${kill.target}`, kill])
            );
            return Array.from(killfeedMap.values()).sort((a, b) => b.at - a.at);
          });
        });
    });
  };
  return { killfeed, fetchMore };
};
