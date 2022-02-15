import { User } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";
import { APIDOMAIN } from "../constants";
import { MinigameType } from "../../Types/MinigameTypes";

export const useCommunityMinigames = (communityID?: string) => {
  const [communityMinigames, setCommunityMinigames] = useState(
    null as null | MinigameType[]
  );
  useEffect(() => {
    if (!communityID) return;
    localforage
      .getItem(`communityMinigames-${communityID}`)
      .then((data) => data && setCommunityMinigames(data as MinigameType[]));
    fetch(`${APIDOMAIN}/community/${communityID}/games`)
      .then((resp) => resp.json())
      .then((resp) => {
        const minigames = resp as MinigameType[];
        Promise.all(
          minigames.map(async (m) => {
            const partaking = await fetch(
              `${APIDOMAIN}/game/${m.id}/participants/self`,
              {
                method: "GET",
                headers: {
                  Authorization: `Plugin ${await (
                    await APIClient!.waitForToken()
                  ).token}`,
                },
              }
            );
            if (partaking.status === 200) {
              m.participating = true;
            }
            return m;
          })
        ).then((resp) => {
          setCommunityMinigames(resp as MinigameType[]);
          localforage.setItem(`communityMinigames-${communityID}`, resp);
        });
      });
  }, [communityID]);
  return communityMinigames;
};
