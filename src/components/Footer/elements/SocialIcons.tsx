import Link from 'next/link';
import { icons } from './data';
import { cn } from '@/lib/utils';

const FooterSocialIcons = () => {
  return (
    <div className="flex items-center justify-center gap-5">
      {icons.map((item, index) => (
        <Link
          key={item.url + index}
          href={item.url}
          target="_blank"
          className="flex items-center"
          aria-label={item.name}
        >
          <i className={cn('la text-lg hover:text-primary', item.icon)}></i>
        </Link>
      ))}
    </div>
  );
};

export default FooterSocialIcons;
