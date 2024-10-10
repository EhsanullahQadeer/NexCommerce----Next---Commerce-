import { FC } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "search" | "text";
  label?: string;
  rows?: string;
  isFullWidth?: boolean;
  error?: string; 
}

const baseInputStyles =
  "block w-full border border-black-300 px-4 py-1.5 text-sm leading-6 focus:bg-white focus:border-primary outline-none transition-all duration-[0.35s]";

const labelStyles =
  "inline-block text-sm text-black-100 font-extralight mb-1 leading-[26.04px]";

const errorTextStyles =
  "text-xs text-red-600 mt-1"; 

const inputVariants = {
  text: "h-10 px-5 text-black-100 font-extralight bg-[#fafafa] border border-black-300",
  search: "text-gray-900 shadow-sm placeholder:text-gray-400 rounded-full",
};

const Input: FC<InputProps> = ({
  className,
  variant = "text",
  label,
  isFullWidth = false,
  error,
  ...props
}) => {
  const renderLabel = label && <label className={labelStyles}>{label}</label>;
  const renderError = error && <span className={errorTextStyles}>{error}</span>;

  return (
    <div className={cn(isFullWidth && "w-full")}>
      {renderLabel}
      <input
        {...props}
        className={cn(
          baseInputStyles,
          className,
          inputVariants[variant],
          error && "border-red-500" 
        )}
      />
      {renderError} 
    </div>
  );
};

export default Input;
