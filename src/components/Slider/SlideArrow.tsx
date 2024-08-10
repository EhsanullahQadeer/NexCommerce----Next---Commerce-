import { cn } from '@/lib/utils';
import { FC } from 'react';

interface SlideArrowProps {
  className?: string;
  icon: string;
  onClick?: () => void;
}

const slideArrowBaseStyle =
  'group absolute flex h-[42px] w-[42px] text-[22px] items-center justify-center top-0 bottom-0 my-auto z-[50] cursor-pointer transition-all';

const SlideArrow: FC<SlideArrowProps> = ({ className, onClick, icon }) => {
  return (
    <div
      className={cn(
        slideArrowBaseStyle,
        className
      )}
      onClick={onClick}
    >
      <i
        className={cn('las text-black-500 group-hover:text-primary', icon)}
      ></i>
    </div>
  );
};

export default SlideArrow;
