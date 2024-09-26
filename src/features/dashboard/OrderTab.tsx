import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import NotificationIcon from "@/components/Navbar/elements/NotificationIcon";
import OrderExpanded from "./OrderExpanded";
import { orders, orderStatuses } from "./data";
import { useSelector } from 'react-redux';
import { useFetchOrdersMutation } from "@/store/api/ordersApi";
import { Joan } from "next/font/google";
import { jsxDEV } from "react/jsx-dev-runtime";

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
  order_date: string;
  shipping_address_id: number;
  billing_address_id: number
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
      price: number,
      additional_description: string;
      additional_info: string;
      shipping_return: string;
      meta_title: null,
      meta_desc: null,
      is_active: number,
      is_deleted: number,
      currency_id: number,
      current_details: {
        id: number,
        currency_code: string;
        currency_name: string;
        exchange_rate_to_usd: string;
      }
    }
  }>,
  order_shipping_address: {
    id: number,
    order_id: number,
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
  },
  order_billing_address: {
    id: number,
    order_id: number,
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
  },
  payment: {
    id: number,
    order_id: number,
    total_amount: number,
    payment_method: string;
    payment_date: string;
    transaction_id: string;
    payment_status: string;
  },
  user: {
    id: number;
    user_role_id: number;
    name: string;
    surname: string;
    email: string;
    email_verified_at: null,
    verification_code: number;
    is_active: number;
    is_deleted: number;
  },
  coupon: {
    id: number;
    coupon_code: string;
    discount_type: string;
    discount_percentage: number;
    discount_amount: number;
    expiry_date: string;
    minimum_order_amount: number;
    one_time_use: number;
    currency_id: null
  }
}





const OrderTab = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [visibleOrders, setVisibleOrders] = useState(5);
  const [selected, setSelected] = useState("All");
  const [orders, setOrders] = useState([]);
  const [ordersToShow, setOrdersToShow] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const data: any = useSelector(state => state)
  const [fetchOrders, isLoading] = useFetchOrdersMutation();

  useEffect(() => {
    fetchOrdersData()
  }, [])

  const fetchOrdersData = async () => {
    try {
      let userId = data?.auth?.user?.id;
      const response = await fetchOrders({ userId })
      if (response?.data?.data) {
        setOrdersToShow(response?.data?.data?.orderList)
        setOrders(response?.data?.data?.orderList)
      }
    } catch (error) {
      console.error("fetch orders:", error);
    }
  }


  const loadMoreOrders = () => {
    setVisibleOrders((prev) => prev + 5);
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
              setOrdersToShow(
                orders.filter((o: ORDERS) =>
                  o.order_num
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
        </div>

        <div className="flex flex-wrap justify-center md:justify-start space-x-2 ml-2 gap-2">
          {orderStatuses.map((status) => (
            <Button
              key={status.id}
              size="xs"
              variant={selected === status.status ? "primary" : "outlined"}
              className={`rounded ${selected === status.status && "text-primary"
                }`}
              onClick={() => {
                if (status.status == "All") setOrdersToShow(orders);
                else
                  setOrdersToShow(
                    orders.filter((o : ORDERS) => o.status === status.status)
                  );
                  setSelected(status.status);
              }}
            >
              {status.status}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {ordersToShow.slice(0, visibleOrders).map((order: ORDERS) =>
        (
          <div key={order?.id} className="border rounded-lg p-4">
            <div
              className="flex flex-col md:flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleAccordion(order.id)}
            >
              <div className="flex items-center space-x-4 w-full md:w-[20%] justify-center md:justify-start">
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL + order?.items[0]?.product?.small_image}
                  alt={`${order.order_num}`}
                  width={50}
                  height={50}
                  className="rounded"
                />
              </div>
              <div className="w-full md:w-[30%] mt-2 md:mt-0 text-center md:text-left">
                <p className="text-black-75 text-sm">
                  <span className="font-light text-xs">Order no:</span>{" "}
                  <span className="text-sm">ORD{order.order_num}</span>
                </p>
              </div>

              <div className="w-full md:w-[25%] mt-2 md:mt-0 text-center md:text-left">
                <p className="text-black-75 text-sm">
                  <i className={`${order.statusIcon}`}></i> {order.status}
                </p>
              </div>

              <div className="w-full md:w-[25%] mt-2 md:mt-0 flex justify-center md:justify-end">
                <div className="text-center md:text-right">
                  <p className="text-black-75 text-sm">{order.order_date}</p>

                  <p className="text-green-600 text-sm">${order.total_amount}</p>
                </div>
                <i
                  className={`las ${expandedOrder === order.id ? "la-angle-up" : "la-angle-down"
                    } text-lg ml-2 font-bold mt-2`}
                ></i>
              </div>
            </div>

            {expandedOrder === order.id && <OrderExpanded order={order} />}
          </div>
        )
        )}
      </div>

      {visibleOrders < ordersToShow.length && (
        <div className="flex justify-center mt-4">
          <Button className="uppercase" onClick={loadMoreOrders}>
            Load More <i className="las la-sync ml-2"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderTab;
