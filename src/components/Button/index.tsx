import { cn } from '@/lib/utils';
import { FC } from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const baseButtonStyles =
  'flex font-light max-w-[198px] bg-white text-primary px-6 py-2 items-center border border-primary hover:bg-primary hover:text-white';

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={cn(baseButtonStyles, className)}>
      {children}
    </button>
  );
};

export default Button;
