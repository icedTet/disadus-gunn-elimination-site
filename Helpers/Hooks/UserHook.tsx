import { PublicUser } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";
import { MinigameUser } from "../../Types/MinigameTypes";
import { APIDOMAIN } from "../constants";

export const useUser = (id?: string) => {
  const [user, setuser] = useState(null as null | MinigameUser);
  useEffect(() => {
    if (!id) return;
    (async () => {
      let cachedUInfo = await localforage.getItem(`user-${id}`);
      if (cachedUInfo) {
        setuser(cachedUInfo as MinigameUser);
        return;
      }
      fetch(`${APIDOMAIN}/users/${id}`).then(async (response) => {
        const resp = await response.json();
        setuser(resp);
        localforage.setItem(`user-${id}`, resp);
      });
    })();
  }, [id]);
  return user;
};
