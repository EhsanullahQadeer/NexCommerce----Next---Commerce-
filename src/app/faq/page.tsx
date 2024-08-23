"use client";
import Accordion from "@/components/Accordion";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Input from "@/components/Input";
import TextArea from "@/components/Input/Textarea";
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
          <span className="text-xl my-8">Shipping Information</span>
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
              />
            );
          })}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl my-8">Orders and Returns</span>
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
              />
            );
          })}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl my-8">Payments</span>
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
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
