import Radio from "@/components/Radio";
import {
  _handleSortFilter,
  handleSortFilter,
  selectProducts,
  selectProductsRootState,
  SortPayload,
  Torigin,
} from "@/store/slices/products/productsSlice";
import { ProductSortKeys } from "@/types/product";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SortProps {
  productSortCategories: ProductSortKeys[];
  origin?: Torigin;
}

const SortFilters: FC<SortProps> = (props) => {
  const { productSortCategories, origin } = props;
  const dispatch = useDispatch();
  const { sortByFilter } = useSelector(
    origin ? selectProductsRootState[origin] : selectProducts
  );

  const handleClick = (sortValues: SortPayload) => {
    if (origin) {
      dispatch(_handleSortFilter({ payload: sortValues, origin }));
    } else {
      dispatch(handleSortFilter(sortValues));
    }
  };

  return (
    <div className="">
      {productSortCategories.map((item, index) => (
        <div key={index} className="flex justify-between pr-3 my-1">
          <Radio
            checked={
              sortByFilter.sort_by === item.key &&
              sortByFilter.order == item.sort
            }
            value={item.key}
            label={item.label}
            name="sortByFilter"
            onClick={() => handleClick({ sort_by: item.key, order: item.sort })}
          />
        </div>
      ))}
    </div>
  );
};

export default SortFilters;
