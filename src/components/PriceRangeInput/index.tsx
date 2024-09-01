import { handleOtherFilter, selectProducts } from '@/store/slices/products/productsSlice';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PriceRangeInput: FC = () => {
  const dispatch = useDispatch();
  const { priceRangeFilter } = useSelector(selectProducts);

  return (
    <>
      <div>
        <label className="block text-sm text-gray-700 font-extralight mb-[18px]">
          Price Range: <span>$0 - ${priceRangeFilter}</span>
        </label>
        <input
          type="range"
          id="price-range"
          className="w-full accent-black-75"
          min="0"
          max="5000"
          value={priceRangeFilter}
          onInput={(e: any) => dispatch(handleOtherFilter({key: "priceRangeFilter", value: e.target.value}))}
        />
      </div>
      <div className="flex justify-between text-sm text-black-75">
        <span id="minPrice">$0</span>
        <span id="maxPrice">$5000</span>
      </div>
    </>
  );
};

export default PriceRangeInput;
