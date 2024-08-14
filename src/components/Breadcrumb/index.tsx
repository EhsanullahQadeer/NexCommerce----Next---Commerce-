import { FC } from 'react';

interface BreadcrumbProps {
  links: { url: string; name: string }[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ links }) => {
  return (
    <nav className="flex py-[14px] border-b border-[rgba(235,235,235,.55)]">
      <ol className="flex items-center">
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
    </nav>
  );
};

export default Breadcrumb;
