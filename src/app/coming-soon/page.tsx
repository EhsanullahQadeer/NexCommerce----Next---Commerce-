import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import SocialIcons from "@/components/SocialIcons";
import Image from "next/image";
import { FC } from "react";

const AboutUs: FC = () => {
  return (
    <div className="flex justify-between">
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center justify-center w-full h-screen px-4 max-w-[700px]">
          <div className="w-full flex flex-col items-center">
            <Image src="/icon.png" alt="Logo" width={30} height={30} />
            <span className="text-[40px] mt-4 text-[#333333]">Coming Soon</span>
            <div className="w-full flex justify-between items-start gap-x-2 py-4 px-[10%] mt-2">
              <div className="flex flex-col items-center">
                <span className="text-3xl text-primary leading-6">00</span>
                <span className="text-sm font-light text-[#999999]">Days</span>
              </div>
              <span className="text-2xl -mt-1.5 text-primary">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl text-primary leading-6">00</span>
                <span className="text-sm font-light text-[#999999]">Hours</span>
              </div>
              <span className="text-2xl -mt-1.5 text-primary">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl text-primary leading-6">00</span>
                <span className="text-sm font-light text-[#999999]">
                  Minutes
                </span>
              </div>
              <span className="text-2xl -mt-1.5 text-primary">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl text-primary leading-6">00</span>
                <span className="text-sm font-light text-[#999999]">
                  Seconds
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 h-[1px] w-full" />
          <div className="flex flex-col items-center gap-y-2 mt-8">
            <p className="text-sm text-[#777777] font-light text-center">
              We are currently working on an awesome new site. Stay tuned for
              more information. Subscribe to our newsletter to stay updated on
              our progress.
            </p>
            <div className="w-full flex flex-col items-center gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
              <Input
                placeholder="Enter your Email Address"
                className="!bg-white !border-gray-300"
                isFullWidth
              />
              <Button className="gap-x-2">
                SUBSCRIBE <i className="las la-arrow-right"></i>
              </Button>
            </div>
          </div>
          <SocialIcons
            variant="dark"
            size="lg"
            className="!justify-start mt-8"
          />
        </div>
      </div>
      <div
        className="w-6/12 h-screen hidden sm:block"
        style={{
          backgroundImage: "url(/categories/soon-bg.jpg)",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default AboutUs;
