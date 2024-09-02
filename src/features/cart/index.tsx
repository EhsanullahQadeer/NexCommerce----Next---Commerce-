'use client';
import Table from '@/components/Table';
// import { data, tableHeader } from './data';
import Button from '@/components/Button';
import CartSummary from './CartSummary';
import Input from '@/components/Input';
import Link from 'next/link';

const CartComponent = () => {
  return (
    <div className="flex flex-col lg:flex-row pt-10 pb-[50px] gap-5">
      <div className="flex-1">
        {/* <Table headers={tableHeader} /> */}
        <div className="flex flex-col items-start gap-y-2.5 sm:items-center sm:justify-between my-[30px] sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Input placeholder="coupon code" />
            <Button
              variant="outlined"
              className="justify-center !p-0 h-10 w-10"
            >
              <i className="las la-long-arrow-alt-right"></i>
            </Button>
          </div>
          <Button className="uppercase !h-10 justify-center !text-black-75 !border-black-300 hover:!bg-[#f5f6f9] hover:!text-primary">
            Update cart
            <i className="las la-sync ml-2.5"></i>
          </Button>
        </div>
      </div>
      <div>
        <CartSummary />
        <div>
          <Link href="/products" className='block my-[30px]'>
            <Button className='!w-full uppercase !h-10 justify-center !text-black-75 !border-black-300 hover:!bg-[#f5f6f9] hover:!text-primary'>
              Continue Shopping
              <i className="las la-sync ml-2.5"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
