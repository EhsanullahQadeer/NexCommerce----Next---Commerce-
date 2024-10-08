import Link from "next/link";
import Button from "@/components/Button";
import ShippingSummary from "./ShippingSummary";
import { selectCart } from "@/store/slices/cart/cartSlice";
import { useSelector } from "react-redux";
import useCurrency from "@/hooks/useCurrency";
import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";
import { selectCoupenCode } from "@/store/slices/coupencode/coupenCodeSlice";

const linkStyles =
  "text-black-100 text-black-75 lg:max-w-[138px] hover:text-primary";

const CheckoutSummary = () => {
  const { totalAmount, cartDetails } = useSelector(selectCart);
  const { couponData } = useSelector(selectCoupenCode);
  const { formatPrice, calculatePrice } = useCurrency();

  const { shipping_amount, free_shipping_threshold, vat_amount } =
    useSelector(selectSiteSetting);
  const { discount_type, discount_amount, discount_percentage } =
    couponData || {};
  console.log("vat_amount: ", vat_amount);

  const shippingFee =
    totalAmount >= Number(free_shipping_threshold)
      ? 0
      : Number(shipping_amount);

  const discountAmount = couponData
    ? discount_type === "percentage"
      ? totalAmount * (discount_percentage / 100)
      : calculatePrice(discount_amount, couponData.currency_id)
    : 0;

  const vatFee =
    Number(vat_amount) > 0 ? totalAmount * (Number(vat_amount) / 100) : 0;

  const calculatedTotalAmount =
    totalAmount + vatFee + shippingFee - discountAmount;

  return (
    <div className="w-full lg:max-w-[336px] bg-[#f9f9f9] px-[30px] py-[25px] border border-dashed border-[#d7d7d7] rounded-[3px]">
      <h3 className="border-b border-black-600 text-base font-normal pb-[17px]">
        Your Order
      </h3>

      <div className="flex justify-between items-center min-h-[27px] mt-[21px]">
        <h4 className="text-base text-black-75">Product</h4>
        <span className="text-black-100 text-base">Total</span>
      </div>
      {cartDetails.map((productItem, idx) => {
        const {
          product: { price, currency_id, name, slug },
          quantity,
        } = productItem;
        return (
          <div
            key={"product" + slug + idx}
            className="flex justify-between items-center min-h-[70px] border-b border-black-300 text-sm font-extralight"
          >
            <Link href={`/products/${slug}`} className={linkStyles}>
              {name}
            </Link>
            <span className="text-black-100">
              {formatPrice(price * quantity, currency_id)}
            </span>
          </div>
        );
      })}

      {/* <div className="flex justify-between items-center min-h-[70px] border-b border-black-300 text-sm font-extralight">
        <Link href="#" className={linkStyles}>
          Blue utility pinafore denimdress
        </Link>
        <span className="text-black-100">$76.00</span>
      </div> */}

      <div className="flex items-center justify-between min-h-[70px] text-base text-black-75 font-light border-b border-black-300">
        <h4>Subtotal:</h4>
        <span> {formatPrice(totalAmount)}</span>
      </div>

      <div className="flex items-center justify-between min-h-[70px] text-sm text-black-75 font-extralight border-b border-black-300">
        <h4>Shipping</h4>

        <span>
          {shippingFee > 0 ? (
            formatPrice(shippingFee)
          ) : (
            <>
              <strong>
                <span>Free</span>
                <span className="line-through text-red-500 ml-2">
                  {formatPrice(Number(shipping_amount))}
                </span>
              </strong>
            </>
          )}
        </span>
      </div>
      {vatFee ? (
        <div className="flex items-center justify-between min-h-[70px] text-sm text-black-75 font-extralight border-b border-black-300">
          <h4>VAT Charge:</h4>
          <span>{formatPrice(vatFee)}</span>
        </div>
      ) : (
        ""
      )}

      {discountAmount ? (
        <div className="flex items-center justify-between min-h-[70px] text-sm text-black-75 font-extralight border-b border-black-300">
          <h4>Discount:</h4>
          <span> {formatPrice(discountAmount)}</span>
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center justify-between min-h-[70px] text-base text-primary font-light border-b border-black-300">
        <h4>Total:</h4>
        <span>{formatPrice(calculatedTotalAmount)}</span>
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
