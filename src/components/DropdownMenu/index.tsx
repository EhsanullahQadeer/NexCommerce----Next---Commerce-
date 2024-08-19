'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import useOutsideClick from '@/hooks/useOutSideClick';
import Link from 'next/link';

interface DropdownMenuItem {
  name: string;
  url: string;
  icon?: string;
}

interface DropdownMenuProps {
  label?: string;
  items?: DropdownMenuItem[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  hasImage?: boolean;
  style?: string;
  selected?: DropdownMenuItem | null;
}

const DropdownMenu = ({
  label = 'Select',
  items,
  position = 'bottom-left',
  style,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  const dropdownClass = cn(
    'absolute bg-white w-max max-h-52 overflow-y-auto py-[0.6px] rounded shadow-md z-10',
    {
      'top-full right-0 mt-1': position === 'bottom-right',
      'top-full left-0 mt-1': position === 'bottom-left',
      'bottom-full right-0': position === 'top-right',
      'bottom-full left-0': position === 'top-left',
    }
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex font-light justify-between items-center gap-2 rounded w-full py-2 px-4 bg-white text-black-500 uppercase',
          style
        )}
      >
        <span>{label}</span>
        <i className="las la-angle-down -mt-1"></i>
      </button>
      {/* Open */}
      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul role="menu" aria-orientation="vertical">
            {items?.map((item, index) => (
              <li
                key={index}
                className={cn(
                  'flex items-center cursor-pointer px-4 py-[3px] text-[13px] leading-[25px] font-light hover:text-primary'
                )}
              >
                <Link href={item.url}>
                  {item?.icon && (
                    <i className={cn(item.icon, 'text-[15px] mr-1')}></i>
                  )}{' '}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
