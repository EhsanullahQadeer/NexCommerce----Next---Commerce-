import useCurrency from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface CardPriceProps {
  price?: number;
  oldPrice?: number;
  isBoxed?: boolean;
  currency_id:number;
}

const CardPrice: FC<CardPriceProps> = ({ price, oldPrice, isBoxed,currency_id }) => {
  const {formatPrice} = useCurrency()
  if (!price) return;

  return (
    <div className="flex text-sm font-light gap-2 items-center">
      <span className={cn('text-primary', isBoxed && 'text-base font-normal')}>
        {formatPrice(price,currency_id)}
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
