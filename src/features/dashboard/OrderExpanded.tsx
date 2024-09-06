import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";
import { ORDERS } from "./data";

interface OrderExpandedProps {
  order: ORDERS;
}

const OrderExpanded = ({ order }: OrderExpandedProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);
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
                src={order.imageUrl}
                alt="product"
                width={70}
                height={70}
                className="rounded "
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-black-500 font-normal text-sm leading-[30.1px]">
                Wireless Earbuds
              </p>
              <p className="text-green-600 font-bold text-md">{order.price}</p>
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
                  Delivered
                </p>
                <p className="text-green-600 font-light text-xs">
                  Date: <span className="font-semibold">2024-07-12</span>
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
              Yeni Ev
            </p>

            <p className="text-black-500 text-xs flex items-center">
              62704, 123 Elm Street, Springfield
            </p>
            <p className="text-black-500 text-xs flex items-center">
              Springfield
            </p>
            <p className="text-black-500 text-xs flex items-center">IL, USA</p>
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
                  Yeni Ev
                </p>

                <p className="text-black-500 text-xs flex items-center">
                  62704, 123 Elm Street, Springfield
                </p>
                <p className="text-black-500 text-xs flex items-center">
                  Springfield
                </p>
                <p className="text-black-500 text-xs flex items-center">
                  IL, USA
                </p>
                <p className="text-black-75 text-xs flex items-center font-bold">
                  **** **** **** 1234
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
                  src={order.imageUrl}
                  alt="Product"
                  width={70}
                  height={50}
                  className="rounded"
                />
              </div>
              <div>
                <p className="font-semibold text-green-600 text-sm">
                  {order.price}
                </p>
                <p className="text-black-75 text-xs flex items-center font-bold">
                  **** **** **** 1234
                </p>
                <p className="text-black-500 text-xs flex items-center">Visa</p>
              </div>
            </div>
            <div className="border-t mt-4">
              <div className="flex justify-between my-2">
                <p className="text-black-500 text-sm flex items-center">
                  Cargo
                </p>
                <p className="text-black-75 text-sm flex items-center font-semibold">
                  Free
                </p>
              </div>
              <div className="flex justify-between my-2">
                <p className="text-black-500 text-sm flex items-center">
                  Products
                </p>
                <p className="text-black-75 text-sm flex items-center font-semibold">
                  {order.price}
                </p>
              </div>
              <div className="flex justify-between my-2">
                <p className="text-black-500 text-sm flex items-center">
                  Vat
                </p>
                <p className="text-black-75 text-sm flex items-center font-semibold">
                  %18
                </p>
              </div>
              <div className="flex justify-between my-2 border-t pt-2">
                <p className="text-black-500 text-sm flex items-center">
                  Grand Total
                </p>
                <p className="text-black-75 text-sm flex items-center font-semibold">
                  {order.price}
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
