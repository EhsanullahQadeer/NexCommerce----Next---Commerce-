import { FC, Fragment } from 'react';
import Link from 'next/link';
import { footerCopyrightLinks } from './data';
import FooterSocialIcons from './SocialIcons';

interface FooterCopyRightProps {
  hideSocialIcons?: boolean;
}

const FooterCopyRight: FC<FooterCopyRightProps> = ({ hideSocialIcons }) => {
  return (
    <div className="font-extralight text-sm text-gray-500 flex items-center flex-col-reverse md:flex-row justify-between py-[22px] border-t border-black-300 gap-3">
      <div className="flex items-center flex-col-reverse md:flex-row gap-2">
        <p className="text-center leading-[26.04px]">
          Copyright © 2019 Molla Store. All Rights Reserved.
        </p>
        <FooterLinks />
      </div>
      {!hideSocialIcons && <FooterSocialIcons />}
    </div>
  );
};

export const FooterLinks = () => {
  return (
    <ul className="flex items-center gap-2.5 ml-[6px] font-extralight text-sm text-gray-500">
      {footerCopyrightLinks.map((link, index) => (
        <Fragment key={index}>
          <li>
            <Link
              href={link.url}
              className="shadow-[0_1px_0_#b5b5b5] hover:text-primary hover:shadow-[0_1px_0_#cc9966]"
              style={{ transition: 'color 0.3s ease' }}
              aria-label={link.name}
            >
              {link.name}
            </Link>
          </li>
          {footerCopyrightLinks.length > index + 1 && (
            <li className="w-[1px] h-3 bg-[#b5b5b5]" />
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default FooterCopyRight;
