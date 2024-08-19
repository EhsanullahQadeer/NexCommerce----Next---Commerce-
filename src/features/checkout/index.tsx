import Button from '@/components/Button';
import Link from 'next/link';
import CheckoutSummary from './Summary';
import CouponInput from './CouponInput';
import Form from './Form';

const CheckoutComponent = () => {
  return (
    <div>
      <CouponInput />
      <div className="flex flex-col lg:flex-row pt-10 pb-[50px] gap-5">
        <div className="flex-1">
          <Form />
        </div>
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutComponent;
