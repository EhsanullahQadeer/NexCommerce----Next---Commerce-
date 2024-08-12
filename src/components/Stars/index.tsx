import { FC } from 'react';
import { arrayNumberGenerator, cn } from '@/lib/utils';

interface StartsProps {
  count: number;
  reviewCount: number;
}

const Stars: FC<StartsProps> = ({ count, reviewCount }) => {
  const ratings = arrayNumberGenerator(count);
  return (
    <div className='flex items-center gap-2'>
      <div className="flex items-center">
        {ratings.map((item) => (
          <span className="flex items-center">
            <i
              className={cn(
                'las la-star text-sm',
                item === 0 ? 'text-[#fcb941]' : 'text-black-600'
              )}
            ></i>
          </span>
        ))}
      </div>
      <span className='text-black-600 text-[13px] font-extralight'>( {reviewCount} Reviews )</span>
    </div>
  );
};

export default Stars;
