import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Container from '@/components/Container';
import NumberInput from '@/components/NumberInput/NumberInput';

const StickyBarBottom: FC = () => {
  return (
    <div className="fixed bottom-0 w-full hidden bg-white lg:block py-2.5 z-[10]">
      <Container>
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-5">
            <Link href="#">
              <Image
                src="/product.jpg"
                alt="Product image"
                height={60}
                width={60}
              />
            </Link>
            <h4>
              <Link
                href="#"
                className="text-black-75 font-light tracking-[-0.4px] leading-[20px] mb-2 hover:text-primary"
              >
                Dark yellow lace cut out swing dress
              </Link>
            </h4>
          </div>
          <div className="flex items-center gap-5">
            <span className='text-primary font-light'>$84.00</span>
            <NumberInput />
            <Button variant="outlined" size="xs" className='group !w-[200px] h-10 justify-center items-center'>
              <i className="las la-cart-plus text-primary text-lg group-hover:text-white mr-2"></i>
              add to cart
            </Button>
            <Link href="#" className=''>
              <i className="lar la-heart text-lg text-primary"></i>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StickyBarBottom;
