import Image from 'next/image';
import Link from 'next/link';

const CartList = () => {
  return (
    <div className="flex items-center border-b border-[#ebebeb] py-4">
      <Link href="/products" className="flex items-center">
        <div className="max-w-[150px]">
          <h4 className="font-light text-[13px] text-black-100 leading-[16.9px]">
            Beige knitted elastic runner shoes
          </h4>
          <span className='font-light text-[13px] text-black-200'>
            <span>1</span>
            <span> x $84.00</span>
          </span>
        </div>
        <Image
          src="/products/product-1.jpg"
          height={60}
          width={60}
          alt="Product image"
        />
      </Link>
      <span className='flex h-6 w-6 items-center justify-end'>
        <i className="las la-times cursor-pointer text-[13px] text-[#cccccc]"></i>
      </span>
    </div>
  );
};

export default CartList;
