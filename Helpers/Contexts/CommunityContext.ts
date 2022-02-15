import { Community } from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import { createContext } from "react";

export const CommunityContext = createContext(null as Community | null);
export const CommunityContextProvider = CommunityContext.Provider;
export default CommunityContext;
