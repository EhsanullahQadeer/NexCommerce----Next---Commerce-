'use client';

import Radio from '@/components/Radio';
import { selectCart } from '@/store/slices/cart/cartSlice';
import { selectCoupenCode } from '@/store/slices/coupencode/coupenCodeSlice';
import { selectSiteSetting } from '@/store/slices/siteSetting/siteSettingSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Shipping = () => {
  const { totalAmount } = useSelector(selectCart)
  const { coupon_code} = useSelector(selectCoupenCode)
  console.log("totalAmount--- ",totalAmount);

  
  
  const { shipping_amount, free_shipping_threshold } = useSelector(selectSiteSetting)
  // const [selectedItem, setSelectedItem] = useState<string | null>(null);
  return (
    <form>
       <h4 className="text-black-75 leading-[56px]">Shipping:</h4>
      <div className="flex justify-between items-center py-[5px]">
        {/* <Radio
          label={
            totalAmount >= parseInt(free_shipping_threshold) ? "Free Shipping" : "Shipping Charge"
          }
          className="text-black-75 font-light text-sm"
          name="shipping"
          value="shipping"
          checked={selectedItem === 'shipping'}
          onChange={(e: any) => setSelectedItem(e.target.value)}
        /> */}
         <span className="text-black-75 font-light text-sm">
          {
            totalAmount >= parseInt(free_shipping_threshold) ? "Free Shipping" : "Shipping Charge"
          }
          
        </span>
        <span className="text-black-75 font-light text-sm">
          {
            totalAmount >= parseInt(free_shipping_threshold) ? "$0.00" : `$${shipping_amount}`
          }
          
        </span>
      </div>
      <h4 className="text-black-75 leading-[56px]">Discount:</h4>
      <div className="flex justify-between items-center py-[5px]">
        {/* <Radio
          label={
            totalAmount >= parseInt(free_shipping_threshold) ? "Free Shipping" : "Shipping Charge"
          }
          className="text-black-75 font-light text-sm"
          name="shipping"
          value="shipping"
          checked={selectedItem === 'shipping'}
          onChange={(e: any) => setSelectedItem(e.target.value)}
        /> */}
         <span className="text-black-75 font-light text-sm">
          {
            totalAmount >= parseInt(free_shipping_threshold) ? "Free Shipping" : "Shipping Charge"
          }
          
        </span>
        <span className="text-black-75 font-light text-sm">
          {
            totalAmount >= parseInt(free_shipping_threshold) ? "$0.00" : `$${shipping_amount}`
          }
          
        </span>
      </div>
      {/* <div className="flex justify-between items-center py-[5px]">
        <Radio
          label="Standard:"
          className="text-black-75 font-light text-sm"
          name="shipping"
          value="standard"
          checked={selectedItem === 'standard'}
          onChange={(e: any) => setSelectedItem(e.target.value)}
        />
        <span className="text-black-75 font-light text-sm">$10.00</span>
      </div>
      <div className="flex justify-between items-center py-[5px]">
        <Radio
          label="Express:"
          className="text-black-75 font-light text-sm"
          name="shipping"
          value="express"
          checked={selectedItem === 'express'}
          onChange={(e: any) => setSelectedItem(e.target.value)}
        />
        <span className="text-black-75 font-light text-sm">$20.00</span>
      </div> */}
    </form>
  );
};

export default Shipping;
