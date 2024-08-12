import { useState } from 'react';

const NumberInput = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="relative h-10 w-[131px] border border-[#d7d7d7]">
      <div
        className="absolute flex w-[26px] items-center justify-center left-0 top-0 bottom-0 [z-1] cursor-pointer"
        onClick={() => setValue(value > 1 ? value - 1 : value)}
      >
        <i className="las la-minus text-[10px] text-black-75"></i>
      </div>
      <input
        className="bg-transparent border-0 h-10 w-[131px] px-[26px] text-center text-black-500 text-sm font-extralight"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />
      <div
        className="absolute flex w-[26px] items-center justify-center right-0 top-0 bottom-0 z-[1] cursor-pointer outline-0"
        onClick={() => setValue(value + 1)}
      >
        <i className="las la-plus  text-[10px] text-black-75"></i>
      </div>
    </div>
  );
};

export default NumberInput;
