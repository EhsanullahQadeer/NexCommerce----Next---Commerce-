import { cn } from '@/lib/utils';
import { FC } from 'react';

interface ToggleFiltersProps {
  isToggle: boolean;
  handleToggle: () => void;
  className?: string;
}

const ToggleFilters: FC<ToggleFiltersProps> = ({
  isToggle,
  handleToggle,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center cursor-pointer gap-1.5 text-gray-75 self-start md:self-auto transition-all duration-[0.35s] ease hover:text-primary',
        isToggle && 'text-primary',
        className
      )}
      onClick={handleToggle}
    >
      <div className="flex justify-center items-center">
        <i
          className={cn('las text-[18px]', isToggle ? 'la-times' : 'la-bars')}
        ></i>
      </div>
      <span className="text-base font-light leading-[-0.16px]">Filters</span>
    </div>
  );
};

export default ToggleFilters;
