import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Input from "@/components/Input";
import TextArea from "@/components/Input/Textarea";
import { FC } from "react";

const AboutUs: FC = () => {
  const links = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/about-us",
      name: "About",
    },
  ];
  return (
    <div>
      <Container className="w-full">
        <Breadcrumb links={links} />
        <Hero
          title="About us"
          subTitle="Who we are"
          bgColor="bg-[#ebebeb]"
          textColor="text-white"
          className="!h-[300px] !font-light"
        />
        <section className="flex flex-col gap-y-6 my-10 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6 sm:gap-y-0">
          <div>
            <h1 className="text-xl">Our Vision</h1>
            <p className="text-sm font-extralight mt-2">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
              ligula sollicitudin laoreet viverra, tortor libero sodales leo,
              eget blandit nunc tortor eu nibh.
            </p>
          </div>
          <div>
            <h1 className="text-xl">Our Mission</h1>
            <p className="text-sm font-extralight mt-2">
              Sed egestas, ante et vulputate volutpat, eros pede semper est,
              vitae luctus metus libero eu augue. Morbi purus libero, faucibus
              adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
              elementum hendrerit tortor. Sed semper lorem at felis.
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;
