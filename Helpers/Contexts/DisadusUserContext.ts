import { User } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import { createContext } from "react";
export const DUserContext = createContext(null as User | null);
export const DUserContextProvider = DUserContext.Provider;
export default DUserContext;
