import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { GamesSidebar } from "../components/Sidebar";
import { UserContextProvider } from "../Helpers/Contexts/UserContext";
import { useCurrentUser } from "../Helpers/Hooks/CurrentUserHook";

function MyApp({ Component, pageProps }: AppProps) {
  const currentUser = useCurrentUser();
  return (
    <div
      className={`${currentUser?.theme && `dark`} w-full h-full relative`}
      id="themeContainer"
    >
      <div
        className={`dark:text-white w-full h-full flex flex-row dark:bg-gray-850 bg-gray-150`}
      >
        <UserContextProvider value={currentUser}>
          <GamesSidebar />
            <div
              className={`flex flex-grow break-words whitespace-pre-wrap relative`}
            >
              <div className={`w-full h-full absolute top-0 left-0`}>
                <Component {...pageProps} />
              </div>
            </div>
        </UserContextProvider>
      </div>
    </div>
  );
}

export default MyApp;
