"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import NotificationIcon from "@/components/Navbar/elements/NotificationIcon";
import OrderExpanded from "@/features/dashboard/OrderExpanded";
import { orderStatuses } from "@/features/dashboard/data";
import { useSelector } from "react-redux";
import { useFetchOrdersMutation } from "@/store/api/ordersApi";
import useCurrency from "@/hooks/useCurrency";
import { baseUrl } from "@/config/config";
import { Tooltip } from "@mui/material";
import { IOrderListParams, IReview } from "@/types/order";
import Skeleton from "react-loading-skeleton";
import { arrayNumberGenerator } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import useSkipFirstRender from "@/hooks/useSkipFirstRender";
import useDate from "@/hooks/useDate";
export interface ORDERS {
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
  sub_total: number;
  order_date: string;
  invoice_url: string;
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

      reviews:IReview[];
    };
  }>;
  order_shipping_address: {
    id: number;
    order_id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address: string;
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
    address: string;
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
const maxImagesToShow = 1;
const limit = 8;
const OrderTab = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("status") || "All";
  const initalSearchValue = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initalSearchValue);
  const searchDebounce = useDebounce(searchTerm, 300);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [ordersCount, setOrdersCount] = useState<number>(limit);
  const [orders, setOrders] = useState<ORDERS[]>([]);
  const data: any = useSelector((state) => state);
  const [fetchOrders, { isLoading }] = useFetchOrdersMutation();
  const { formatPrice } = useCurrency();
  const { formateDate } = useDate();
  const validTab = useMemo(() => {
    const isValid = orderStatuses.some((item) => item.status === currentTab);
    if (isValid) {
      return currentTab;
    } else {
      handleRouteChange("All");
      return "All";
    }
  }, [currentTab]);

  const [selectedTab, setSelectedTab] = useState<string>(validTab);

  const fetchOrdersData = async (page: number) => {
    let userId = data?.auth?.user?.id;
    if (userId) {
      try {
        const params: IOrderListParams = { user_id: userId, page, limit };
        if (selectedTab !== "All") {
          params["filter"] = selectedTab;
        }
        if (searchTerm) {
          params["search"] = searchTerm;
        }
        const response = await fetchOrders(params);
        const { orderList = [], count = 0 } = response.data.data || {};
        setOrders((prev) => [...prev, ...orderList]);
        setOrdersCount(count);
      } catch (error) {
        console.error("fetch orders:", error);
      }
    }
  };

  useEffect(() => {
    setOrdersCount(limit);
    setPage(1);
    setOrders([]);
    fetchOrdersData(1);
    setSelectedTab(validTab);
  }, [data?.auth?.user, searchParams, searchDebounce]);

  useSkipFirstRender(() => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
      router.push(`${pathname}?${params.toString()}`);
    } else if (params.has("search")) {
      params.delete("search");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [searchDebounce]);

  function handleTabChange(status: string) {
    setSearchTerm("");
    setSelectedTab(status);
    handleRouteChange(status, "");
  }

  function handleRouteChange(status: string, search?: string) {
    const params = new URLSearchParams(searchParams);
    if (status === "All") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    if (search) {
    } else {
      if (params.has("search")) {
        params.delete("search");
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const loadMoreOrders = () => {
    setPage((prev) => prev + 1);
    fetchOrdersData(page + 1);
  };

  const toggleAccordion = (orderId: any) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="mt-1.5 flex-1 px-4 md:px-8">
      <h1
        className={`text-[22px]  mb-4 sm:text-[22px] text-black-75
         tracking-[-1px] leading-[44px]`}
      >
        My orders
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <div className="flex w-full md:w-auto items-center justify-center gap-1">
          <NotificationIcon icon={"las la-search"} iconClass="text-black-75" />
          <Input
            placeholder="Search orders"
            className="w-full md:w-[180px] rounded bg-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-wrap justify-center md:justify-start space-x-2 ml-2 gap-2">
          {orderStatuses.map((tab) => (
            <Button
              key={tab.id}
              size="xs"
              variant={selectedTab === tab.status ? "primary" : "outlined"}
              className={`rounded capitalize ${
                selectedTab === tab.status && "text-primary"
              }`}
              onClick={() => handleTabChange(tab.status)}
            >
              {tab.status}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {orders.length > 0
          ? orders.map((order: ORDERS) => {
              const imagesArray = order.items.map(
                (item) => baseUrl + item.product.small_image
              );
              const date = formateDate(order.order_date);
              return (
                <div key={order?.id} className="border rounded-lg p-4">
                  <div
                    className="flex flex-col md:flex-row items-center justify-between cursor-pointer"
                    onClick={() => toggleAccordion(order.id)}
                  >
                    <div className="flex items-center space-x-2 w-full md:w-[20%] justify-center md:justify-start">
                      {imagesArray
                        .slice(0, maxImagesToShow)
                        .map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                        ))}

                      {imagesArray.length > maxImagesToShow && (
                        <Tooltip
                          title={
                            <div className="flex space-x-2">
                              {imagesArray
                                .slice(maxImagesToShow)
                                .map((img, index) => (
                                  <Image
                                    key={index}
                                    src={img}
                                    alt={`Additional image ${index + 1}`}
                                    width={50}
                                    height={50}
                                    className="rounded"
                                  />
                                ))}
                            </div>
                          }
                          placement="top"
                          PopperProps={{
                            sx: {
                              "& .MuiTooltip-tooltip": {
                                backgroundColor: "rgb(242,243,238)",
                                color: "#fff",
                              },
                            },
                          }}
                        >
                          <div className="w-[50px] h-[50px] flex items-center justify-center bg-[rgb(242,243,238)] text-black-75 rounded cursor-pointer">
                            <span>+{imagesArray.length - maxImagesToShow}</span>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                    <div className="w-full md:w-[30%] mt-2 md:mt-0 text-center md:text-left">
                      <p className="text-black-75 text-sm">
                        <span className="font-light text-xs">Order no:</span>{" "}
                        <span className="text-sm">ORD{order.order_num}</span>
                      </p>
                    </div>

                    <div className="w-full md:w-[25%] mt-2 md:mt-0 text-center md:text-left">
                      <p className="text-black-75 text-sm capitalize">
                        <i className={`${order.statusIcon}`}></i> {order.status}
                      </p>
                    </div>

                    <div className="w-full md:w-[25%] mt-2 md:mt-0 flex justify-center md:justify-end">
                      <div className="text-center md:text-right">
                        <p className="text-black-75 text-sm whitespace-nowrap">
                          {date}
                        </p>

                        <p className="text-green-600 text-sm">
                          {formatPrice(
                            order.total_amount,
                            order.currency_id ?? 2
                          )}
                        </p>
                      </div>
                      <i
                        className={`las ${
                          expandedOrder === order.id
                            ? "la-angle-up"
                            : "la-angle-down"
                        } text-lg ml-2 font-bold mt-2`}
                      ></i>
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <OrderExpanded
                      selectedTab={selectedTab}
                      date={date}
                      order={order}
                    />
                  )}
                </div>
              );
            })
          : !isLoading && (
              <div className="flex justify-center mt-4">No orders</div>
            )}
        {isLoading &&
          arrayNumberGenerator(
            Math.min(limit, Math.max(ordersCount - orders.length, 0))
          ).map((value, idx) => (
            <div key={value + idx} className="p-0 rounded-lg">
              <Skeleton height={"83.6px"} width={"100%"} />
            </div>
          ))}
      </div>

      {page * limit < ordersCount && (
        <div className="flex justify-center mt-4">
          <Button
            variant={isLoading ? "disabled" : "outlined"}
            className="uppercase"
            onClick={loadMoreOrders}
          >
            Load More <i className="las la-sync ml-2"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

function SuspenseOrderTab() {
  return (
    <Suspense>
      <OrderTab />
    </Suspense>
  );
}

export default SuspenseOrderTab;
