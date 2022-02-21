import Link from "next/link";
import { ComponentProps } from "react";

export const EliminationBBIconButton = (props: {
  onClick: () => void;
  icon: (props: ComponentProps<"svg">) => JSX.Element;
  text?: string;
  selected?: boolean;
}) => (
  <span
    className={`flex flex-row items-center ${
      props.selected && `text-red-500`
    } cursor-pointer rounded-lg dark:hover:bg-gray-700/20 px-4 transition-all`}
    onClick={props.onClick}
  >
    {props.icon({ className: `w-6 h-6` })}
    {props.text && <span className={`ml-2 text-sm`}>{props.text}</span>}
  </span>
);
