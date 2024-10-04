import { RootState } from "@/store";
import { useFetchgetBillingAddressMutation } from "@/store/api/billingAddressApi";
import { useFetchgetShippingAddressMutation } from "@/store/api/shippingAddressApi";
import { selectAdress } from "@/store/slices/adress/adressSlice";
import { selectBillingAddress } from "@/store/slices/billingaddress/billingAddressSlice";
import { selectShippingAddress } from "@/store/slices/shippingaddress/shippingAddressSlice";
import { TlocationType } from "@/types/adress";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const useAddress = () => {
    const [fetchgetBillingAddress] = useFetchgetBillingAddressMutation();
    const [fetchgetShippingAddress] = useFetchgetShippingAddressMutation();
    const shippingaddress = useSelector(selectShippingAddress);
    const billingaddress = useSelector(selectBillingAddress);
    const adressStoreData = useSelector(selectAdress);
    const adressData = { shippingaddress, billingaddress };
    const { user } = useSelector((state: RootState) => state.auth);


    useEffect(() => {
        if (!shippingaddress.id) {
            fetchgetBillingAddress({ user_id: user.id })
        }
        if (!billingaddress.id) {
            fetchgetShippingAddress({ user_id: user.id })
        }

    }, [])


    return { shippingaddress, billingaddress, adressData }
}

export default useAddress
