import Link from 'next/link';
import Shipping from './Shipping';
import Button from '@/components/Button';
import { useSelector } from 'react-redux';
import { selectCart } from '@/store/slices/cart/cartSlice';

const CartSummary = () => {
  const { totalAmount } = useSelector(selectCart)
  
  return (
    <div className="w-full lg:max-w-[336px] bg-[#f9f9f9] px-[30px] py-[25px] border border-dashed border-[#d7d7d7] rounded-[3px]">
      <h3 className="border-b border-black-600 text-base font-medium pb-[17px]">
        Cart Total
      </h3>

      <div className="flex justify-between items-center min-h-[70px] border-b border-black-300">
        <h4 className="text-black-100 text-base text-black-75">Subtotal:</h4>
        <span className="text-black-100 text-base">${totalAmount.toFixed(2) || 0}</span>
      </div>

     

      <Shipping />


      <div className="border-b border-black-300 py-[14px] pb-[23px]">
        <h4 className="text-black-75 leading-[22.88px]">
          Estimate for your country
        </h4>
        <Link
          href="/dashboard"
          className="text-sm font-light text-black-200 underline leading-[20.02px] mt-[6px] hover:text-primary"
        >
          Change address
        </Link>
      </div>

      <div className="flex items-center justify-between min-h-[70px] text-base text-primary font-light">
        <h4>Total:</h4>
        <span>$160.00</span>
      </div>

      <div>
        <Button className="uppercase w-full max-w-full justify-center">
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
