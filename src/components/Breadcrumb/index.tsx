import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  links: { url: string; name: string }[];
  border?: 'top' | 'bottom' | 'both';
  children?: ReactNode;
}

const borderType = {
  top: 'border-t',
  bottom: 'border-b',
  both: 'border-t border-b',
};

const Breadcrumb: FC<BreadcrumbProps> = ({
  links,
  border = 'bottom',
  children,
}) => {
  return (
    <nav
      className={cn(
        'flex py-[14px] border-[rgba(235,235,235,.55)]',
        borderType[border]
      )}
    >
      <ol className="flex items-center justify-between">
        {links.map((link, index) => {
          const isLastIndex = index === links.length - 1;
          return (
            <li className="inline-flex items-center leading-21px" key={index}>
              {isLastIndex ? (
                <span className="capitalize text-sm font-extralight text-gray-75">
                  {link.name}
                </span>
              ) : (
                <>
                  <a
                    href={link.url}
                    className="capitalize inline-flex items-center text-sm font-extralight text-black-500 hover:text-primary"
                  >
                    {link.name}
                  </a>
                  <i className="las la-angle-right text-[12px] mx-2.5 text-black-500"></i>
                </>
              )}
            </li>
          );
        })}
      </ol>
      {children}
    </nav>
  );
};

export default Breadcrumb;
