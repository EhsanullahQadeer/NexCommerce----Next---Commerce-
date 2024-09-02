'use client';

import { FC, useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClick from '@/hooks/useOutSideClick';
import { cn } from '@/lib/utils';
import MobileSearchBar from '@/components/SearchBar/MobileSearchBar';
import { hideSidebarOutSideClick, selectSidebarToggle } from '@/store/slice';
import { NavLinkProps } from './NavLink';
import Link from 'next/link';
import SocialMobileIcons from './SocialMobileIcons';

// Constants and Styles
const BASE_STYLES =
  'fixed lg:hidden top-0 bottom-0 left-[-280px] bg-black-75 shadow-nav-mobile z-[999] w-full max-w-[280px] h-full overflow-y-auto';
const OVERLAY_STYLES =
  'fixed inset-0 z-[998] bg-[rgba(25,25,25,0.25)] transition-opacity lg:hidden';
const ANIMATION_DELAY = 100;
const ANIMATION_DURATION = 400;

interface NavMobileViewProps {
  routes: NavLinkProps[];
  isActiveLink: (path: string) => boolean;
  id?: string;
}

const NavMobileView: FC<NavMobileViewProps> = ({
  routes,
  isActiveLink,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isSidebarToggled = useSelector(selectSidebarToggle);

  // Handle closing of sidebar
  const handleCloseSidebar = useCallback(() => {
    dispatch(hideSidebarOutSideClick());
  }, [dispatch]);

  // Handle toggling of the sidebar with animations
  useEffect(() => {
    if (isSidebarToggled) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden'; // Prevent body scroll
      const timer = setTimeout(() => setIsAnimating(true), ANIMATION_DELAY);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = ''; // Restore body scroll
      const timer = setTimeout(() => setIsVisible(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isSidebarToggled]);

  useOutsideClick(mobileNavRef, handleCloseSidebar);

  if (!isVisible) return null;

  return createPortal(
    <>
      <div
        className={cn(
          OVERLAY_STYLES,
          isAnimating ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        style={{ transition: `opacity ${ANIMATION_DURATION}ms ease` }}
        onClick={handleCloseSidebar}
      />
      <div
        className={cn(
          BASE_STYLES,
          isAnimating && 'translate-x-[280px] lg:translate-x-0'
        )}
        style={{ transition: `transform ${ANIMATION_DURATION}ms ease` }}
        ref={mobileNavRef}
      >
        <div className="relative">
          <span
            className="absolute flex h-[30px] w-[30px] right-[17px] top-[7px] items-center justify-end cursor-pointer z-[99]"
            onClick={handleCloseSidebar}
          >
            <i className="las la-times cursor-pointer text-[16px] text-white"></i>
          </span>
        </div>
        <MobileSearchBar />

        <nav>
          <ul className="flex flex-col mt-[15px]">
            {routes.map((item, index) => (
              <li key={item.url + index}>
                <Link
                  href={item.url}
                  className={cn(
                    'block text-xs font-extralight uppercase py-2.5 px-5 text-white border-b border-b-[#ffffff14] leading-[18px]',
                    isActiveLink(item.url) && 'text-primary'
                  )}
                  onClick={handleCloseSidebar}
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
