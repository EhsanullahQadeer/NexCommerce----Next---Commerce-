import { FC } from "react";
import { cn } from "@/lib/utils";

interface CheckedIconProps {
  className?: string;
}
const CheckedIcon: FC<CheckedIconProps> = ({
  className
}) => {
  return (
    <svg
      className={cn("stroke-white outline-none", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
}

export default CheckedIcon;
