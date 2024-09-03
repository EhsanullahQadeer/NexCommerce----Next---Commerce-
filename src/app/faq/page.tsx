"use client";
import Accordion from "@/components/Accordion";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import { FC, useState } from "react";

const links = [
  {
    url: "/",
    name: "Home",
  },
  {
    url: "/faq",
    name: "FAQ",
  },
];

const shippingInformation = {
  title: "Shipping Information",
  accordions: [
    {
      label: "How will my parcel be delivered?",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
    {
      label: "Do I pay for delivery?",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
    {
      label: "Will I be charged customs fees?",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
    {
      label: "My item has become faulty",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
  ],
};

const ordersAndReturns = {
  title: "Orders and Returns",
  accordions: [
    {
      label: "Tracking my order",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
    {
      label: "I haven’t received my order",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
    {
      label: "How can I return an item?",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
  ],
};

const payments = {
  title: "Payments",
  accordions: [
    {
      label: "What payment types can I use?",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
    {
      label: "Can I pay by Gift Card?",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
    {
      label: "I can't make a payment",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
    {
      label: "Has my payment gone through?",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
    },
  ],
};

const AboutUs: FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<{
    [key: string]: number;
  }>({});

  return (
    <div>
      <Container className="w-full pb-20">
        <Hero title="F.A.Q" subTitle="Pages" />
        <Breadcrumb links={links} />
        <div className="flex flex-col items-center">
          <span className="text-[22px] my-8">Shipping Information</span>
          {shippingInformation.accordions.map((item, index) => {
            return (
              <Accordion
                key={index}
                label={item.label}
                content={item.content}
                isOpen={activeAccordion[shippingInformation.title] === index}
                setIsOpen={() =>
                  setActiveAccordion({
                    ...activeAccordion,
                    [shippingInformation.title]:
                      activeAccordion[shippingInformation.title] === index
                        ? -1 // Close if already open
                        : index,
                  })
                }
                className={
                  index === 0
                    ? "rounded-t"
                    : index === shippingInformation.accordions.length - 1
                    ? "rounded-b"
                    : ""
                }
              />
            );
          })}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[22px] my-8">Orders and Returns</span>
          {ordersAndReturns.accordions.map((item, index) => {
            return (
              <Accordion
                key={index}
                label={item.label}
                content={item.content}
                isOpen={activeAccordion[ordersAndReturns.title] === index}
                setIsOpen={() =>
                  setActiveAccordion({
                    ...activeAccordion,
                    [ordersAndReturns.title]:
                      activeAccordion[ordersAndReturns.title] === index
                        ? -1 // Close if already open
                        : index,
                  })
                }
                className={
                  index === 0
                    ? "rounded-t"
                    : index === ordersAndReturns.accordions.length - 1
                    ? "rounded-b"
                    : ""
                }
              />
            );
          })}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[22px] my-8">Payments</span>
          {payments.accordions.map((item, index) => {
            return (
              <Accordion
                key={index}
                label={item.label}
                content={item.content}
                isOpen={activeAccordion[payments.title] === index}
                setIsOpen={() =>
                  setActiveAccordion({
                    ...activeAccordion,
                    [payments.title]:
                      activeAccordion[payments.title] === index
                        ? -1 // Close if already open
                        : index,
                  })
                }
                className={
                  index === 0
                    ? "rounded-t"
                    : index === payments.accordions.length - 1
                    ? "rounded-b"
                    : ""
                }
              />
            );
          })}
        </div>
      </Container>
      <div
        className="w-full h-auto min-h-[150px] py-8 px-4 flex flex-col gap-y-4 justify-center sm:flex-row sm:items-center sm:justify-between"
        style={{
          backgroundImage: "url('/categories/faq-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-white">
            If You Have More Questions
          </span>
          <span className="text-white font-extralight">
            Quisque volutpat mattis eros
          </span>
        </div>
        <Button className="w-max gap-x-3 !px-3.5 !border-white !text-white hover:!border-primary">
          CONTACT US <i className="las la-arrow-right" />
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
