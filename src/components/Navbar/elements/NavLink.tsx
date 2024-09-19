import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface NavLinkProps {
  name: string;
  url: string;
  className?: string;
  isActive?: boolean;
}

const baseStyles = 'relative h-[60px] text-sm font-normal uppercase text-75 flex items-center px-4 group tracking-[0.14px] hover:text-primary';
const linkBottomLineStyles = 'absolute h-[2px] w-full bg-primary bottom-[1rem] left-0 group-hover:left-auto group-hover:right-0 origin-[right_center] group-hover:origin-[left_center]';
const noActiveLinkStyles = 'scale-x-0 scale-y-100 group-hover:scale-x-100 group-hover:scale-y-100';
const activeLinkStyles = '';

const NavLink: FC<NavLinkProps> = ({ name, url, className, isActive }) => {
  return (
    <Link href={url} className={cn(baseStyles, isActive && 'text-primary', className)}>
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
