"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";
import {
  clearCoupon,
  selectCoupenCode,
} from "@/store/slices/coupencode/coupenCodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useCart from "@/hooks/useCart";
const CouponInput = () => {
  const { handleApplyCoupon } = useCart();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isFocused, setisFocused] = useState(false);
  const { couponData, coupon_code } = useSelector(selectCoupenCode);
  console.log('coupon_code: ', coupon_code);

  const [couponCode, setCouponCode] = useState(coupon_code);
  const handleCoupon = async () => {
    if (coupon_code) {
      dispatch(clearCoupon());
      setCouponCode("");
      toast.warning("Your coupon has been cleared.");
    } else {
      const response = await handleApplyCoupon(couponCode);
      response?.clear && setCouponCode("");
    }
  };
  return (
    <div className="mt-10 flex gap-2">
      <div className="group relative max-w-[340px]">
        <input
          ref={inputRef}
          type="text"
          className="w-full h-10 py-2 px-[11px] border border-dashed border-[#d7d7d7] rounded-[3px] !outline-none focus:border-primary"
          onBlur={() => setisFocused(false)}
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
          disabled={couponData ? true : false}
        />
        {!couponCode && (
          <label
            className={cn(
              "absolute inline-block py-2.5 top-0 left-0 bottom-0 h-full leading-[40px] w-full text-sm overflow-hidden text-nowrap text-ellipsis px-[11px] transition-all duration-[0.35s]",
              isFocused && "opacity-0"
            )}
            onClick={() => {
              setisFocused(true);
              inputRef?.current?.focus();
            }}
          >
            Have a coupon?{" "}
            <span className="text-primary">Click here to enter your code</span>
          </label>
        )}
      </div>
      <Button
        variant={couponCode ? "outlined" : "disabled"}
        className="justify-center !p-0 h-10 w-10 rounded-[3px] "
        onClick={handleCoupon}
      >
        <i
          className={`las ${
            coupon_code ? "la-times" : "la-long-arrow-alt-right"
          }`}
        ></i>
      </Button>
    </div>
  );
};

export default CouponInput;
