import CheckoutSummary from "./Summary";
import CouponInput from "./CouponInput";
import Form from "./Form";
import useIsMutating from "@/hooks/useIsMutating";
import AddressLayout from "@/components/layout/AddressLayout";

const CheckoutComponent = () => {
  return (
    <AddressLayout>
      <div>
        <div className="flex flex-col lg:flex-row items-start pt-10 pb-[50px] gap-8">
          <div className="flex-1 w-full">
            <div className="flex flex-col lg:flex-row gap-5 items-start"></div>
            <Form />
          </div>
          <div>
            <CouponInput />
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </AddressLayout>
  );
};

export default CheckoutComponent;
