import Image from 'next/image';
import Link from 'next/link';
import FooterCopyRight from './elements/FooterCopyRight';
import Container from '../Container';
import SocialIcons from '../SocialIcons';
import { footerlinks } from './elements/data';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-black-300 pt-[60px]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-[22px]">
          <div className='mb-10'>
            <Link href="/" className="inline-block mb-3">
              <Image alt="" src="/logo.png" height={24} width={105} />
            </Link>
            <p className="font-extralight text-sm text-gray-500 leading-[26.04px] mb-8 max-w-[260px]">
              Praesent dapibus, neque id cursus ucibus, tortor neque egestas
              augue, eu vulputate magna eros eu erat.{' '}
            </p>
            <SocialIcons variant="dark" size="lg" className="!justify-start" />
          </div>
          {
            footerlinks.map(cat => (
              <div className='mb-10' key={cat.category}>
                <h4 className="text-base text-black-75 font-semibold mb-4 tracking-[-0.16px]">{cat.category}</h4>
                <ul className='flex flex-col'>
                  {cat.links.map((link, index) => (
                    <li key={index} className='leading-[26.04px] mb-1'>
                      <Link href={link.url} className='font-extralight text-sm text-gray-500'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          }
        </div>
        <FooterCopyRight />
      </Container>
    </footer>
  );
};

export default Footer;
