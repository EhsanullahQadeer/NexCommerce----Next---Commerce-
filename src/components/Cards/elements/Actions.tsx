import Button from '@/components/Button';
import { FC } from 'react';
import { previewBtnStyles } from './styles';
import { cn } from '@/lib/utils';

const buttonStyles =
  'w-full !flex-col !items-center !bg-white hover:!text-primary !text-[13px] !px-0';

interface CardActionsProps {
  onPreview?: () => void;
  onAddToCart?: () => void;
  onCompare?: () => void;
}

const CardActions: FC<CardActionsProps> = ({
  onPreview,
  onAddToCart,
  onCompare,
}) => {
  return (
    <div className={cn(previewBtnStyles, '!bg-white flex items-center py-2')}>
      <Button
        className={buttonStyles}
        variant="white"
        onClick={onAddToCart}
        size="xs"
      >
        <i className="las la-cart-plus text-primary text-lg"></i>
        add to cart
      </Button>
      <Button
        className={cn(
          buttonStyles,
          '!border-solid !border-0 !border-l !border-l-[#e5e5e5]'
        )}
        variant="white"
        onClick={onPreview}
        size="xs"
      >
        <i className="las la-binoculars text-primary text-lg"></i>
        quick view
      </Button>
      {/* <Button
        className={cn(
          buttonStyles,
          '!border-solid border-0 !border-l !border-l-[#e5e5e5]'
        )}
        variant="white"
        onClick={onCompare}
        size="xs"
      >
        <i className="las la-random text-primary text-lg"></i>
        compare
      </Button> */}
    </div>
  );
};

export default CardActions;
