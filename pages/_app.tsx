import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { GamesSidebar } from "../components/Sidebar";
import { UserContextProvider } from "../Helpers/Contexts/UserContext";
import { useCurrentUser } from "../Helpers/Hooks/CurrentUserHook";
import { useCurrentDisadusUser } from "../Helpers/Hooks/CurrentDisadusUserHook";
import { DUserContextProvider } from "../Helpers/Contexts/DisadusUserContext";
import { useCommunity } from "../Helpers/Hooks/CommunityHook";
import { CommunityContextProvider } from "../Helpers/Contexts/CommunityContext";
import LiveEventsListener from "../Helpers/Listeners/LiveEventsListener";

function MyApp({ Component, pageProps }: AppProps) {
  LiveEventsListener;
  const currentUser = useCurrentUser();
  const currentDisadusUser = useCurrentDisadusUser();
  const currentCommunity = useCommunity(currentDisadusUser?.primaryCommunity);
  if (!currentUser) return null;
  return (
    <div
      className={`${
        currentDisadusUser?.theme && `dark`
      } w-full h-full relative`}
      id="themeContainer"
    >
      <div
        className={`dark:text-white w-full h-full flex flex-row dark:bg-gray-850 bg-gray-150`}
      >
        <UserContextProvider value={currentUser}>
          <DUserContextProvider value={currentDisadusUser}>
            <CommunityContextProvider value={currentCommunity}>
              <GamesSidebar />
              <div
                className={`flex flex-grow break-words whitespace-pre-wrap relative`}
              >
                <div className={`w-full h-full absolute top-0 left-0`}>
                  <Component {...pageProps} />
                </div>
              </div>
            </CommunityContextProvider>
          </DUserContextProvider>
        </UserContextProvider>
      </div>
    </div>
  );
}

export default MyApp;
