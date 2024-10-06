
import { IAddress } from "@/types/adress";
import React, { ReactNode, useContext, useState, createContext } from "react";

// Updated interface for the context
interface ICheckoutContext {
  isBillingSame: boolean;
  setIsBillingSame: (value: boolean) => void;
  selectedShippingAddress?: IAddress;
  setSelectedShippingAddress: (address?: IAddress) => void;
  selectedBillingAddress?: IAddress;
  setSelectedBillingAddress: (address?: IAddress) => void;
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


export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
  const [isBillingSame, setIsBillingSame] = useState<boolean>(true);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<IAddress>();
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<IAddress>();

  const initialState: ICheckoutContext = {
    isBillingSame,
    setIsBillingSame,
    selectedShippingAddress,
    setSelectedShippingAddress,
    selectedBillingAddress,
    setSelectedBillingAddress,
  };

  return (
    <CheckoutContext.Provider value={initialState}>
      {children}
    </CheckoutContext.Provider>
  );
};
