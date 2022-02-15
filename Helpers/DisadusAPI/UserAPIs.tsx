import { DisadusLMSTypes, DisadusTypes } from "@Disadus/disadus-plugin-api";
import { DISADUSAPI } from "../constants";

export const getDisadusUser = (token: string) =>
  fetch(`${DISADUSAPI}/users/@me`, {
    headers: {
      Authorization: token,
    },
  }).then((response) =>
    response.status === 200 ? response.json() : null
  ) as Promise<DisadusTypes.PublicUser | null>;

export const getDisadusLMS = (token: string) =>
  fetch(`${DISADUSAPI}/community/gunnSandbox/lms/@me`, {
    headers: {
      Authorization: token,
    },
  }).then((response) =>
    response.status === 200 ? response.json() : null
  ) as Promise<DisadusLMSTypes.LMSLinkedUser | null>;
