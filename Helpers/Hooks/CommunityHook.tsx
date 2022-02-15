import {
  Community,
  User,
} from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";

export const useCommunity = (communityID?: string) => {
  const [community, setCommunity] = useState(null as null | Community);
  useEffect(() => {
    if (!communityID) return setCommunity(null);
    localforage
      .getItem(`community-${communityID}`)
      .then((data) => data && setCommunity(data as Community));
    APIClient!.getCommunity(communityID).then((response) => {
      setCommunity(response);
      localforage.setItem(`community-${communityID}`, response);
    });
  }, [communityID]);
  return community;
};
