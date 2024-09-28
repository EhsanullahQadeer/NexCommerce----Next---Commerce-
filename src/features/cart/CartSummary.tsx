import Link from "next/link";
import Shipping from "./Shipping";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { selectCart } from "@/store/slices/cart/cartSlice";
import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";
import { selectCoupenCode } from "@/store/slices/coupencode/coupenCodeSlice";
import useCurrency from "@/hooks/useCurrency";
const CartSummary = () => {
  const { totalAmount } = useSelector(selectCart);
  const { shipping_amount, free_shipping_threshold, vat_amount } =
    useSelector(selectSiteSetting);
  const { formatPrice, calculatePrice } = useCurrency();
  const { couponData } = useSelector(selectCoupenCode);
  const { discount_type, discount_amount, discount_percentage } =
    couponData || {};

  const discountAmount = couponData
    ? discount_type === "percentage"
      ? totalAmount * (discount_percentage / 100)
      : calculatePrice(discount_amount, couponData.currency_id)
    : 0;

  const shippingFee =
    totalAmount >= parseInt(free_shipping_threshold)
      ? 0
      : parseInt(shipping_amount);

  const vatFee =
 Number(vat_amount) > 0
      ? totalAmount * (Number(vat_amount)/ 100)
      : 0;

  const calculatedTotalAmount =
    totalAmount + vatFee + shippingFee - discountAmount;
  return (
    <div className="w-full lg:max-w-[336px] bg-[#f9f9f9] px-[30px] py-[25px] border border-dashed border-[#d7d7d7] rounded-[3px]">
      <h3 className="border-b border-black-600 text-base font-medium pb-[17px]">
        Cart Total
      </h3>
      <div className="flex justify-between items-center min-h-[70px] border-b border-black-300">
        <h4 className="text-black-75">Subtotal:</h4>
        <span className="text-black-100 text-base">
          {formatPrice(totalAmount)}
        </span>
      </div>
      <Shipping {...{ discountAmount, shippingFee ,vatFee}} />
      {/* <div className="border-b border-black-300 py-[14px] pb-[23px]">
        <h4 className="text-black-75 leading-[22.88px]">
          Estimate for your country
        </h4>
        <Link
          href="/dashboard"
          className="text-sm font-light text-black-200 underline leading-[20.02px] mt-[6px] hover:text-primary"
        >
          Change address
        </Link>
      </div> */}
      <div className="flex items-center justify-between min-h-[70px] text-base text-primary font-light">
        <h4>Total:</h4>
        <span>{formatPrice(calculatedTotalAmount)}</span>
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
