import { FC } from 'react';
import { cn } from '@/lib/utils';
import { ProductLabel } from '@/types/product';

interface TagLabelProps {
  label: ProductLabel;
  className?: string;
}

const lableStyles = {
  [ProductLabel.OUT_OF_STOCK]: 'bg-black-600',
  [ProductLabel.NEW]: 'bg-[#a6c76c]',
  [ProductLabel.TOP]: 'bg-[#7dd2ea]',
  [ProductLabel.SALE]: 'bg-[#ef837b]',
};

const TagLabel: FC<TagLabelProps> = ({ label }) => {
  const isSale = label === ProductLabel.SALE;
  return (
    <span
      className={cn(
        'absolute text-[13px] font-light top-5 left-5 px-[9px] py-[5px] text-white',
        lableStyles[label]
      )}
    >
      {isSale ? '30% Off' : label}
    </span>
  );
};

export default TagLabel;
