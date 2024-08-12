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

const ProductFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { productCategories, filterKey } = useSelector(selectProducts);

  return (
    <div className="">
      <div className="relative flex flex-col md:flex-row items-center justify-between  gap-2.5 md:gap-[30px]">
        <div
          className={cn(
            'flex items-center cursor-pointer gap-1.5 text-gray-75',
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
        <div
          className={cn(
            'flex items-center flex-wrap justify-center gap-2 visible opacity-100 transition-all duration-[0.35s] ease-in',
            isOpen && 'invisible opacity-0'
          )}
        >
          {productCategories.map((item) => (
            <div
              key={item.label}
              className={cn(
                'text-base text-black-500 font-light px-2.5 py-1 leading-[-0.16px] cursor-pointer hover:text-primary',
                filterKey === item.key && 'text-primary border-b border-primary'
              )}
              onClick={() => dispatch(handleFilterKeyChange(item.key))}
            >
              {item.label}
            </div>
          ))}
        </div>
        <span
          className={cn(
            clearButtonStyles,
            isOpen && 'visible opacity-100'
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
