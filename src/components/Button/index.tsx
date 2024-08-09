import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined';
  size?: 'xs' | 'base';
}

const baseButtonStyles = 'flex font-light  items-center border ';
const btnSizeStyles = {
  xs: 'text-[13px] px-[15px] py-[7.5px]',
  base: 'text-sm px-6 py-2',
};
const buttonVariants = {
  primary: 'bg-primary text-white border-primary hover:bg-secondary',
  outlined:
    'bg-white text-primary border-primary hover:bg-primary hover:text-white',
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = 'outlined',
  size = 'base',
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        baseButtonStyles,
        className,
        btnSizeStyles[size],
        buttonVariants[variant]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
