import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import NotificationIcon from "@/components/Navbar/elements/NotificationIcon";
import OrderExpanded from "./OrderExpanded";

const orders = [
  {
    id: 1,
    imageUrl: "/images/order1.jpg",
    orderNumber: "123456789",
    status: "Ongoing",
    statusIcon: "las la-sync",
    date: "2023-08-30",
    price: "$99.99",
    details: "More information about this order...",
  },
  {
    id: 2,
    imageUrl: "/images/order2.jpg",
    orderNumber: "987654321",
    status: "Cancelled",
    statusIcon: "las la-times-circle",
    date: "2023-08-25",
    price: "$149.99",
    details: "This order was cancelled due to payment issues.",
  },
  {
    id: 3,
    imageUrl: "/images/order3.jpg",
    orderNumber: "1122334455",
    status: "Refunded",
    statusIcon: "las la-undo",
    date: "2023-08-20",
    price: "$89.99",
    details: "This order has been refunded to your account.",
  },
  {
    id: 4,
    imageUrl: "/images/order4.jpg",
    orderNumber: "5566778899",
    status: "Undeliverable",
    statusIcon: "las la-exclamation-circle",
    date: "2023-08-15",
    price: "$49.99",
    details: "This order could not be delivered due to incorrect address.",
  },
  {
    id: 5,
    imageUrl: "/images/order5.jpg",
    orderNumber: "9988776655",
    status: "Ongoing",
    statusIcon: "las la-sync",
    date: "2023-08-10",
    price: "$129.99",
    details: "Your order is on its way.",
  },
  {
    id: 6,
    imageUrl: "/images/order6.jpg",
    orderNumber: "2233445566",
    status: "Delivered",
    statusIcon: "las la-check-circle",
    date: "2023-08-05",
    price: "$199.99",
    details: "Your order has been delivered.",
  },
];

const orderStatuses = [
  { id: 1, status: "All" },
  { id: 2, status: "Ongoing" },
  { id: 3, status: "Cancelled" },
  { id: 4, status: "Refunded" },
  { id: 5, status: "Undeliverable" },
];

const OrderTab = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [visibleOrders, setVisibleOrders] = useState(5);
  const [selected, setSelected] = useState("All");
  const [ordersToShow, setOrdersToShow] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");

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
                orders.filter((o) =>
                  o.orderNumber
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
              className={`rounded ${
                selected === status.status && "text-primary"
              }`}
              onClick={() => {
                if (status.status == "All") setOrdersToShow(orders);
                else
                  setOrdersToShow(
                    orders.filter((o) => o.status === status.status)
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
        {ordersToShow.slice(0, visibleOrders).map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div
              className="flex flex-col md:flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleAccordion(order.id)}
            >
              <div className="flex items-center space-x-4 w-full md:w-[20%] justify-center md:justify-start">
                <Image
                  src={order.imageUrl}
                  alt={`${order.orderNumber}`}
                  width={50}
                  height={50}
                  className="rounded"
                />
              </div>
              <div className="w-full md:w-[30%] mt-2 md:mt-0 text-center md:text-left">
                <p className="text-black-75 text-sm">
                  <span className="font-light text-xs">Order no:</span>{" "}
                  <span className="text-sm">ORD{order.orderNumber}</span>
                </p>
              </div>

              <div className="w-full md:w-[25%] mt-2 md:mt-0 text-center md:text-left">
                <p className="text-black-75 text-sm">
                  <i className={`${order.statusIcon}`}></i> {order.status}
                </p>
              </div>

              <div className="w-full md:w-[25%] mt-2 md:mt-0 flex justify-center md:justify-end">
                <div className="text-center md:text-right">
                  <p className="text-black-75 text-sm">{order.date}</p>

                  <p className="text-green-600 text-sm">{order.price}</p>
                </div>
                <i
                  className={`las ${
                    expandedOrder === order.id ? "la-angle-up" : "la-angle-down"
                  } text-lg ml-2 font-bold mt-2`}
                ></i>
              </div>
            </div>

            {expandedOrder === order.id && <OrderExpanded order={order} />}
          </div>
        ))}
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
