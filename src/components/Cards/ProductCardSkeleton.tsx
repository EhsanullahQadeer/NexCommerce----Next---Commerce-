import { arrayNumberGenerator, cn } from '@/lib/utils';
import { FC } from 'react';

interface ProductCardSkeletonProps {
  items?: number;
  className?: string;
}

const ProductCardSkeleton: FC<ProductCardSkeletonProps> = ({ items = 4, className }) => {
  const cards = arrayNumberGenerator(items);
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10", className)}>
      {cards.map((card) => (
        <div className="w-full animate-pulse" key={card}>
          <div className="w-full h-[277px] bg-black-600"></div>

          <h3 className="w-full h-5 mt-5 bg-black-600"></h3>
          <p className="w-[80%] h-4 mt-2 bg-black-600"></p>
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-3 w-[100px] mt-2 bg-black-600"></div>
            <div className="h-3 w-[60px] mt-2 bg-black-600"></div>
          </div>
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-4 w-4 rounded-full mt-2 bg-black-600"></div>
            <div className="h-4 w-4 rounded-full mt-2 bg-black-600"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
