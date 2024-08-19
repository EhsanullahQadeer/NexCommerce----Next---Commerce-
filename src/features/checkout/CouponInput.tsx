'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const CouponInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setisFocused] = useState(false);
  return (
    <div className="mt-10">
      <div className="group relative max-w-[340px]">
        <input
          ref={inputRef}
          type="text"
          className="w-full h-10 py-2 px-[11px] border border-dashed border-[#d7d7d7] rounded-[3px] !outline-none focus:border-primary"
          onBlur={() => setisFocused(false)}
        />
        <label
          className={cn(
            'absolute inline-block py-2.5 top-0 left-0 bottom-0 h-full leading-[40px] w-full text-sm overflow-hidden text-nowrap text-ellipsis px-[11px] transition-all duration-[0.35s]',
            isFocused && 'opacity-0'
          )}
          onClick={() => {
            setisFocused(true);
            inputRef?.current?.focus();
          }}
        >
          Have a coupon?{' '}
          <span className="text-primary">Click here to enter your code</span>
        </label>
      </div>
    </div>
  );
};

export default CouponInput;
