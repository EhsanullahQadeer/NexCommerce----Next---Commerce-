import { FC } from 'react';

interface CardPriceProps {
  price?: number;
  oldPrice?: number;
}

const CardPrice: FC<CardPriceProps> = ({ price, oldPrice }) => {
  if (!price) return;

  return (
    <div className="flex text-sm font-light gap-2 items-center">
      <span className="text-primary">${price.toFixed(2)}</span>
      {oldPrice && (
        <span className="text-black-600">Was ${oldPrice.toFixed(2)}</span>
      )}
    </div>
  );
};

export default CardPrice;
