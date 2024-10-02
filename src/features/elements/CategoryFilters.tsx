import Checkbox from "@/components/Checkbox";
import {
  _handleCategoriesFilter,
  categoryPayload,
  selectProductsRootState,
  Torigin,
} from "@/store/slices/products/productsSlice";
import { ProductCategory } from "@/types/product";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CategoryProps {
  categories: ProductCategory[];
  origin: Torigin;
}

const CategoryFilter: FC<CategoryProps> = (props) => {
  const { origin, categories } = props;
  console.log('categories: ', categories);
  const dispatch = useDispatch();
  const { categoriesFilter } = useSelector(selectProductsRootState[origin]);
  const handleChange = (payload: categoryPayload) => {
    dispatch(_handleCategoriesFilter({ payload, origin }));
  };

  return (
    <div className="">
      {categories.map(
        (item) =>
          item.products_count > 0 && (
            <div key={item.id} className="flex justify-between pr-3 my-1">
              <Checkbox
                label={item.name}
                id={`${item.id}`}
                checked={categoriesFilter.includes(item.id)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange({
                    id: item.id,
                    isChecked: e.target.checked,
                  });
                }}
              />
              <span className="flex items-center justify-center min-w-[25px] px-1 text-[13px] text-black-75 font-extralight leading-[13px] bg-[#f8f8f8] h-5 rounded-md">
                {item.products_count}
              </span>
            </div>
          )
      )}
    </div>
  );
};

export default CategoryFilter;
