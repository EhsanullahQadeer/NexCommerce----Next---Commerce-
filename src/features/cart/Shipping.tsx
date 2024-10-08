"use client";

import Radio from "@/components/Radio";
import useCurrency from "@/hooks/useCurrency";
import { selectCart } from "@/store/slices/cart/cartSlice";
import { selectCoupenCode } from "@/store/slices/coupencode/coupenCodeSlice";
import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
interface Iprops {
  discountAmount: number;
  shippingFee: number;
  vatFee: number;
}
const Shipping = (props: Iprops) => {
  const { discountAmount, shippingFee, vatFee } = props;
  const { formatPrice } = useCurrency();
  const { totalAmount } = useSelector(selectCart);
  const { free_shipping_threshold, shipping_amount } =
    useSelector(selectSiteSetting);
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
        <span className="text-black-75 font-light text-sm">Shipping</span>
        <span className="text-black-75 font-light text-sm">
          {totalAmount >= parseInt(free_shipping_threshold) ? (
            <strong>
              <span>Free</span>
              <span className="line-through text-red-500 ml-2">
                {formatPrice(Number(shipping_amount))}
              </span>
            </strong>
          ) : (
            formatPrice(shippingFee)
          )}
        </span>
      </div>

      {vatFee ? (
        <React.Fragment>
          <h4 className="text-black-75 leading-[56px]">Value Added Tax:</h4>
          <div className="flex justify-between items-center py-[5px]">
            <span className="text-black-75 font-light text-sm">VAT Charge</span>
            <span className="text-black-75 font-light text-sm">
              {formatPrice(vatFee)}
            </span>
          </div>
        </React.Fragment>
      ) : (
        ""
      )}
      {discountAmount ? (
        <React.Fragment>
          <h4 className="text-black-75 leading-[56px]">Discount:</h4>
          <div className="flex justify-between items-center py-[5px]">
            <span className="text-black-75 font-light text-sm">Discount</span>
            <span className="text-black-75 font-light text-sm">
              {formatPrice(discountAmount)}
            </span>
          </div>
        </React.Fragment>
      ) : (
        ""
      )}

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
