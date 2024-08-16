import Button from '@/components/Button';
import LinkButton from './LinkButton';
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ActionsProps {
  isModal?: boolean;
}

const Actions: FC<ActionsProps> = ({ isModal }) => {
  return (
    <div
      className={cn(
        !isModal &&
          'flex justify-between items-start lg:items-center flex-col-reverse lg:flex-row-reverse mt-5 mb-5 gap-5'
      )}
    >
      <div
        className={cn(
          'flex items-center',
          isModal ? 'mt-[50px] mb-10' : 'gap-4'
        )}
      >
        <LinkButton url="#" label="Add to Whishlist" icon="lar la-heart" />
        <LinkButton
          url="#"
          label="Add to Compare"
          icon="las la-random"
          className={cn(
            !isModal && 'pl-4 border-l border-border-dotted border-[#e5e5e5]'
          )}
        />
      </div>

      <div className={cn(isModal ? 'mb-10' : 'w-full')}>
        <Button
          className={cn(
            '!justify-center uppercase !w-full',
            isModal ? 'h-[44px] !tracking-[1.4px]' : '!max-w-[198px]'
          )}
          variant="outlined"
        >
          <i className="las la-cart-plus mr-1 text-lg"></i>Add to cart
        </Button>
      </div>
    </div>
  );
};

export default Actions;
