import { handleOtherFilter, selectProducts } from '@/store/slices/products/productsSlice';
import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PriceRangeInput: FC = () => {
  const dispatch = useDispatch();
  const { priceRangeFilter, max_price } = useSelector(selectProducts);
  
  const [localPrice, setLocalPrice] = useState(priceRangeFilter);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPrice(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(handleOtherFilter({ key: "priceRangeFilter", value: localPrice }));
    }, 300);

    return () => clearTimeout(timer);
  }, [localPrice, dispatch]);

  console.log("max_price", max_price);
  

  return (
    <>
      <div>
        <label className="block text-sm text-gray-700 font-extralight mb-[18px]">
          Price Range: <span>$0 - ${localPrice}</span>
        </label>
        <input
          type="range"
          id="price-range"
          className="w-full accent-black-75"
          min="0"
          max={max_price}
          value={localPrice}
          onChange={handleSliderChange} // Changed to onChange
        />
      </div>
      <div className="flex justify-between text-sm text-black-75">
        <span id="minPrice">$0</span>
        <span id="maxPrice">${max_price}</span>
      </div>
    </>
  );
};

export default PriceRangeInput;