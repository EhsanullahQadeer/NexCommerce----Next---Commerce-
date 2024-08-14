'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  id?: string;
}

const baseStyles =
  'fixed lg:hidden h-full w-full max-w-[280px] top-0 left-[-280px] bg-black-75 shadow-nav-mobile z-[999]';

const NavMobileView: FC<NavMobileViewProps> = ({ routes, isActiveLink, id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isSidebarToggled = useSelector(selectSidebarToggle);

  useOutsideClick(mobileNavRef, () => {
    dispatch(hideSidebarOutSideClick());
  });

  useEffect(() => {
    if (isSidebarToggled) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsAnimating(true), 100); // Small delay to trigger animation
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);

      // Delay the close action to allow the animation to play
      const timer = setTimeout(() => setIsVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isSidebarToggled]);

  if (!isVisible) return null;

  return createPortal(
    <>
      <div
        className={cn(
          'fixed lg:hidden h-full w-full left-0 top-0 invisible opacity-0 z-[998] bg-[rgba(25,25,25,0.25)]',
          isAnimating && 'opacity-100 visible'
        )}
        style={{ transition: 'all 0.4s ease' }}
      ></div>
      <div
        className={cn(
          baseStyles,
          isAnimating && 'translate-x-[280px] lg:translate-x-0'
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
    </>,
    document.body,
    id
  );
};

export default NavMobileView;
