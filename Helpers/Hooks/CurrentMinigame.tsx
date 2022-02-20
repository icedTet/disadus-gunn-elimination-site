import { useAllMinigames } from "./CMinigameHook";

export const useCurrentCommunityMinigame = () => {
  const minigames = useAllMinigames();
  if (!minigames) return null;
  const currentMinigame = minigames.find(
    (m) => m.start && m.start < Date.now() && m.end && m.end > Date.now()
  );
  return currentMinigame;
};
