import { ORDERS } from "@/app/account/orders/page";
import Button from "@/components/Button";
import { baseUrl } from "@/config/config";
import useCurrency from "@/hooks/useCurrency";
import routes from "@/routes/routes";
import { useGetInvoiceMutation } from "@/store/api/ordersApi";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
interface OrderExpandedProps {
  order: ORDERS;
  date: string;
  selectedTab: string;
}

const OrderExpanded = ({ order, date, selectedTab }: OrderExpandedProps) => {
  const {
    items,
    note,
    invoice_url,
    total_amount,
    discount_amount,
    vat_amount,
    sub_total,
  } = order;

  const [expanded, setExpanded] = useState<number | null>(null);
  const { formatPrice, calculatePrice } = useCurrency();
  const currency_id = order?.currency_id ?? 2;
  const [getInvoice] = useGetInvoiceMutation();

  const productsNameStr = useMemo(
    () => items.map((item) => item.product.name).join(", "),
    [items]
  );

  const handleInvoice = async (url: string) => {
    try {
      const res = await getInvoice({
        payload: { url },
        fullPageLoader: true,
      }).unwrap();
      const pdfBlob = new Blob([res], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const discount = calculatePrice(Number(discount_amount), currency_id);
  const vat = calculatePrice(Number(vat_amount), currency_id);
  const grandTotal = calculatePrice(total_amount, currency_id);

  return (
    <div className="my-4">
      <div className="border border-black-600 rounded-lg">
        <div className="border-b px-4 py-3 flex justify-between flex-col md:flex-row">
          <div className="flex gap-2">
            <h6 className="text-black-500 text-sm font-bold m-0 p-0 flex items-center">
              {productsNameStr}
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
          <div className="md:w-[50%]">
            {items.map((item) => {
              const imgSrc = baseUrl + item.product.medium_image;
              const { product, quantity } = item;
              const { name, price, currency_id = 2, slug } = product;
              return (
                <div
                  key={"order-" + item.order_id}
                  className="flex p-4 px-2 flex-col md:flex-row justify-center md:justify-start items-center md:items-start"
                >
                  <div className="flex md:w-[20%] p-2">
                    <Image
                      src={imgSrc}
                      alt="product"
                      width={70}
                      height={70}
                      className="rounded "
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <Link href={routes.productDetails(slug)}>
                      <p className="text-black-500 hover:text-primary font-normal text-sm leading-[30.1px]">
                        {name}
                      </p>
                    </Link>
                    <p className="text-green-600 font-bold text-md">
                      {quantity} × {formatPrice(price, currency_id)}
                    </p>
                    <div className="flex mt-2 gap-2 flex-col md:flex-row">
                      <Link href={routes.productDetails(slug)}>
                        <Button
                          size="xs"
                          variant="primary"
                          className="!rounded-lg !p-0 !px-3 !py-1 !font-semibold hover:!bg-black-400 !bg-black-300 !border-black-300 !text-black-500 !text-xs"
                        >
                          Buy again
                        </Button>
                      </Link>
                      {selectedTab === "delivered" && (
                        <Button
                          size="xs"
                          variant="primary"
                          className="!rounded-lg !p-0 !px-3 !py-1 hover:!bg-primary !text-xs"
                        >
                          Rate the product
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:mt-0 md:w-[50%] bg-green-50 overflow-hidden">
            <div className="border-b p-4 flex items-center gap-4">
              <div className="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center">
                <i className="las la-truck text-white text-2xl"></i>
              </div>

              <div>
                <p className="text-black-75 font-bold text-sm mb-1 capitalize">
                  {order?.status}
                </p>
                <p className="text-green-600 font-light text-xs">
                  Date: <span className="font-semibold">{date}</span>
                </p>
                <p className="text-green-600 font-light text-xs">
                  <span className="font-semibold">{note}</span>
                </p>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-4]">
              {/* <p className="text-black-500 text-xs flex items-center w-[50%]">
                <i className="las la-truck mr-2 text-2xl"></i>
                <span className="">Cargo tracking</span>
              </p> */}
              {invoice_url && (
                <p
                  onClick={() => handleInvoice(invoice_url)}
                  className="cursor-pointer text-black-500 hover:text-primary text-xs flex items-center w-[50%]"
                >
                  <i className="las la-file-invoice mr-2 text-2xl"></i>
                  <span>View Invoice</span>
                </p>
              )}
              {/* <p className="text-black-500 text-xs flex items-center w-[50%] mt-4">
                <i className="las la-truck mr-2 text-2xl"></i>
                <span className="">Returns and other requests</span>
              </p> */}
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
              {order?.order_shipping_address?.address},{" "}
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
                  {order?.order_billing_address?.address},{" "}
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
            {/* <div className="flex gap-4 mb-4">
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
                {order?.payment?.transaction_id}
                </p>
                <p className="text-black-500 text-xs flex items-center">
                  {order?.payment?.payment_method}
                </p>
              </div>
            </div> */}
            <div className=" mt-4">
              <div className="flex justify-between my-2">
                <p className="text-black-500 text-sm flex items-center">
                  Cargo
                </p>
                <p className="text-black-75 text-sm flex items-center font-semibold">
                  {Number(order?.shipping_amount) === 0 ? (
                    <>
                      <span>Free</span>
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
                  {formatPrice(sub_total, currency_id)}
                </p>
              </div>
              {vat ? (
                <div className="flex justify-between my-2">
                  <p className="text-black-500 text-sm flex items-center">
                    Vat
                  </p>
                  <p className="text-black-75 text-sm flex items-center font-semibold">
                    {formatPrice(vat, currency_id)}
                  </p>
                </div>
              ) : (
                ""
              )}
              {discount ? (
                <div className="flex justify-between my-2">
                  <p className="text-black-500 text-sm flex items-center">
                    Discount
                  </p>
                  <p className="text-black-75 text-sm flex items-center font-semibold">
                    {formatPrice(discount, currency_id)}
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
                  {formatPrice(grandTotal, currency_id)}
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
