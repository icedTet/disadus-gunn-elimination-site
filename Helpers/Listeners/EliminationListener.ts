import { EventEmitter } from "events";
import localforage from "localforage";
import { io } from "socket.io-client";
import {
  EliminationKillFeed,
  EliminationLeaderboardEntry,
  EliminationUserData,
} from "../../Types/EliminationTypes";
import { APIDOMAIN } from "../constants";
import { EliminationEvent, EliminationSelfUpdate } from "./EventsTypes";
import LiveEventsListener from "./LiveEventsListener";

export class EliminationListener extends EventEmitter {
  static self: EliminationListener;
  static getInstance() {
    if (!EliminationListener.self) {
      EliminationListener.self = new EliminationListener();
    }
    return EliminationListener.self;
  }
  constructor() {
    super();
    LiveEventsListener.on("eliminationKill", this.handleElimination.bind(this));
    LiveEventsListener.on(
      "eliminationUpdateSelf",
      this.handleEliminationUpdate.bind(this)
    );
  }
  async handleElimination(data: EliminationEvent) {
    const { kill, game, user, target } = data;
    console.log("[EliminationListener]", data);
    //update the kill feed
    await Promise.all([
      localforage
        .getItem(`eliminationKillFeed-${game.id}`)
        .then((killFeedCached) => {
          const killFeed = (killFeedCached || []) as EliminationKillFeed[];
          const killfeedMap = new Map(
            killFeed
              .concat(kill)
              .map((kill) => [`${kill.at}${kill.entity}${kill.target}`, kill])
          );
          localforage.setItem(
            `eliminationKillFeed-${game.id}`,
            Array.from(killfeedMap.values()).sort((a, b) => b.at - a.at)
          );
        }),
      //update the leaderboard
      localforage
        .getItem(`eliminationLeaderboard-${game.id}`)
        .then((leaderboardCached) => {
          const leaderboard = (leaderboardCached ||
            []) as EliminationLeaderboardEntry[];
          const leaderboardMap = new Map(
            leaderboard.concat(user).map((user) => [user.userID, user])
          );
          localforage.setItem(
            `eliminationLeaderboard-${game.id}`,
            Array.from(leaderboardMap.values()).sort(
              (a, b) => b.kills - a.kills
            )
          );
        }),
      //update user data as necessary
      localforage
        .getItem(`eliminationUserData-${game.id}-${user.userID}`)
        .then((userDataCached) => {
          localforage.setItem(`eliminationUserData-${game.id}-${user.userID}`, {
            ...((userDataCached as Partial<EliminationUserData>) || {}),
            user,
          });
        }),
      //update target data as necessary
      localforage
        .getItem(`eliminationUserData-${game.id}-${target.userID}`)
        .then((userDataCached) => {
          localforage.setItem(
            `eliminationUserData-${game.id}-${target.userID}`,
            {
              ...((userDataCached as Partial<EliminationUserData>) || {}),
              target,
            }
          );
        }),
    ]);
    this.emit("elimination", data);
  }
  async handleEliminationUpdate(data: EliminationSelfUpdate) {
    const { user, game } = data;
    console.log("[EliminationListener]", data);
    //update user data as necessary
    await localforage
      .getItem(`eliminationUserData-${game.id}-${user.userID}`)
      .then((userDataCached) => {
        localforage.setItem(
          `eliminationStats-${game.id}-${user.userID}`,
          user
        );
      });

    this.emit("eliminationUpdateSelf", data);
  }
}
