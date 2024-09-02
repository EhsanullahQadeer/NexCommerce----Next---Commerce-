import { FC } from 'react';
import { cn } from '@/lib/utils';

interface NotificationIconProps {
  icon: React.ReactNode;
  count?: number;
  className?: string;
  iconCountClass?: string;
  iconClass?: string;
}

const baseStyles =
  'relative flex h-8 w-8 items-center justify-center cursor-pointer';
const baseIconStyles = 'text-2xl text-black-100 hover:text-primary';
const baseCountStyles =
  'absolute flex bg-primary h-[17px] w-[17px] text-[10px] font-light text-white text-center items-center justify-center right-[-3px] top-0.5 rounded-full';

const NotificationIcon: FC<NotificationIconProps> = ({
  icon,
  count,
  className,
  iconCountClass,
  iconClass,
}) => {
  return (
    <div className={cn(baseStyles, className)}>
      <i className={cn(icon, baseIconStyles, iconClass)}></i>
      {!!count && (
        <span className={cn(baseCountStyles, iconCountClass)}>{count}</span>
      )}
    </div>
  );
};

export default NotificationIcon;
