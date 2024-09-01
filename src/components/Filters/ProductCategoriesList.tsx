import { FC } from 'react';
import { cn } from '@/lib/utils';
import { ProductCategory } from '@/types/product';

interface ProductCategoriesListProps {
  productCategories: ProductCategory[];
  isOpen?: boolean;
  filterKey: string;
  onCategorySelect: (item: string) => void;
}

const ProductCategoriesList: FC<ProductCategoriesListProps> = ({
  productCategories,
  isOpen,
  filterKey,
  onCategorySelect,
}) => {
  return (
    <div
      className={cn(
        'flex self-start md:self-auto md:items-center flex-wrap justify-center gap-2 visible opacity-100 transition-opacity duration-[0.35s] ease-in',
        isOpen && 'invisible opacity-0 hidden'
      )}
    >
      <div
        className={cn(
          'text-base text-black-500 font-light px-2.5 py-1 leading-[-0.16px] cursor-pointer hover:text-primary',
          filterKey === `0` && 'text-primary border-b border-primary'
        )}
        onClick={() => onCategorySelect(`*`)}
      >
        All
      </div>
      {productCategories.map((item) => (
        item.products_count > 0 &&
        <div
          key={`category-${item.id}`}
          className={cn(
            'text-base text-black-500 font-light px-2.5 py-1 leading-[-0.16px] cursor-pointer hover:text-primary',
            filterKey === `cat-${item.id}` && 'text-primary border-b border-primary'
          )}
          onClick={() => onCategorySelect(`cat-${item.id}`)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default ProductCategoriesList;
