import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined'  | 'white' | 'disabled';
  size?: 'xs' | 'base';
}

const baseButtonStyles = 'flex font-light  items-center border transition-all duration-[0.35s] ease';
const btnSizeStyles = {
  xs: 'text-[13px] px-[15px] py-[7.5px]',
  base: 'text-sm px-6 py-2',
};
const buttonVariants = {
  primary: 'bg-primary text-white border-primary hover:bg-secondary',
  outlined:
    'bg-transparent text-primary border-primary hover:bg-primary hover:text-white',
  white: 'border-none bg-white text-black-100 hover:bg-primary hover:text-white',
  disabled: 'bg-[#fafafa] text-black-600 border-primary pointer-events-none border-[#ebebeb]'
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
