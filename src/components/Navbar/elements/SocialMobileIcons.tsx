import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SocialMobileIconsProps {
  variant?: 'dark' | 'light';
  className?: string;
}

const icons = [
  {
    url: 'https://www.facebook.com/',
    icon: 'la-facebook',
  },
  {
    url: 'https://www.twitter.com/',
    icon: 'la-twitter',
  },
  {
    url: 'https://www.instagram.com/',
    icon: 'la-instagram',
  },
  {
    url: 'https://www.youtube.com/',
    icon: 'la-youtube',
  },
];

const SocialMobileIcons: FC<SocialMobileIconsProps> = ({
  variant = 'light',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center mt-[25px] gap-[18px]',
        className
      )}
    >
      {icons.map((item, index) => (
        <Link
          key={item.url + index}
          href={item.url}
          target="_blank"
          className={cn(
            'flex h-7 w-7 rounded-full border items-center justify-center hover:text-primary hover:border-primary',
            variant === 'dark'
              ? 'text-black-500 border-[#e1e2e6]'
              : 'text-white border-[#ffffff73]'
          )}
        >
          <i className={cn('la text-base', item.icon)}></i>
        </Link>
      ))}
    </div>
  );
};

export default SocialMobileIcons;
