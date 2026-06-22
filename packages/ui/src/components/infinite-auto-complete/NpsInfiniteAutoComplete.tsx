import { twMerge } from "tailwind-merge";
import type { NpsInfiniteAutoCompleteProps } from "./types";

export function NpsInfiniteAutoComplete({
  className,
  children,
  ...props
}: NpsInfiniteAutoCompleteProps) {
  return (
    <div
      className={twMerge("nps-infinite-auto-complete", className)}
      {...props}
    >
      {children || "NpsInfiniteAutoComplete Component"}
    </div>
  );
}
