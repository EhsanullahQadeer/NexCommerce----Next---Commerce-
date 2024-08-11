import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import CategoryFilter from './CategoryFilters';
import { productCategories, productSortCategories } from './data';
import ColourFilters from './ColourFilters';
import { cn } from '@/lib/utils';

interface FilterCollapseProps {
  isOpen?: boolean;
}

interface FilterColumnProps {
  title: string;
  children: ReactNode;
}

const FilterCollapse: FC<FilterCollapseProps> = ({ isOpen }) => {
  const [price, setPrice] = useState(0);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(filtersRef)
  })
  return (
    <div
      ref={filtersRef}
      className={cn(
        'h-[1px] transition-all duration-[0.5s] ease-in-out opacity-0 invisible',
        isOpen && 'h-auto opacity-100 visible'
      )}
      style={{ height: isOpen ? `${filtersRef?.current?.scrollHeight}px` : '0px'}}
    >
      <div className="grid grid-cols-4 gap-5">
        <FilterColumn title="Category: ">
          <CategoryFilter categories={productCategories} />
        </FilterColumn>
        <FilterColumn title="Sort by: ">
          <CategoryFilter categories={productSortCategories} />
        </FilterColumn>
        <FilterColumn title="Colour: ">
          <ColourFilters />
        </FilterColumn>
        <FilterColumn title="Price: ">
          <div>
            <label className="block text-sm text-gray-700 font-extralight mb-[18px]">
              Price Range: <span>$0 - $750</span>
            </label>
            <input
              type="range"
              id="price-range"
              className="w-full accent-black-75"
              min="0"
              max="750"
              value={price}
              onInput={(e: any) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-sm text-black-75">
            <span id="minPrice">$0</span>
            <span id="maxPrice">$750</span>
          </div>
        </FilterColumn>
      </div>
    </div>
  );
};

export default FilterCollapse;

const FilterColumn: FC<FilterColumnProps> = ({ title, children }) => {
  return (
    <div className="pt-5 pb-[30px] mt-4 border-t border-black-300">
      <h3 className="text-base text-black-75 font-light leading-[-.01em] mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
};
