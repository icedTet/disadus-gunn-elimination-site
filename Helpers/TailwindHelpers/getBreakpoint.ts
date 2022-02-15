import resolveConfig from "tailwindcss/resolveConfig";
import { TailwindConfig } from "tailwindcss/tailwind-config";
import tailwindConfig from "../../tailwind.config"; // Fix the path

const fullConfig = resolveConfig(tailwindConfig as unknown as TailwindConfig);
const getBreakpointValue = (value: string): number =>
  //@ts-expect-error
  parseInt(fullConfig.theme.screens[value].max?.replace("px", ""), 10);

export const getCurrentBreakpoint = (): string => {
  let currentBreakpoint = "";
  let biggestBreakpointValue = 0;
  try {
    for (const breakpoint of Object.keys(fullConfig.theme.screens!)) {
      const breakpointValue = getBreakpointValue(breakpoint);
      if (
        breakpointValue > biggestBreakpointValue &&
        window.innerWidth >= breakpointValue
      ) {
        biggestBreakpointValue = breakpointValue;
        currentBreakpoint = breakpoint;
      }
    }
    return currentBreakpoint;
  } catch (error) {
    return "";
  }
};
export const screenSmallerThan = (breakpoint: string): boolean => {
  try {
    return getBreakpointValue(breakpoint) >= window.innerWidth;
  } catch (error) {
    return false;
  }
};
