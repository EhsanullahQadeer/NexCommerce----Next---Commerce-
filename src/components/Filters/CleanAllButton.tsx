import { FC } from "react";
import { cn } from "@/lib/utils";
const clearButtonStyles =
  'inline-flex items-center text-primary font-extralight min-h-[33px] text-base cursor-pointer transition-all duration-[0.6s] ease-in-out';


interface CleanAllButtonProps {
  className?: string;
  onClick?: () => void;
}

const CleanAllButton: FC<CleanAllButtonProps> = ({ className, onClick }) => {
  return (
    <button
      className={cn(
        clearButtonStyles,
        className
      )}
      onClick={onClick}
    >
      Clean All
    </button>
  );
};

export default CleanAllButton;
