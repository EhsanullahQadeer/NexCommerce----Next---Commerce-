import { FC } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const baseInputStyles =
  'block w-full rounded-full border px-4 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none';

const Input: FC<InputProps> = ({ className, ...props }) => {
  return <input {...props} className={cn(baseInputStyles, className)} />;
};

export default Input;
