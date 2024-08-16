import { FC } from 'react';
import { arrayNumberGenerator, cn } from '@/lib/utils';

interface StartsProps {
  count: number;
  reviewCount?: number;
  className?: string;
}

const Stars: FC<StartsProps> = ({ count, reviewCount, className }) => {
  const ratings = arrayNumberGenerator(count);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">
        {ratings.map((item) => (
          <span key={item} className="flex items-center">
            <i
              className={cn(
                'las la-star text-sm',
                item === 0 ? 'text-[#fcb941]' : 'text-black-600'
              )}
            ></i>
          </span>
        ))}
      </div>
      {reviewCount && (
        <span className="text-black-600 text-[13px] font-extralight">
          ( {reviewCount} Reviews )
        </span>
      )}
    </div>
  );
};

export default Stars;
