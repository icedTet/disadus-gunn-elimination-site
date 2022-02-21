import {
  DotsHorizontalIcon,
  HomeIcon,
  NewspaperIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { BiTrophy } from "react-icons/bi";
import { EliminationBBIconButton } from "./EliminationBBIconButton";

export const EliminationBottomBar = (props: {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
}) => {
  const router = useRouter();
  return (
    <div
      className={`h-16 w-full dark:bg-gray-900 flex flex-row gap-1 justify-evenly`}
    >
      <EliminationBBIconButton
        onClick={() => {
          props.setCurrentTab(0);
        }}
        icon={HomeIcon}
        selected={props.currentTab === 0}
      />
      <EliminationBBIconButton
        onClick={() => {
          props.setCurrentTab(1);
        }}
        icon={BiTrophy}
        selected={props.currentTab === 1}
      />
      <EliminationBBIconButton
        onClick={() => {
          props.setCurrentTab(2);
        }}
        icon={NewspaperIcon}
        selected={props.currentTab === 2}
      />
      <EliminationBBIconButton
        onClick={() => {
          router.push("/");
        }}
        icon={DotsHorizontalIcon}
        selected={false}
      />
    </div>
  );
};
