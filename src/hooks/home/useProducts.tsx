import { useFetchFilteredProductsMutation } from "@/store/api/productApi";
import {
  _handleMaxPriceProduct,
  _handleProduct,
  handlePriceRange,
  handleTotalProduct,
  selectProductsRootState,
  SortPayload,
  Torigin,
} from "@/store/slices/products/productsSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../useDebounce";

interface Iprops {
  origin: Torigin;
}

const useProducts = (props: Iprops) => {
  const { origin } = props;
  const {
    categoriesFilter,
    sortByFilter,
    colorFilter,
    priceRangeFilter,
    limitFilter,
    max_price,
    currentPage,
  } = useSelector(selectProductsRootState[origin]);
  console.log('sortByFilter: ', sortByFilter);
  const dispatch = useDispatch();
  const [fetchFilteredProducts, { isLoading }] =
    useFetchFilteredProductsMutation();
  const stopApiRef = useRef<boolean>(false);
  const handleFetchProductsWithFilter = async () => {
    const skip = (currentPage - 1) * limitFilter;
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
          skip,
          limit: limitFilter,
        },
      };
      const data = await fetchFilteredProducts(pramas).unwrap();
      dispatch(_handleProduct({ payload: data.data.data || [], origin }));
      dispatch(handleTotalProduct({ payload: data.data.total || 0, origin }));
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
      handleFetchProductsWithFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesFilter, sortByFilter, colorFilter, debounceValue, currentPage]);

  return { isLoading };
};

export default useProducts;
