export type MinigameType = {
  community: string;
  game: string;
  start?: number;
  end?: number;
  id: string;
  name: string;
  participating?: boolean;
  description?: string;
};
export type MinigameUser = {
  userID: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
  createdBy: "Disadus" | "Gunn.One" | "WATT" | "Standalone";
  password: string;
};

export type GameAnnouncement = {
  game: string;
  time: number;
  message: string;
  userID: string;
};
