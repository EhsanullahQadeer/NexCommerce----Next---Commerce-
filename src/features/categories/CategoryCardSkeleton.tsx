import { arrayNumberGenerator, cn } from "@/lib/utils";
import { FC } from "react";

interface CategoryCardSkeletonProps {
  items?: number;
  className?: string;
}

const CategoryCardSkeleton: FC<CategoryCardSkeletonProps> = ({
  items = 4,
  className,
}) => {
  const cards = arrayNumberGenerator(items);
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10",
        className
      )}
    >
      {cards.map((card, index) => (
        <div className="w-full animate-pulse" key={card + index}>
          <div className="w-full h-[277px] bg-black-600"></div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCardSkeleton;
