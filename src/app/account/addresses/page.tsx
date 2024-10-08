"use client";
import AddressCard from "@/features/dashboard/address/AddressCard";
import AddressLayout from "@/components/layout/AddressLayout";
import useIsMutating from "@/hooks/useIsMutating";

const AddressTab = () => {
  const { apiStatus } = useIsMutating();

  const { isLoading: isBillingLoading } = apiStatus("fetchgetBillingAddress");
  const { isLoading: isShippingLoading } = apiStatus("fetchgetShippingAddress");
  return (
    <AddressLayout>
      <div className="mt-1.5">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <AddressCard
            isLoading={isShippingLoading}
            addresstype="shippingaddress"
            title="Shipping Address"
          />
          <AddressCard
            isLoading={isBillingLoading}
            addresstype="billingaddress"
            title="Billing Address"
          />
        </div>
      </div>
    </AddressLayout>
  );
};

export default AddressTab;
