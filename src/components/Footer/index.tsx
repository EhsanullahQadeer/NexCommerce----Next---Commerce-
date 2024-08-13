import Image from 'next/image';
import Container from '../Container';
import FooterCopyRight from './elements/FooterCopyRight';
import Link from 'next/link';
import SocialMobileIcons from '../Navbar/elements/SocialMobileIcons';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-black-300 pt-[60px]">
      <Container>
        <div className="grid grid-cols-4 gap-5 pb-[22px]">
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image alt="" src="/logo.png" height={24} width={105} />
            </Link>
            <p className='mb-8'>
              Praesent dapibus, neque id cursus ucibus, tortor neque egestas
              augue, eu vulputate magna eros eu erat.{' '}
            </p>
            <SocialMobileIcons variant="dark" />
          </div>
        </div>
        <FooterCopyRight />
      </Container>
    </footer>
  );
};

export default Footer;
