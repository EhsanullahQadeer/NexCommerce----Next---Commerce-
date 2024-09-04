import { handleOtherFilter, selectProducts } from '@/store/slices/products/productsSlice';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PriceRangeInput: FC = () => {
  const dispatch = useDispatch();
  const { priceRangeFilter, max_price } = useSelector(selectProducts);
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleOtherFilter({ key: "priceRangeFilter", value: e.target.value }));
  };

  return (
    <>
      <div>
        <label className="block text-sm text-gray-700 font-extralight mb-[18px]">
          Price Range: <span>$0 - ${max_price}</span>
        </label>
        <input
          type="range"
          id="price-range"
          className="w-full accent-black-75"
          min="0"
          max={max_price}
          value={priceRangeFilter}
          onChange={handleSliderChange}
        />
      </div>
      <div className="flex justify-between text-sm text-black-75">
        <span id="minPrice">$0</span>
        <span id="maxPrice">${priceRangeFilter}</span>
      </div>
    </>
  );
};

export default PriceRangeInput;