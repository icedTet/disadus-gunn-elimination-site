import {
  EliminationKillFeed,
  EliminationUserData,
} from "../../Types/EliminationTypes";
import { MinigameType } from "../../Types/MinigameTypes";

export type EliminationEvent = {
  kill: EliminationKillFeed;
  game: MinigameType;
  user: {
    userID: string;
    kills: number;
  };
  target: {
    userID: string;
    kills: number;
    eliminated: boolean;
  };
};
export type EliminationSelfUpdate = {
  user: EliminationUserData;
  game: MinigameType;
};
