import Link from 'next/link';
import Button from '@/components/Button';
import ShippingSummary from './ShippingSummary';

const linkStyles = 'text-black-100 text-black-75 lg:max-w-[138px] hover:text-primary';

const CheckoutSummary = () => {
  return (
    <div className="w-full lg:max-w-[336px] bg-[#f9f9f9] px-[30px] py-[25px] border border-dashed border-[#d7d7d7] rounded-[3px]">
      <h3 className="border-b border-black-600 text-base font-normal pb-[17px]">
        Your Order
      </h3>

      <div className="flex justify-between items-center min-h-[27px] mt-[21px]">
        <h4 className="text-black-100 text-base text-black-75">Product</h4>
        <span className="text-black-100 text-base">Total</span>
      </div>

      <div className="flex justify-between items-center min-h-[70px] border-b border-black-300 text-sm font-extralight">
      <Link href='#' className={linkStyles}>Beige knitted elastic runner shoes</Link>
        <span className="text-black-100">$84.00</span>
      </div>

      <div className="flex justify-between items-center min-h-[70px] border-b border-black-300 text-sm font-extralight">
        <Link href='#' className={linkStyles}>Blue utility pinafore denimdress</Link>
        <span className="text-black-100">$76.00</span>
      </div>
      
      <div className="flex items-center justify-between min-h-[70px] text-base text-black-75 font-light border-b border-black-300">
        <h4>Subtotal:</h4>
        <span>$160.00</span>
      </div>

      <div className="flex items-center justify-between min-h-[70px] text-sm text-black-75 font-extralight border-b border-black-300">
        <h4>Shipping</h4>
        <span>Free shipping</span>
      </div>

      <div className="flex items-center justify-between min-h-[70px] text-base text-primary font-light border-b border-black-300">
        <h4>Subtotal:</h4>
        <span>$160.00</span>
      </div>

      <ShippingSummary />

      <div>
        <Button className="uppercase w-full max-w-full justify-center">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
