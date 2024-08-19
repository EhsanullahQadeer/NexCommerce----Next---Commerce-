import { useState } from 'react';
import Collapse from '@/components/Collapse';
import Radio from '@/components/Radio';

const methods = [
  {
    label: 'Direct bank transfer',
    text: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
  },
  {
    label: 'Checkout payments',
    text: 'Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.',
  },
  {
    label: 'Cash on delivery',
    text: 'Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.',
  },
  {
    label: 'Paypal',
    text: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.',
  },
  {
    label: 'Stripe',
    text: 'Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit ame.',
  },
];

const ShippingSummary = () => {
  const [selectedMethod, setSelectedMethod] = useState(0);
  return (
    <div className='py-3'>
      {methods.map((method, index) => (
        <div key={index}>
          <div>
            <Radio
              label={method.label}
              checked={selectedMethod === index}
              onChange={() => setSelectedMethod(index)}
            />
          </div>
            <div className='overflow-hidden pl-6 py-1'>
              <Collapse isOpen={selectedMethod === index}>
                <p className='text-xs font-extralight text-black-200 leading-[20.04px]'>{method.text}</p>
              </Collapse>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ShippingSummary;
