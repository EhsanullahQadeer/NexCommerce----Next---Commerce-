"use client";
import Table from "@/components/Table";
import { tableHeader } from "./data";
import Button from "@/components/Button";
import CartSummary from "./CartSummary";
import Input from "@/components/Input";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "@/store/slices/cart/cartSlice";
import { useState } from "react";
import { useFetchCoupenCodeMutation } from "@/store/api/coupenCodeApi";
import {
  clearCoupon,
  selectCoupenCode,
  updateCoupenCode,
} from "@/store/slices/coupencode/coupenCodeSlice";
import { RESPONSE_MESSAGES } from "@/utility/constant";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import useCart from "@/hooks/useCart";

const CartComponent = () => {
  const { cartDetails, totalAmount } = useSelector(selectCart);
  const { couponData, coupon_code } = useSelector(selectCoupenCode);
  const [couponCode, setCouponCode] = useState(coupon_code);
  const dispatch = useDispatch();
  const {handleApplyCoupon}= useCart()
  

  const handleCoupon =async () => {
    if (coupon_code) {
      dispatch(clearCoupon())
      setCouponCode("")
      toast.warning("Your coupon has been cleared.");
    } else {
      const response = await handleApplyCoupon(couponCode);
      response?.clear && setCouponCode("");
    }
  };
  return (
    <div className="flex flex-col lg:flex-row pt-10 pb-[50px] gap-5">
      {cartDetails.length > 0 ? (
        <>
          <div className="flex-1">
            <Table headers={tableHeader} />
            <div className="flex flex-col items-start gap-y-2.5 sm:items-center sm:justify-between my-[30px] sm:flex-row">
              <div className="flex items-center gap-2.5">
                <Input
                  disabled={couponData}
                  placeholder="coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                <Button
                  className="justify-center !p-0 h-10 w-10"
                  onClick={handleCoupon}
                >
                  <i
                    className={`las ${
                      coupon_code ? "la-times" : "la-long-arrow-alt-right"
                    }`}
                  ></i>
                </Button>
              </div>
              {/* <Button className="uppercase !h-10 justify-center !text-black-75 !border-black-300 hover:!bg-[#f5f6f9] hover:!text-primary">
                Update cart
                <i className="las la-sync ml-2.5"></i>
              </Button> */}
            </div>
          </div>
          <div>
            <CartSummary />
            <div>
              <Link href="/products" className="block my-[30px]">
                <Button className="!w-full uppercase !h-10 justify-center !text-black-75 !border-black-300 hover:!bg-[#f5f6f9] hover:!text-primary">
                  Continue Shopping
                  <i className="las la-sync ml-2.5"></i>
                </Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 py-10">
          <h2 className="text-lg font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button className="uppercase !h-10 justify-center !text-black-75 !border-black-300 hover:!bg-[#f5f6f9] hover:!text-primary">
              Browse Products
              <i className="las la-arrow-right ml-2.5"></i>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
