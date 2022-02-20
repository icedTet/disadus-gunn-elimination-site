import { createContext } from "react";
import { MinigameUser } from "../../Types/MinigameTypes";

export const UserContext = createContext(null as MinigameUser | null);
export const UserContextProvider = UserContext.Provider;
export default UserContext;
