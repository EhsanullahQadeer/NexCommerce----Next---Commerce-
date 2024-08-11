'use client';

import { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClick from '@/hooks/useOutSideClick';
import { cn } from '@/lib/utils';
import MobileSearchBar from '@/components/SearchBar/MobileSearchBar';
import { hideSidebarOutSideClick, selectSidebarToggle } from '@/store/slice';
import { NavLinkProps } from './NavLink';
import Link from 'next/link';
import SocialMobileIcons from './SocialMobileIcons';

interface NavMobileViewProps {
  routes: NavLinkProps[];
  isActiveLink: (path: string) => boolean;
}

const baseStyles =
  'fixed lg:hidden h-full w-full max-w-[280px] top-0 left-[-280px] bg-black-75 shadow-nav-mobile overflow-y-auto z-[999]';

const NavMobileView: FC<NavMobileViewProps> = ({ routes, isActiveLink }) => {
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isSidebarToggled = useSelector(selectSidebarToggle);

  useOutsideClick(mobileNavRef, () => {
    window?.innerWidth < 1024 && dispatch(hideSidebarOutSideClick());
  });

  return (
    <>
      <div
        className={cn(
          'lg:hidden h-full w-full left-0 top-0 z-[998] bg-[rgba(25,25,25,0.25)]',
          isSidebarToggled && 'fixed flex'
        )}
        style={{ transition: 'all 0.4s ease' }}
      ></div>
      <div
        className={cn(
          baseStyles,
          isSidebarToggled && 'translate-x-[80px] lg:translate-x-0'
        )}
        style={{ transition: 'all 0.4s ease' }}
        ref={mobileNavRef}
      >
        <div className="relative">
          <span
            className="absolute flex h-[30px] w-[30px] right-[17px] top-[7px] items-center justify-end cursor-pointer z-[99]"
            onClick={() => dispatch(hideSidebarOutSideClick())}
          >
            <i className="las la-times cursor-pointer text-[16px] text-white"></i>
          </span>
        </div>
        <MobileSearchBar />

        <nav>
          <ul className="flex flex-col mt-[15px]">
            {routes.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className={cn(
                    'block text-xs font-extralight uppercase py-2.5 px-5 text-white border-b border-b-[#ffffff14] leading-[18px]',
                    isActiveLink(item.url) && 'text-primary'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialMobileIcons />
      </div>
    </>
  );
};

export default NavMobileView;
