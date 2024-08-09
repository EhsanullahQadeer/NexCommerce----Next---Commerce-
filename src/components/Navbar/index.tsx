'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NavLink from './elements/NavLink';
import NotificationIcon from './elements/NotificationIcon';
import { routes } from './routes';
import SearchBar from '../SearchBar';
import CartDropdown from '../CartDropdown/CartDropdown';

const Navbar = () => {
  const pathname = usePathname();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const isActiveLink = (path: string) => path === pathname;

  return (
    <header className="bg-white w-full">
      <div className="relative flex w-container items-center justify-between mx-auto px-2.5">
        <div className="flex">
          <Link href="/">
            <span className="sr-only">Molla</span>
            <Image alt="" src="/logo.png" height={20} width={82} />
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          {routes.map((item) => (
            <NavLink
              key={item.url}
              {...item}
              isActive={isActiveLink(item.url)}
            />
          ))}
        </nav>
        <div className="flex items-center gap-[1.5rem]">
          <div onClick={() => setIsSearchBarOpen(true)}>
            <NotificationIcon
              icon={'las la-search'}
              iconClass="text-black-75"
            />
          </div>
          <NotificationIcon
            icon="lar la-heart"
            iconClass="!text-[28px]"
            count={3}
          />
          <CartDropdown />
        </div>

        <SearchBar isOpen={isSearchBarOpen} setIsOpen={setIsSearchBarOpen} />
      </div>
    </header>
  );
};

export default Navbar;
