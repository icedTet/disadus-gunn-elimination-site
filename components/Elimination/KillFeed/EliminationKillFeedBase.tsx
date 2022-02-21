import { useRef } from "react";
import { useVirtual } from "react-virtual";
import { useEliminationKillFeed } from "../../../Helpers/Hooks/Elimination/EliminationKillFeedHook";
import { EliminationKillFeedEntry } from "./EliminationKillFeedEntry";

export const EliminationKillFeedBase = (props: { gameID?: string }) => {
  const { killfeed, fetchMore } = useEliminationKillFeed(props.gameID);
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: killfeed?.length ?? 0,
    parentRef,
    overscan: 2,
  });
  return (
    <div className={`relative h-128 w-full flex-shrink-0 md:h-full`}>
      <div
        className={`w-full h-full top-0 left-0 absolute overflow-y-auto scrollbar-none rounded-lg bg-gray-100 dark:bg-gray-750 p-4 md:rounded-none md:!bg-transparent md:pt-12`}
        ref={parentRef}
      >
        <div
          className={`relative w-full `}
          style={{
            height: `${rowVirtualizer.totalSize}px`,
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <div
              ref={virtualRow.measureRef}
              key={`${killfeed![virtualRow.index].at}${
                killfeed![virtualRow.index].entity
              }${killfeed![virtualRow.index].target}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                // height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <EliminationKillFeedEntry
                killItem={killfeed![virtualRow.index]}
                index={virtualRow.index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
