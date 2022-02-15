import { PublicUser } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";
import { APIDOMAIN } from "../constants";

export const useUser = (id?: string) => {
  const [user, setuser] = useState(null as null | PublicUser);
  useEffect(() => {
    if (!id) return;
    localforage
      .getItem(`user-${id}`)
      .then((data) => data && setuser(data as PublicUser));
    fetch(`${APIDOMAIN}/users/${id}`);
    APIClient!.getUser(id).then((response) => {
      setuser(response);
      localforage.setItem(`user-${id}`, response);
    });
  }, [id]);
  return user;
};
