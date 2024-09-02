'use client';

import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';

interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  value?: string;
  checked?: boolean;
}

const Radio: FC<RadioProps> = ({ label, className, name, ...props }) => {
  return (
    <label
      className={cn(
        'text-sm font-light text-black-75 cursor-pointer',
        className
      )}
    >
      <input type="radio" className="mr-2.5" name={name} {...props} readOnly />
      {label}
    </label>
  );
};

export default Radio;
