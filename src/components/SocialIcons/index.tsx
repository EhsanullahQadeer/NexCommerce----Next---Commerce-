import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { icons } from './icons';

interface SocialIcons {
  variant?: 'dark' | 'light';
  className?: string;
  size?: 'md' | 'lg';
}

const iconSize = {
  md: 'h-7 w-7 text-base',
  lg: 'h-10 w-10 text-lg',
};

const SocialIcons: FC<SocialIcons> = ({
  variant = 'light',
  className,
  size = 'md',
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center mt-[25px]',
        className,
        size === 'lg' ? 'gap-2.5' : 'gap-[18px]'
      )}
    >
      {icons.map((item) => (
        <Link
          key={item.url}
          href={item.url}
          target="_blank"
          className={cn(
            'flex rounded-full border items-center justify-center hover:text-primary hover:border-primary',
            variant === 'dark'
              ? 'text-black-500 border-[#e1e2e6]'
              : 'text-white border-[#ffffff73]',
            iconSize[size]
          )}
        >
          <i className={cn('la', item.icon)}></i>
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;
