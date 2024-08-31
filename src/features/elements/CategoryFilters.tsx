import Checkbox from '@/components/Checkbox';
import { ProductCategory } from '@/types/product';
import { FC } from 'react';

interface CategoryProps {
  categories: ProductCategory[];
}

const CategoryFilter: FC<CategoryProps> = ({ categories }) => {
  
  return (
    <div className="">
      {categories.map((item) => (
        <div key={item.id} className="flex justify-between pr-3 my-1">
          <Checkbox label={item.name} id={`${item.id}`} />
          {item.products_count && (
            <span className="flex items-center justify-center min-w-[25px] px-1 text-[13px] text-black-75 font-extralight leading-[13px] bg-[#f8f8f8] h-5 rounded-md">
              {item.products_count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
