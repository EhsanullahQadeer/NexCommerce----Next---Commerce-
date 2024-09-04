'use client';

import { cn } from '@/lib/utils';
import { FC } from 'react';

interface NumberInputProps {
  className?: string;
  value?: number;
  inputClass?: string;
  onChange?: (type: string) => void;
}

const NumberInput: FC<NumberInputProps> = ({
  className,
  value,
  inputClass,
  onChange
}) => {

  return (
    <div
      className={cn(
        'relative h-10 w-[131px] border border-[#d7d7d7]',
        className
      )}
    >
      <button
        className="absolute flex w-[26px] items-center justify-center left-0 top-0 bottom-0 [z-1] cursor-pointer"
        onClick={() => onChange && onChange("decrement")}
      >
        <i className="las la-minus text-[10px] text-black-75"></i>
      </button>
      <input
        className={cn(
          'bg-transparent border-0 h-10 w-[131px] px-[26px] text-center text-black-500 text-sm font-extralight !outline-none',
          inputClass
        )}
        value={value || 0}
        readOnly
      />
      <button
        className="absolute flex w-[26px] items-center justify-center right-0 top-0 bottom-0 z-[1] cursor-pointer outline-0"
        onClick={() => onChange && onChange("increment")}
      >
        <i className="las la-plus  text-[10px] text-black-75"></i>
      </button>
    </div>
  );
};

export default NumberInput;
