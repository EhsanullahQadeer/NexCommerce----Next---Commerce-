import Radio from '@/components/Radio';
import { handleSortFilter, selectProducts } from '@/store/slices/products/productsSlice';
import { ProductSortKeys } from '@/types/product';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SortProps {
  productSortCategories: ProductSortKeys[];
}

const SortFilters: FC<SortProps> = ({ productSortCategories }) => {
  const dispatch = useDispatch();
  const { sortByFilter } = useSelector(selectProducts);

  return (
    <div className="">
      {productSortCategories.map((item) => (
        <div key={item.key} className="flex justify-between pr-3 my-1">
          <Radio checked={sortByFilter.sort_by === item.key && sortByFilter.order == item.sort} value={item.key} label={item.label} name='sortByFilter' onClick={() => dispatch(handleSortFilter({sort_by: item.key, order: item.sort}))} />
        </div>
      ))}
    </div>
  );
};

export default SortFilters;
