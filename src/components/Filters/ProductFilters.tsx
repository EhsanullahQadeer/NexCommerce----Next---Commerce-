'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import FilterCollapse from '../../features/Product/categories/FilterCollase';
import Button from '../Button';

const ProductFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const productCategories = [
    'All',
    'Furniture',
    'Lighting',
    'Accessories',
    'Sale',
  ];

  return (
    <div className="">
      <div className="relative flex items-center justify-between  gap-[30px]">
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
            'flex items-center gap-2 visible opacity-100 transition-all duration-[0.35s] ease-in',
            isOpen && 'invisible opacity-0'
          )}
        >
          {productCategories.map((cat, index) => (
            <div
              key={cat}
              className={cn(
                'text-base text-black-500 font-light px-2.5 py-1 leading-[-0.16px] cursor-pointer hover:text-primary',
                index === 0 && 'text-primary border-b border-primary'
              )}
            >
              {cat}
            </div>
          ))}
        </div>
        <span
          className={cn(
            'absolute inline-flex items-center text-primary font-extralight text-base top-0 bottom-0 my-auto right-0 opacity-0 invisible transition-all duration-[0.6s] ease-in-out',
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
