import { IaddressResponse } from "@/types/adress";
import React, { ReactNode, useContext, useState, createContext } from "react";

// Updated interface for the context
interface ICheckoutContext {
  isBillingSame: boolean;
  setIsBillingSame: (value: boolean) => void;
  selectedShippingAddress?: IaddressResponse;
  setSelectedShippingAddress: (address?: IaddressResponse) => void;
  selectedBillingAddress?: IaddressResponse;
  setSelectedBillingAddress: (address?: IaddressResponse) => void;
  vatFee: number;
  setVatFee: (value: number) => void;
}

// Create the context with a default value of null
const CheckoutContext = createContext<ICheckoutContext | null>(null);

// Custom hook to use the Checkout context
export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckoutContext must be used within CheckoutProvider");
  }
  return context;
};

// Interface for the provider's props
interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const [isBillingSame, setIsBillingSame] = useState<boolean>(true);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<
    IaddressResponse | undefined
  >();
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<
    IaddressResponse | undefined
  >();
  const [vatFee, setVatFee] = useState<number>(0);
  const initialState: ICheckoutContext = {
    isBillingSame,
    setIsBillingSame,
    selectedShippingAddress,
    setSelectedShippingAddress,
    selectedBillingAddress,
    setSelectedBillingAddress,
    vatFee,
    setVatFee,
  };

  return (
    <CheckoutContext.Provider value={initialState}>
      {children}
    </CheckoutContext.Provider>
  );
};
