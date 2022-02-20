import { PublicUser } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../../Global/APIClient";
import EliminationToken from "../../../Global/ElimAPIClient";
import { EliminationUserData } from "../../../Types/EliminationTypes";
import { APIDOMAIN } from "../../constants";
import { EliminationListener } from "../../Listeners/EliminationListener";
import {
  EliminationEvent,
  EliminationSelfUpdate,
} from "../../Listeners/EventsTypes";

export const useEliminationUserData = (gameID?: string, id?: string) => {
  const [user, setuser] = useState(null as null | Partial<EliminationUserData>);
  useEffect(() => {
    if (!id || !gameID) return;
    localforage
      .getItem(`eliminationUserData-${gameID}-${id}`)
      .then((data) => data && setuser(data as Partial<EliminationUserData>));
    EliminationToken.then((token) =>
      fetch(`${APIDOMAIN}/elimination/game/${gameID}/user/${id}`, {
        headers: {
          Authorization: token!,
        },
      })
        .then((resp) => resp.json())
        .then((response) => {
          setuser(response);
          localforage.setItem(`eliminationUserData-${gameID}-${id}`, response);
        })
    );
  }, [id, gameID]);

  useEffect(() => {
    const onUserUpdate = (data: EliminationSelfUpdate) => {
      if (data.user.userID !== id) return;
      setuser({
        ...user,
        ...data.user,
      });
    };
    EliminationListener.getInstance().on("eliminationUpdateSelf", onUserUpdate);
    return () => {
      EliminationListener.getInstance().removeListener(
        "elimination",
        onUserUpdate
      );
    };
  }, [id, gameID]);

  return user;
};
