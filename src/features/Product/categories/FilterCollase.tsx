import { FC, ReactNode, useRef } from 'react';
import CategoryFilter from './CategoryFilters';
import ColourFilters from './ColourFilters';
import { cn } from '@/lib/utils';
import { selectProducts } from '@/store/slices/products/productsSlice';
import { useSelector } from 'react-redux';
import { productSortCategories } from '@/store/slices/products/fakeProducts';
import PriceRangeInput from '@/components/PriceRangeInput';

interface FilterCollapseProps {
  isOpen?: boolean;
}

interface FilterColumnProps {
  title: string;
  children: ReactNode;
}

const FilterCollapse: FC<FilterCollapseProps> = ({ isOpen }) => {
  const filtersRef = useRef<HTMLDivElement>(null);
  const { productCategories } = useSelector(selectProducts);

  return (
    <div
      ref={filtersRef}
      className={cn(
        'h-[1px] transition-all duration-[0.5s] ease-in-out opacity-0 invisible',
        isOpen && 'h-auto opacity-100 visible'
      )}
      style={{
        height: isOpen ? `${filtersRef?.current?.scrollHeight}px` : '0px',
      }}
    >
      <div className="grid grid-cols sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          <PriceRangeInput />
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
