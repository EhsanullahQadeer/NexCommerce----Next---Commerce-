import ColourImageBox from '@/components/ColourImageBox';
import NumberInput from '@/components/NumberInput/NumberInput';
import Description from '@/components/ProductDetails/Description';
import Select from '@/components/Select';
import LinkButton from './LinkButton';
import Button from '@/components/Button';
import Link from 'next/link';
import SocialMobileIcons from '@/components/Navbar/elements/SocialMobileIcons';

const ProductDetails = () => {
  const sizes = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' },
  ];
  return (
    <div>
      <Description />
      <div className="flex items-center mb-5">
        <Label text="Color" />
        <ColourImageBox />
      </div>
      <div className="flex items-center mb-5">
        <Label text="Size" />
        <Select options={sizes} label="Select a size" />
      </div>
      <div className="flex items-center">
        <Label text="Qty" />
        <NumberInput />
      </div>
      <div className="flex items-center mb-5 mt-[50px] mb-10">
        <LinkButton url="#" label="Add to whishlist" icon="lar la-heart" />
        <LinkButton url="#" label="Add to compare" icon="las la-random" />
      </div>
      <div className="mb-10">
        <Button
          className="h-[44px] uppercase !w-full !justify-center !tracking-[1.4px]"
          variant="outlined"
        >
          <i className="las la-cart-plus mr-1 text-lg"></i>Add to cart
        </Button>
      </div>
      <div className="flex items-center text-sm font-light text-black-500 tracking-[0.14px] leading-[16.8px] mb-[45px] pt-10 border-t border-black-300">
        <span className="mr-2">Category: </span>
        <Link href="#">women</Link>,{' '}
        <Link href="#" className="ml-1">
          Dresses
        </Link>
        ,{' '}
        <Link href="#" className="ml-1">
          Yellow
        </Link>
      </div>
      <div className="flex items-center mt-[45px]">
        <span className="mr-2 text-sm font-light text-black-500 tracking-[0.14px] leading-[16.8px]">Share: </span>
        <SocialMobileIcons variant="dark" className='!mt-0 !gap-[5px]' />
      </div>
    </div>
  );
};

const Label = ({ text }: { text: string }) => {
  return (
    <label className="inline-flex uppercase items-center w-[67px] text-sm font-light leading-[26.04px] text-black-75">
      {text}:{' '}
    </label>
  );
};

export default ProductDetails;
