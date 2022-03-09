import { User } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";
import EliminationToken from "../../Global/ElimAPIClient";
import { MinigameUser } from "../../Types/MinigameTypes";
import { APIDOMAIN } from "../constants";

export const useCurrentUser = () => {
  const [user, setuser] = useState(null as null | MinigameUser);
  useEffect(() => {
    localforage.getItem("currentUser").then(
      (data) =>
        data &&
        setuser(
          (
            data as {
              resp: MinigameUser;
              time: number;
            }
          ).resp as MinigameUser
        )
    );
    EliminationToken.then(async (etoken) => {
      const cachedSelf = (await localforage.getItem("currentUser")) as {
        resp: MinigameUser;
        time: number;
      };
      if (cachedSelf && cachedSelf.time > Date.now() - 1000 * 30) {
        setuser(cachedSelf.resp);
        return;
      }
      fetch(`${APIDOMAIN}/users/@me`, {
        method: "GET",
        headers: {
          Authorization: etoken!,
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.status !== 200) return;
        const resp = await response.json();
        setuser(resp as MinigameUser);
        localforage.setItem("currentUser", { resp, time: Date.now() });
      });
    });
  }, []);
  return user;
};
