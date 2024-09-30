import { use_fetchFilteredProductsMutation } from "@/store/api/productApi";
import {
  _handleMaxPriceProduct,
  _handleProduct,
  handlePriceRange,
  selectHomePageProducts,
  SortPayload,
} from "@/store/slices/products/productsSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../useDebounce";

const useHome = () => {
  const {
    categoriesFilter,
    sortByFilter,
    colorFilter,
    priceRangeFilter,
    limitFilter,
    skip,
    products,
    max_price,
  } = useSelector(selectHomePageProducts);
  const dispatch = useDispatch();
  const [_fetchFilteredProducts] = use_fetchFilteredProductsMutation();
  const stopApiRef = useRef<boolean>(false);
  const handleFetchProductsWithFilter = async () => {
    try {
      const filters: {
        sort: SortPayload;
        color?: string;
        priceRange?: string;
        categories?: number[];
      } = {
        sort: sortByFilter,
      };

      if (colorFilter) {
        filters.color = colorFilter;
      }

      if (priceRangeFilter) {
        filters.priceRange = `1-${priceRangeFilter}`;
      }

      if (categoriesFilter.length) {
        filters.categories = categoriesFilter;
      }
      const pramas = {
        filters,
        pagination: {
          skip: skip,
          limit: limitFilter,
        },
      };
      const data = await _fetchFilteredProducts(pramas).unwrap();
      const origin = "homePage";
      dispatch(_handleProduct({ payload: data.data.data || [], origin }));
      const maxValue = data.data.max_price;
      if (max_price !== maxValue && maxValue) {
        stopApiRef.current = true;
        setTimeout(() => {
          stopApiRef.current = false;
        }, 500);
        dispatch(handlePriceRange({ payload: maxValue, origin }));
        dispatch(_handleMaxPriceProduct({ payload: maxValue, origin }));
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const debounceValue = useDebounce(priceRangeFilter, 300);
  useEffect(() => {
    if (!stopApiRef.current) {
        console.log('stopApiRef.current: ', stopApiRef.current);
  console.log('debounceValue: ', debounceValue);

      handleFetchProductsWithFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesFilter, sortByFilter, colorFilter, debounceValue]);
};

export default useHome;
