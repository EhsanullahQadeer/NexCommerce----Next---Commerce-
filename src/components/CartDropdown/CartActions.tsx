'use client';

import { useRouter } from 'next/navigation';
import Button from '../Button';

const CartDropdownActions = () => {
  const router = useRouter();
  return (
    <div className="pt-2.5 pb-[5px]">
      <div className="flex justify-between items-center">
        <span>Total</span>
        <span>$160.00</span>
      </div>
      <div className="flex justify-between items-center">
        <Button
          size="xs"
          variant="primary"
          className="!max-w-[110px] w-full mt-[11px]"
          onClick={() => router.push('/cart')}
        >
          View Cart
        </Button>
        <Button
          size="xs"
          className="!max-w-[116px] w-full mt-[11px]"
          onClick={() => router.push('/checkout')}
        >
          Checkout <i className="las la-long-arrow-alt-right ml-2.5"></i>
        </Button>
      </div>
    </div>
  );
};

export default CartDropdownActions;
