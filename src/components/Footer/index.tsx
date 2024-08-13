import Link from 'next/link';
import { icons } from './icons';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="font-extralight text-sm text-gray-500 mt-auto">
      <div className="max-w-container mx-auto px-2.5">
        <div className="flex items-center flex-col-reverse md:flex-row justify-between py-[22px] border-t border-black-300 gap-3">
          <div className="flex items-center flex-col-reverse md:flex-row gap-2">
            <p className="leading-[26.04px]">
              Copyright © 2019 Molla Store. All Rights Reserved.
            </p>
            <ul className="flex items-center gap-2.5 ml-[6px]">
              <li>
                <Link
                  href=""
                  className="shadow-[0_1px_0_#b5b5b5] hover:text-primary hover:shadow-[0_1px_0_#cc9966]"
                  style={{ transition: 'color 0.3s ease' }}
                >
                  Terms of Use
                </Link>
              </li>
              <li className="w-[1px] h-3 bg-[#b5b5b5]" />
              <li>
                <Link
                  href=""
                  className="shadow-[0_1px_0_#b5b5b5] hover:text-primary hover:shadow-[0_1px_0_#cc9966]"
                  style={{ transition: 'color 0.3s ease' }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center gap-5">
            {icons.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                target="_blank"
                className="flex items-center"
              >
                <i
                  className={cn('la text-lg hover:text-primary', item.icon)}
                ></i>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
