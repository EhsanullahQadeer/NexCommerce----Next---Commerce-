import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DropdownListProps {
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const DropdownList: FC<DropdownListProps> = ({
  onClick,
  children,
  isActive,
}) => {
  return (
    <li
      onClick={onClick}
      className={cn('flex items-center cursor-pointer px-4 py-[3px] text-[13px] leading-[25px] font-light hover:text-primary', {
        'text-primary': isActive,
      })}
    >
      {children}
    </li>
  );
};

export default DropdownList;
