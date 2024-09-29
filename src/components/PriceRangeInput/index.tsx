import useCurrency from "@/hooks/useCurrency";
import useDebounce from "@/hooks/useDebounce";
import {
  handleOtherFilter,
  selectProducts,
} from "@/store/slices/products/productsSlice";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PriceRangeInput: FC = () => {
  const dispatch = useDispatch();
  const { priceRangeFilter, max_price } = useSelector(selectProducts);
  const [maxRange, setMaxRange] = useState<number>(max_price);
  const [priceRange, setPriceRange] = useState<number>(
    Number(priceRangeFilter)
  );
  const { formatPrice } = useCurrency();
  const priceRangeToucedRef = useRef<boolean>(false);
  const debouncedPriceRange = useDebounce(priceRange, 300);

  useEffect(() => {
    if (Number(priceRangeFilter) !== debouncedPriceRange) {
      priceRangeToucedRef.current = true;
      dispatch(
        handleOtherFilter({
          key: "priceRangeFilter",
          value: debouncedPriceRange,
        })
      );
    }
  }, [debouncedPriceRange]);

  useEffect(() => {
    if (
      Number(priceRangeFilter) !== Number(max_price) &&
      !priceRangeToucedRef.current
    ) {
      setPriceRange(Number(max_price));
      setMaxRange(Number(max_price));
      dispatch(
        handleOtherFilter({ key: "priceRangeFilter", value: Number(max_price) })
      );
    }
  }, [max_price]);
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
  };

  return (
    <>
      <div>
        <label className="block text-sm text-gray-700 font-extralight mb-[18px]">
          Price Range:{" "}
          <span>
            {formatPrice(0)} - {formatPrice(maxRange, 2)}
          </span>
        </label>
        <input
          type="range"
          id="price-range"
          className="w-full accent-black-75"
          min="0"
          step="0.01"
          max={maxRange}
          value={priceRange}
          onChange={handleSliderChange}
        />
      </div>
      <div className="flex justify-between text-sm text-black-75">
        <span id="minPrice">{formatPrice(0)}</span>
        <span id="maxPrice">{formatPrice(priceRange, 2)}</span>
      </div>
    </>
  );
};

export default PriceRangeInput;
