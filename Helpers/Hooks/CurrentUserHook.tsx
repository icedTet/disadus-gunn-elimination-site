import { User } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";

export const useCurrentUser = () => {
  const [user, setuser] = useState(null as null | User);
  useEffect(() => {
    localforage
      .getItem("currentUser")
      .then((data) => data && setuser(data as User));
    APIClient!.getSelf().then((response) => {
      setuser(response);
      localforage.setItem("currentUser", response);
    });
  }, []);
  return user;
};
