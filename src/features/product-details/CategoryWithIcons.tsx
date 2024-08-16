import SocialMobileIcons from '@/components/Navbar/elements/SocialMobileIcons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface CategoryWithIconsProps {
  isModal?: boolean;
}

const CategoryWithIcons: FC<CategoryWithIconsProps> = ({ isModal }) => {
  return (
    <div
      className={cn(
        'border-t border-black-300 pt-5',
        !isModal &&
          'flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5'
      )}
    >
      <div
        className={cn(
          'flex items-center text-sm font-light text-black-500 tracking-[0.14px] leading-[16.8px]',
          isModal && 'mb-[45px]'
        )}
      >
        <span className="mr-2">Category: </span>
        <Link href="#">women</Link>,{' '}
        <Link href="#" className="ml-1">
          Dresses
        </Link>
        ,{' '}
        <Link href="#" className="ml-1">
          Yellow
        </Link>
      </div>

      <div className={cn('flex items-center', isModal && 'mt-[45px]')}>
        <span className="mr-2 text-sm font-light text-black-500 tracking-[0.14px] leading-[16.8px]">
          Share:{' '}
        </span>
        <SocialMobileIcons variant="dark" className="!mt-0 !gap-[5px]" />
      </div>
    </div>
  );
};

export default CategoryWithIcons;
