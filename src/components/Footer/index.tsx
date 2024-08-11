import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="font-extralight text-sm text-gray-500 mt-auto">
      <div className="max-w-container mx-auto px-2.5">
        <div className="flex items-center py-[22px] border-t border-black-300">
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
      </div>
    </footer>
  );
};

export default Footer;
