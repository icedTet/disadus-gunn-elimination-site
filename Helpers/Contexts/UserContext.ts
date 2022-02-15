import { User } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import { createContext } from "react";

export const UserContext = createContext(null as User | null);
export const UserContextProvider = UserContext.Provider;
export default UserContext;
