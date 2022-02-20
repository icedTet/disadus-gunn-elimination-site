import APIWrapper from "@Disadus/disadus-plugin-api";
import APIClient from "./APIClient";
let predefinedToken = "";
export const waitForElimToken = async () => {
  if (predefinedToken) return predefinedToken;
  try {
    const token = await APIClient?.waitForToken();
    if (!token) throw new Error("No token");
    const tokenData = await fetch(`/api/signLoginToken`, {
      headers: {
        Authorization: `Plugin ${token.token}`,
        "Content-Type": "application/json",
      },
    });
    if (tokenData.status !== 200) throw new Error("Invalid token");
    const tokenDataJSON = await tokenData.json();
    if (tokenDataJSON.error) throw new Error(tokenDataJSON.error);
    predefinedToken = tokenDataJSON.token;
    return `Bearer ${tokenDataJSON.token}` as string;
  } catch (error) {
    return;
  }
};
export const EliminationToken = waitForElimToken();

export default EliminationToken;
