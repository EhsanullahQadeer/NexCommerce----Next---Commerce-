import Checkbox from '@/components/Checkbox';
import { selectProducts } from '@/store/slices/products/productsSlice';
import { FC } from 'react';
import { useSelector } from 'react-redux';

const CategoryFilter: FC = () => {
  const { productCategories } = useSelector(selectProducts);
  return (
    <div className="">
      {productCategories.map((item) => (
        <div key={item.key} className="flex justify-between pr-3 my-1">
          <Checkbox label={item.label} id={item.label} />
          {item.count && (
            <span className="flex items-center justify-center min-w-[25px] px-1 text-[13px] text-black-75 font-extralight leading-[13px] bg-[#f8f8f8] h-5 rounded-md">
              {item.count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
