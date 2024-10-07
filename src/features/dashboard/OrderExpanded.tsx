import Button from "@/components/Button";
import useCurrency from "@/hooks/useCurrency";
import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface ORDERS {
  id: number;
  imageUrl: string;
  order_num: string;
  statusIcon: string;
  details: string;
  user_id: number;
  coupon_id: number;
  currency_id: number;
  total_amount: number;
  vat_amount: string;
  discount_amount: string;
  shipping_amount: string;
  paid_amount: string;
  status: string;
  note: string;
  order_date: string;
  shipping_address_id: number;
  billing_address_id: number;
  items: Array<{
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price_at_order: number;
    sub_total: number;
    variant_id: number;
    product: {
      id: number;
      name: string;
      slug: string;
      image: string;
      small_image: string;
      medium_image: string;
      description: string;
      price: number;
      additional_description: string;
      additional_info: string;
      shipping_return: string;
      meta_title: null;
      meta_desc: null;
      is_active: number;
      is_deleted: number;
      currency_id: number;
      current_details: {
        id: number;
        currency_code: string;
        currency_name: string;
        exchange_rate_to_usd: string;
      };
    };
  }>;
  order_shipping_address: {
    id: number;
    order_id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  order_billing_address: {
    id: number;
    order_id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  payment: {
    id: number;
    order_id: number;
    total_amount: number;
    payment_method: string;
    payment_date: string;
    transaction_id: string;
    payment_status: string;
  };
  user: {
    id: number;
    user_role_id: number;
    name: string;
    surname: string;
    email: string;
    email_verified_at: null;
    verification_code: number;
    is_active: number;
    is_deleted: number;
  };
  coupon: {
    id: number;
    coupon_code: string;
    discount_type: string;
    discount_percentage: number;
    discount_amount: number;
    expiry_date: string;
    minimum_order_amount: number;
    one_time_use: number;
    currency_id: null;
  };
}

interface OrderExpandedProps {
  order: ORDERS;
}

const OrderExpanded = ({ order }: OrderExpandedProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { shipping_amount } = useSelector(selectSiteSetting);
  const { formatPrice } = useCurrency();
  const currency_id = order?.currency_id ?? 2;

  return (
    <div className="my-4">
      <div className="border border-black-600 rounded-lg">
        <div className="border-b px-4 py-3 flex justify-between flex-col md:flex-row">
          <div className="flex gap-2">
            <h6 className="text-black-500 text-sm font-bold m-0 p-0 flex items-center">
              ABC Electronics
            </h6>
            <Button
              size="xs"
              variant="primary"
              className="!rounded-lg !text-xs !p-0 !px-3 hover:!bg-primary"
            >
              Track
            </Button>
          </div>
        </div>
        <div className="flex justify-between w-full flex-col md:flex-row">
          <div className="md:w-[50%] flex p-4 px-2 flex-col md:flex-row justify-center md:justify-start items-center md:items-start">
            <div className="flex md:w-[20%] p-2">
              <Image
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  order?.items[0]?.product?.medium_image
                }
                alt="product"
                width={70}
                height={70}
                className="rounded "
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-black-500 font-normal text-sm leading-[30.1px]">
                {order?.items[0]?.product?.name}
              </p>
              <p className="text-green-600 font-bold text-md">
                {formatPrice(
                  order?.items[0]?.product?.price,
                  order?.items[0]?.product?.currency_id ?? 2
                )}
              </p>
              <div className="flex mt-2 gap-2 flex-col md:flex-row">
                <Button
                  size="xs"
                  variant="primary"
                  className="!rounded-lg !p-0 !px-3 !py-1 !font-semibold hover:!bg-black-300 !bg-black-300 !border-black-300 !text-black-500 !text-xs"
                >
                  Buy again
                </Button>
                <Button
                  size="xs"
                  variant="primary"
                  className="!rounded-lg !p-0 !px-3 !py-1 hover:!bg-primary !text-xs"
                >
                  Rate the product
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:mt-0 md:w-[50%] bg-green-50 overflow-hidden">
            <div className="border-b p-4 flex items-center gap-4">
              <div className="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center">
                <i className="las la-truck text-white text-2xl"></i>
              </div>

              <div>
                <p className="text-black-75 font-bold text-sm mb-1">
                  {order?.status}
                </p>
                <p className="text-green-600 font-light text-xs">
                  Date:{" "}
                  <span className="font-semibold">{order?.order_date}</span>
                </p>
                <p className="text-green-600 font-light text-xs">
                  Received by: <span className="font-semibold">John Doe</span>
                </p>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-4]">
              <p className="text-black-500 text-xs flex items-center w-[50%]">
                <i className="las la-truck mr-2 text-2xl"></i>
                <span className="">Cargo tracking</span>
              </p>
              <p className="text-black-500 text-xs flex items-center w-[50%]">
                <i className="las la-file-invoice mr-2 text-2xl"></i>
                <span className="">View Invoice</span>
              </p>
              <p className="text-black-500 text-xs flex items-center w-[50%] mt-4">
                <i className="las la-truck mr-2 text-2xl"></i>
                <span className="">Returns and other requests</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 pr-2">
          <h3 className="text-black-75 text-lg mb-2">Address Information</h3>
          <div className="border border-black-600 rounded-lg p-4">
            <p className="text-sm mb-2 font-semibold text-black-75">
              Shipping Address
            </p>
            <p className="text-black-75 text-xs flex items-center font-bold">
              {order?.order_shipping_address?.first_name}{" "}
              {order?.order_shipping_address?.last_name}
            </p>

            <p className="text-black-500 text-xs flex items-center">
              {order?.order_shipping_address?.postal_code},{" "}
              {order?.order_shipping_address?.address_line1},{" "}
              {order?.order_shipping_address?.address_line2},{" "}
              {order?.order_shipping_address?.city},{" "}
              {order?.order_shipping_address?.state}
            </p>
            {/* <p className="text-black-500 text-xs flex items-center">
              Springfield
            </p> */}
            <p className="text-black-500 text-xs flex items-center">
              {order?.order_shipping_address?.country}
            </p>
          </div>

          <div className="border border-black-600 rounded-lg p-4 mt-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => {
                if (expanded !== order.id) setExpanded(order.id);
                else setExpanded(null);
              }}
            >
              <p className="text-sm mb-2 font-semibold text-black-75">
                Billing Address
              </p>
              <i
                className={`las ${
                  expanded === order.id ? "la-angle-up" : "la-angle-down"
                } text-lg font-bold`}
              ></i>
            </div>
            {expanded == order.id && (
              <div>
                <p className="text-black-75 text-xs flex items-center font-bold">
                  {order?.order_billing_address?.first_name}{" "}
                  {order?.order_billing_address?.last_name}
                </p>

                <p className="text-black-500 text-xs flex items-center">
                  {order?.order_billing_address?.postal_code},{" "}
                  {order?.order_billing_address?.address_line1},{" "}
                  {order?.order_billing_address?.address_line2},{" "}
                  {order?.order_billing_address?.city},{" "}
                  {order?.order_billing_address?.state}
                </p>
                {/* <p className="text-black-500 text-xs flex items-center">
                  Springfield
                </p> */}
                <p className="text-black-500 text-xs flex items-center">
                  {order?.order_billing_address?.country}
                </p>
                <p className="text-black-75 text-xs flex items-center font-bold">
                  {/* **** **** **** 1234 {order?.payment?.transaction_id} */}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 pl-2 mt-0 md:mt-0">
          <h3 className="text-black-75 text-lg mb-2">Payment Information</h3>
          <div className="border border-black-600 rounded-lg p-4 mt-0">
            <div className="flex gap-4 mb-4">
              <div className="w-[30%]">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    order?.items[0]?.product?.small_image
                  }
                  alt="Product"
                  width={70}
                  height={50}
                  className="rounded"
                />
              </div>
              <div>
                <p className="font-semibold text-green-600 text-sm">
                  {formatPrice(order.total_amount, order.currency_id ?? 2)}
                </p>
                <p className="text-black-75 text-xs flex items-center font-bold">
                  {/* **** **** **** 1234 */} {order?.payment?.transaction_id}
                </p>
                <p className="text-black-500 text-xs flex items-center">
                  {order?.payment?.payment_method}
                </p>
              </div>
            </div>
            <div className="border-t mt-4">
              <div className="flex justify-between my-2">
                <p className="text-black-500 text-sm flex items-center">
                  Cargo
                </p>
                <p className="text-black-75 text-sm flex items-center font-semibold">
                  {Number(order?.shipping_amount) === 0 ? (
                    <>
                      <span>Free</span>
                      <span className="line-through text-red-500 ml-2">
                        {formatPrice(Number(shipping_amount))}
                      </span>
                    </>
                  ) : (
                    formatPrice(Number(order?.shipping_amount), currency_id)
                  )}
                </p>
              </div>
              <div className="flex justify-between my-2">
                <p className="text-black-500 text-sm flex items-center">
                  Products
                </p>
                <p className="text-black-75 text-sm flex items-center font-semibold">
                  {formatPrice(order.total_amount, currency_id)}
                </p>
              </div>
              {Number(order?.vat_amount) ? (
                <div className="flex justify-between my-2">
                  <p className="text-black-500 text-sm flex items-center">
                    Vat
                  </p>
                  <p className="text-black-75 text-sm flex items-center font-semibold">
                    {formatPrice(Number(order?.vat_amount), currency_id)}
                  </p>
                </div>
              ) : (
                ""
              )}
              {Number(order.discount_amount) ? (
                <div className="flex justify-between my-2">
                  <p className="text-black-500 text-sm flex items-center">
                    Discount
                  </p>
                  <p className="text-black-75 text-sm flex items-center font-semibold">
                    {formatPrice(Number(order.discount_amount), currency_id)}
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className="flex justify-between my-2 border-t pt-2">
                <p className="text-black-500 text-sm flex items-center">
                  Grand Total
                </p>
                <p className="text-black-75 text-sm flex items-center font-semibold">
                  {formatPrice(order?.total_amount, currency_id)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-12">
        <h3 className="text-black-75 text-lg mb-2">Other</h3>
        <div className="flex gap-2">
          <p className="text-black-500 text-xs flex items-center cursor-pointer hover:text-black-75">
            Contract for sale
          </p>
          <p className="text-black-500 text-xs flex items-center cursor-pointer hover:text-black-75">
            Return Conditions
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default OrderExpanded;
