import { useCommunityMinigames } from "./CMinigameHook";

export const useCurrentCommunityMinigame = (communityID?: string) => {
  const minigames = useCommunityMinigames(communityID);
  if (!minigames) return null;
  const currentMinigame = minigames.find(
    (m) => m.start && m.start < Date.now() && m.end && m.end > Date.now()
  );
  return currentMinigame;
};
