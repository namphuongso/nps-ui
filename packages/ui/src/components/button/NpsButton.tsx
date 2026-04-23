import { Button } from "antd";
import { twMerge } from "tailwind-merge";
import type { NpsButtonProps } from "./types";

export function NpsButton({ className, rounded, ...props }: NpsButtonProps) {
  return (
    <Button
      className={twMerge(
        rounded === "full" ? "!rounded-full" : undefined,
        className,
      )}
      {...props}
    />
  );
}
