'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import FilterCollapse from '../../features/elements/FilterCollase';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilter,
  handleFilterKeyChange,
  selectProducts,
} from '@/store/slices/products/productsSlice';
import ProductCategoriesList from './ProductCategoriesList';
import ToggleFilters from './ToggleFilters';
import CleanAllButton from './CleanAllButton';

const ProductFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { productCategories, filterKey } = useSelector(selectProducts);

  return (
    <div>
      <div
        className={cn(
          'relative flex  items-start justify-start sm:items-center sm:justify-between gap-2.5 md:gap-[30px]',
          !isOpen ? 'flex-col sm:flex-row' : 'flex-row'
        )}
      >
        <ToggleFilters
          isToggle={isOpen}
          handleToggle={() => setIsOpen(!isOpen)}
        />
        <ProductCategoriesList
          productCategories={productCategories}
          isOpen={isOpen}
          filterKey={filterKey}
          onCategorySelect={(category: string) =>
            dispatch(handleFilterKeyChange(category))
          }
        />
        <CleanAllButton
          className={cn(
            '!invisible !opacity-0',
            isOpen ? '!visible !opacity-100' : 'hidden'
          )}
          onClick={() => dispatch(clearFilter())}
        />
      </div>
      <FilterCollapse isOpen={isOpen} />
    </div>
  );
};

export default ProductFilters;
