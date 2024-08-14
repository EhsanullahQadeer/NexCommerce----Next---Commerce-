'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { selectSidebarToggle, toggleSidebar } from '@/store/slice';
import { cn } from '@/lib/utils';
import NavLink from './elements/NavLink';
import NotificationIcon from './elements/NotificationIcon';
import { routes } from './routes';
import SearchBar from '../SearchBar';
import CartDropdown from '../CartDropdown/CartDropdown';
import NavMobileView from './elements/MobileView';

const Navbar = () => {
  const [isAffix, setIsAffix] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const isSidebarToggled = useSelector(selectSidebarToggle);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isActiveLink = (path: string) => path === pathname;

  const handleScroll = () => {
    const offset = 200;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop >= offset) {
      setIsAffix(true);
    }

    if (scrollTop <= offset) {
      setIsAffix(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky bg-white w-full lg:top-[-60px] transition-all duration-[0.4s] w-full left-0 right-0 z-[90]',
          isAffix && 'lg:top-0 shadow-[0_3px_6px_rgba(51,51,51,0.05)]',
        )}
      >
        <div className="relative flex max-w-container items-center justify-between mx-auto px-2.5">
          <div className="flex items-center">
            <div
              className={cn(
                'flex lg:hidden h-[30px] w-[30px] ml-0 lg:ml-2.5 mr-2.5 justify-center cursor-pointer items-center',
                isSidebarToggled && '!pointer-events-none'
              )}
              onClick={() => dispatch(toggleSidebar())}
            >
              <i className="las la-bars text-[25.5px]"></i>
            </div>
            <Link href="/">
              <span className="sr-only">Molla</span>
              <Image alt="" src="/logo.png" height={24} width={105} />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {routes.map((item) => (
              <NavLink
                key={item.url}
                {...item}
                isActive={isActiveLink(item.url)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-[1.5rem]">
            <div
              className="hidden lg:block"
              onClick={() => setIsSearchBarOpen(true)}
            >
              <NotificationIcon
                icon={'las la-search'}
                iconClass="text-black-75"
              />
            </div>
            <Link href="" className="!hidden lg:!flex">
              <NotificationIcon
                icon="las la-user-circle"
                iconClass="!text-[28px]"
              />
            </Link>
            <Link href="" className="!hidden lg:!flex">
              <NotificationIcon
                icon="lar la-heart"
                iconClass="!text-[28px]"
                count={3}
              />
            </Link>
            <CartDropdown />
          </div>
        </div>
        <SearchBar isOpen={isSearchBarOpen} setIsOpen={setIsSearchBarOpen} />
      </header>

      <NavMobileView routes={routes} isActiveLink={isActiveLink} id='nav-mobile' />
    </>
  );
};

export default Navbar;
