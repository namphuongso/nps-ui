import { Button, type ButtonProps } from "antd";
import { twMerge } from "tailwind-merge";

export interface NpsButtonProps extends ButtonProps {
  rounded?: "full";
}

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
