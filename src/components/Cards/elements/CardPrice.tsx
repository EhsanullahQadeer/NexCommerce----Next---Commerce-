import { cn } from '@/lib/utils';
import { FC } from 'react';

interface CardPriceProps {
  price?: number;
  oldPrice?: number;
  isBoxed?: boolean;
}

const CardPrice: FC<CardPriceProps> = ({ price, oldPrice, isBoxed }) => {
  if (!price) return;

  return (
    <div className="flex text-sm font-light gap-2 items-center">
      <span className={cn('text-primary', isBoxed && 'text-base font-normal')}>
        ${price.toFixed(2)}
      </span>
      {/* {oldPrice && (
        <span
          className={cn(
            'text-black-600',
            isBoxed && 'line-through text-base font-normal'
          )}
        >
          {!isBoxed && 'Was'} ${oldPrice.toFixed(2)}
        </span>
      )} */}
    </div>
  );
};

export default CardPrice;
