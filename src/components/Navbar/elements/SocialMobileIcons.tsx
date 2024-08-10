import Link from 'next/link';

import { cn } from '@/lib/utils';

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

const SocialMobileIcons = () => {
  return (
    <div className="flex items-center justify-center mt-[25px] gap-[18px]">
      {icons.map((item) => (
        <Link
          key={item.url}
          href={item.url}
          target="_blank"
          className="flex text-white h-7 w-7 rounded-full border border-[#ffffff73] items-center justify-center hover:text-primary hover:border-primary"
        >
          <i className={cn('la text-base', item.icon)}></i>
        </Link>
      ))}
    </div>
  );
};

export default SocialMobileIcons;
