'use client';

import { useState } from 'react';
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
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const isSidebarToggled = useSelector(selectSidebarToggle);

  const isActiveLink = (path: string) => path === pathname;

  return (
    <>
      <header className="bg-white w-full">
        <div className="relative flex max-w-container items-center justify-between mx-auto px-2.5">
          <div className="flex items-center">
            <div
              className={cn(
                'flex lg:hidden h-[30px] w-[30px] mx-2.5 justify-center cursor-pointer items-center',
                isSidebarToggled && '!pointer-events-none'
              )}
              onClick={() => dispatch(toggleSidebar())}
            >
              <i className="las la-bars text-[25.5px]"></i>
            </div>
            <Link href="/">
              <span className="sr-only">Molla</span>
              <Image alt="" src="/logo.png" height={20} width={82} />
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
            <NotificationIcon
              icon="lar la-heart"
              className="!hidden lg:!flex"
              iconClass="!text-[28px]"
              count={3}
            />
            <CartDropdown />
          </div>
        </div>
      </header>
      <SearchBar isOpen={isSearchBarOpen} setIsOpen={setIsSearchBarOpen} />

      <NavMobileView routes={routes} isActiveLink={isActiveLink} />
    </>
  );
};

export default Navbar;
