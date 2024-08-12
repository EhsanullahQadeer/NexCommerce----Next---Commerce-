import { FC, useState } from 'react';

const PriceRangeInput: FC = () => {
  const [price, setPrice] = useState(0);
  return (
    <>
      <div>
        <label className="block text-sm text-gray-700 font-extralight mb-[18px]">
          Price Range: <span>$0 - $750</span>
        </label>
        <input
          type="range"
          id="price-range"
          className="w-full accent-black-75"
          min="0"
          max="750"
          value={price}
          onInput={(e: any) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex justify-between text-sm text-black-75">
        <span id="minPrice">$0</span>
        <span id="maxPrice">$750</span>
      </div>
    </>
  );
};

export default PriceRangeInput;
