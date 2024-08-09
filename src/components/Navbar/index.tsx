'use client';

import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Categories', href: '/categories' },
  { name: 'Products', href: '/products' },
];

const Navbar = () => {
  return (
    <header className="bg-white w-full">
      <nav
        aria-label="Global"
        className="flex items-center justify-between max-w-[1188px] mx-auto px-2.5"
      >
        <div className="flex">
          <Link href="/">
            <span className="sr-only">Molla</span>
            <Image alt="" src="/logo.png" height={20} width={82} />
          </Link>
        </div>

        <div className="flex items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="h-[60px] text-sm uppercase text-[#222] flex items-center px-6"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <div className="h-8 w-8">
            <i className="bi bi-search text-lg text-[#666666]"></i>
          </div>
          <div className="h-8 w-8">
            <i className="bi bi-heart text-lg text-[#666666]"></i>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8">
              <i className="bi bi-cart text-lg text-[#666666]"></i>
            </div>
            <span className="cart-txt text-[13px] text-[#222]">$ 164,00</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
