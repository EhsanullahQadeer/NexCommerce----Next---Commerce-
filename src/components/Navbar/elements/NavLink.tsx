import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  name: string;
  url: string;
  className?: string;
  isActive?: boolean;
}

const baseStyles =
  'relative h-[60px] text-sm font-light uppercase text-[#222] flex items-center px-4 group';
const linkBottomLineStyles =
  'absolute h-[1px] w-full bg-black-50 bottom-[1rem] left-0 group-hover:left-auto group-hover:right-0 origin-[right_center] group-hover:origin-[left_center]';
const noActiveLinkStyles =
  'scale-x-0 scale-y-100 group-hover:scale-x-100 group-hover:scale-y-100';
const activeLinkStyles = '';

const NavLink: FC<NavLinkProps> = ({ name, url, className, isActive }) => {
  return (
    <Link href={url} className={cn(baseStyles, className)}>
      {name}
      <span
        className={cn(
          linkBottomLineStyles,
          isActive ? activeLinkStyles : noActiveLinkStyles
        )}
        style={{
          transition: 'transform 0.3s ease',
        }}
      />
    </Link>
  );
};

export default NavLink;
