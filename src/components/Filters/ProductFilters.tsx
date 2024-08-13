'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import FilterCollapse from '../../features/Product/categories/FilterCollase';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleFilterKeyChange,
  selectProducts,
} from '@/store/slices/products/productsSlice';
import { clearButtonStyles } from './styles';
import ProductCategoriesList from './ProductCategoriesList';

const ProductFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { productCategories, filterKey } = useSelector(selectProducts);

  return (
    <div className="">
      <div
        className={cn(
          'relative flex items-center justify-between  gap-2.5 md:gap-[30px]',
          !isOpen ? 'flex-col sm:flex-row' : 'flex-row',
        )}
      >
        <div
          className={cn(
            'flex items-center cursor-pointer gap-1.5 text-gray-75 self-start md:self-auto',
            isOpen && 'text-primary'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-center items-center">
            <i
              className={cn(
                'las text-[18px] transition-all duration-[0.35s] ease',
                isOpen ? 'la-times' : 'la-bars'
              )}
            ></i>
          </div>
          <span className="text-base font-light leading-[-0.16px]">
            Filters
          </span>
        </div>
        <ProductCategoriesList
          productCategories={productCategories}
          isOpen={isOpen}
          filterKey={filterKey}
          onCategorySelect={(category: string) =>
            dispatch(handleFilterKeyChange(category))
          }
        />
        <span
          className={cn(
            clearButtonStyles,
            isOpen ? 'visible opacity-100' : 'hidden'
          )}
        >
          Clean All
        </span>
      </div>
      <FilterCollapse isOpen={isOpen} />
    </div>
  );
};

export default ProductFilters;
