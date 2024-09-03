"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Input from "@/components/Input";
import TextArea from "@/components/Input/Textarea";
import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";
import { FC } from "react";
import { useSelector } from "react-redux";

const TimeInfo = [
  {
    icon: "las la-clock",
    text: "Monday-Saturday",
    subText: "11am-7pm ET",
  },
  {
    icon: "las la-calendar-alt",
    text: "Sunday",
    subText: "11am-6pm ET",
  },
];

const ListItem = ({
  icon,
  text,
  subText,
}: {
  icon: string;
  text: string;
  subText?: string;
}) => {
  if (subText) {
    return (
      <div className="w-max flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <i className={`${icon} text-xl text-primary`} />
          <span className="text-sm font-light">{text}</span>
        </div>
        <span className="text-sm font-extralight ml-7">{subText}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-x-2">
        <i className={`${icon} text-xl text-primary`} />
        <span className="text-sm font-extralight">{text}</span>
      </div>
    );
  }
};

const Contact: FC = () => {
  const {address, state, city, country, postal_code, phone_number, email} = useSelector(selectSiteSetting)
  const links = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/contact",
      name: "Contact",
    },
  ];

  const ContactInfo = [
    {
      icon: "las la-map-marker-alt",
      text: `${address}, ${state}, ${city}, ${country}, ${postal_code}`
    },
    {
      icon: "las la-phone",
      text: phone_number
    },
    {
      icon: "las la-envelope",
      text: email
    },
  ];

  return (
    <div>
      <Container className="w-full">
        <Breadcrumb links={links} />
        <Hero
          title="Contact us"
          subTitle="keep in touch with us"
          customBg="/categories/contact-poster.jpg"
          textColor="text-white"
          className="!h-[300px] !font-light"
        />
        <div className="flex flex-col gap-y-6 md:flex-row md:items-start md:justify-between md:gap-x-6 md:gap-y-0 pb-14">
          <section className="flex flex-col gap-y-6 mt-10">
            <div>
              <h1 className="text-2xl">Contact Information</h1>
              <p className="text-sm font-extralight mt-2">
                Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                dapibus eu, fermentum et, dapibus sed, urna.
              </p>
            </div>
            <div className="flex flex-col gap-y-6 sm:flex-row sm:items-start sm:gap-x-20 sm:gap-y-0">
              <div>
                <h2 className="text-lg font-light">The Office</h2>
                <div className="flex flex-col gap-y-4 mt-4">
                  {ContactInfo.map((item, index) => (
                    <ListItem key={item.text + index} {...item} />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-light">The Office</h2>
                <div className="flex flex-col gap-y-4 mt-4">
                  {TimeInfo.map((item,index) => (
                    <ListItem key={item.text+index} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="w-full flex flex-col gap-y-6 mt-10">
            <div>
              <h1 className="text-2xl">Got Any Questions?</h1>
              <p className="text-sm font-extralight mt-2">
                Use the form below to get in touch with the sales team
              </p>
            </div>
            <div className="flex flex-col gap-y-6 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6 sm:gap-y-0">
              <Input placeholder="Name *" required isFullWidth />
              <Input placeholder="Email *" required isFullWidth />
            </div>
            <div className="flex flex-col gap-y-6 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6 sm:gap-y-0">
              <Input placeholder="Phone" isFullWidth />
              <Input placeholder="Subject" isFullWidth />
            </div>
            <TextArea placeholder="Message *" rows={5} required />
            <Button className="w-max gap-x-2">
              Submit <i className="las la-arrow-right" />
            </Button>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
