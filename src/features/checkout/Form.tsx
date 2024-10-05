import Checkbox from "@/components/Checkbox";
import AddressCard from "../dashboard/address/AddressCard";
import useIsMutating from "@/hooks/useIsMutating";
import React, { useMemo, useState } from "react";
import { IAddress } from "@/types/adress";
import { CreditCardBox } from "./CreditCardBox";
import VisaCardIcon from "@/assets/svgs/VisaCardIcon";
import MasterCardIcon from "@/assets/svgs/MasterCardIcon";
import AmericanExpressLogo from "@/assets/svgs/americanCardIcon";
import DiscoverCardIcon from "@/assets/svgs/DiscoverCardIcon";
import EloPay from "@/assets/svgs/EloPay";
import JcbPay from "@/assets/svgs/JcbPay";
import UniounPay from "@/assets/svgs/UniounPay";
import { Tooltip } from "@mui/material";
import CustomizedSteppers from "@/components/stepper/Stepper";

const Form = () => {
  const { apiStatus } = useIsMutating();
  const { isLoading: isBillingLoading } = apiStatus("fetchgetBillingAddress");
  const { isLoading: isShippingLoading } = apiStatus("fetchgetShippingAddress");
  const [isBillingSame, setIsBillingSame] = useState<boolean>(true);
  const ShippingAdress = React.memo(() => {
    const [selectedAddress, setSelectedAddress] = useState<IAddress>();
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 w-full cursor-pointer ">
          <AddressCard
            isLoading={isShippingLoading}
            addresstype="shippingaddress"
            type="onlyChildCard"
            cardProps={{
              className: "cursor-pointer p-4 border border-dashed round[3px]",
              setSelectedAddress,
              selectedAddress,
              disableEdit: true,
            }}
          />
        </div>
      </div>
    );
  });
  const BillingAdress = React.memo(() => {
    const [selectedAddress, setSelectedAddress] = useState<IAddress>();
    return (
      <div className="py-4">
        <div className="mb-4">
          <Checkbox
            checked={isBillingSame}
            label="Use billing address as shipping address"
            labelClass="!text-black-75 !font-light"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setIsBillingSame(e.target.checked);
            }}
          />
        </div>
        {!isBillingSame && (
          <div className="grid grid-cols-1 w-full cursor-pointer ">
            <AddressCard
              isLoading={isBillingLoading}
              addresstype="billingaddress"
              type="onlyChildCard"
              cardProps={{
                className: "cursor-pointer p-4 border border-dashed round[3px]",
                setSelectedAddress,
                selectedAddress,
                disableEdit: true,
              }}
            />
          </div>
        )}
      </div>
    );
  });
  const stepsWithCustomContent = useMemo(
    () => [
      <div key={"step-1"} className="px-6">
        <div className="text-black-75">Shiping Address</div>
        <div className="py-[13px]"></div>
        <ShippingAdress />
      </div>,
      <div key={"step-2"} className="px-6">
        <div className="text-black-75">Billing Address</div>
        <BillingAdress />
      </div>,
    ],
    [isShippingLoading, isBillingLoading, isBillingSame]
  );

  return (
    <div>
      <div className="flex flex-col gap-[13px">
        <div className="block text-xl font-medium text-black mb-3">
          <span>Payment</span>
          <p className="text-sm text-mediumGray font-normal">
            All transactions are secure and encrypted.
          </p>
        </div>
        <div role="group" className="flex flex-col">
          <label
            className={` gap-2 text-sm text-black-75 w-full h-14 border rounded-t-md flex items-center px-3 sm:px-6 cursor-pointer bg-[#f9f9f9] order-[#dedede]`}
          >
            <div className="flex justify-between items-center w-full">
              <span>Credit card</span>
              <div className="flex flex-wrap gap-2 z-10">
                <VisaCardIcon />
                <MasterCardIcon />
                <AmericanExpressLogo />
                <DiscoverCardIcon />
                <Tooltip
                  placement="top"
                  arrow
                  title={
                    <div className="flex py-2 gap-1">
                      <EloPay />
                      <JcbPay />
                      <UniounPay />
                    </div>
                  }
                >
                  <div
                    style={{ borderRadius: "3px", width: "38px" }}
                    className="h-6 bg-white border border-transparentBlack text-center"
                  >
                    +3
                  </div>
                </Tooltip>
              </div>
            </div>
          </label>
        </div>
        <div className="bg-[#f9f9f9] ">
          <CreditCardBox />

          <div className="p-4">
            <CustomizedSteppers steps={stepsWithCustomContent} />
          </div>
          {/* <div className="">
            <TextArea
              label="Order notes (optional)"
              rows={4}
              placeholder="Notes about your order, e.g. special notes for delivery"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Form;
