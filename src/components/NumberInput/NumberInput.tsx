'use client';

import { cn } from '@/lib/utils';
import { FC, useEffect, useState } from 'react';

interface NumberInputProps {
  className?: string;
  value?: number;
  inputClass?: string;
}

const NumberInput: FC<NumberInputProps> = ({
  className,
  value,
  inputClass,
}) => {
  const [inputValue, setValue] = useState(1);

  useEffect(() => {
    value && setValue(value);
  }, [value]);

  return (
    <div
      className={cn(
        'relative h-10 w-[131px] border border-[#d7d7d7]',
        className
      )}
    >
      <div
        className="absolute flex w-[26px] items-center justify-center left-0 top-0 bottom-0 [z-1] cursor-pointer"
        onClick={() => setValue(inputValue > 1 ? inputValue - 1 : inputValue)}
      >
        <i className="las la-minus text-[10px] text-black-75"></i>
      </div>
      <input
        className={cn(
          'bg-transparent border-0 h-10 w-[131px] px-[26px] text-center text-black-500 text-sm font-extralight !outline-none',
          inputClass
        )}
        value={inputValue}
        onChange={(e: any) => setValue(e.target.value)}
      />
      <div
        className="absolute flex w-[26px] items-center justify-center right-0 top-0 bottom-0 z-[1] cursor-pointer outline-0"
        onClick={() => setValue(inputValue + 1)}
      >
        <i className="las la-plus  text-[10px] text-black-75"></i>
      </div>
    </div>
  );
};

export default NumberInput;
