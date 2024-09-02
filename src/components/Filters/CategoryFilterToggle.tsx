'use client';

import ToggleFilters from './ToggleFilters';
import Select from '../Select';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductCategories, toggleFilters } from '@/store/slices/categories/categoriesSlice';
import { selectProducts } from '@/store/slices/products/productsSlice';

const CategoryFilterToggle = () => {
  const { isToggleFilters } = useSelector(selectProductCategories);
  const { products, totalProducts } = useSelector(selectProducts);
  const dispatch = useDispatch();

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
      <ToggleFilters
        isToggle={isToggleFilters}
        handleToggle={() => dispatch(toggleFilters(!isToggleFilters))}
        className='!self-auto'
      />

      <div className="flex items-center text-black-600 text-sm font-light leading-[21px]">
        <span>Showing </span>
        <span className='text-black-75 mx-1'>{products.length} of {totalProducts} </span>
        <span>Products</span>
      </div>

      <div className="flex items-center">
        <label className='text-xs text-black-75 font-light mr-4'>Sort by:</label>
        <Select
          size='md'
          options={[
            { label: 'Most Popular', value: 'most-popular' },
            { label: 'Most Rated', value: 'most-rated' },
            { label: 'Date', value: 'date' },
          ]}
          value="most-popular"
        />
      </div>
    </div>
  );
};

export default CategoryFilterToggle;
