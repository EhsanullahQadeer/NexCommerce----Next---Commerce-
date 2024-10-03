import Button from "@/components/Button";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Modal from "./model";
import {
  useAddBillingAddressMutation,
  useFetchgetBillingAddressMutation,
} from "@/store/api/billingAddressApi";
import { useDispatch, useSelector } from "react-redux";
import {
  BillingAddressSlice,
  selectBillingAddress,
  updateBillingAddress,
} from "@/store/slices/billingaddress/billingAddressSlice";
import { RootState } from "@/store";
import { selectShippingAddress } from "@/store/slices/shippingaddress/shippingAddressSlice";
import {
  useAddShippingAddressMutation,
  useFetchgetShippingAddressMutation,
} from "@/store/api/shippingAddressApi";
import { selectCityList } from "@/store/slices/citylist/citySlice";
import { selectstateList } from "@/store/slices/statelist/stateSlice";
import {
  useFetchDistrictsMutation,
  useFetchProvincesMutation,
} from "@/store/api/adressApi";
import { selectAdress } from "@/store/slices/adress/adressSlice";
import { IAddress, TadressType, Village } from "@/types/adress";
import useSkipFirstRender from "@/hooks/useSkipFirstRender";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AddressModal from "./address/AddressModal";
import AddressCard from "./address/AddressCard";

const AddressTab = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const shippingaddress = useSelector(selectShippingAddress);
  const billingaddress = useSelector(selectBillingAddress);
  const adressData = { shippingaddress, billingaddress };
  const { cityData } = useSelector(selectCityList);
  const { stateData } = useSelector(selectstateList);
  const { provinces, districts } = useSelector(selectAdress);

  const {
    first_name,
    last_name,
    email,
    phone,
    village,
    province,
    disctrict,
    address,
  } = billingaddress;

  const [addresstype, setAddressType] = useState<TadressType>("billingaddress");

  const dispatch = useDispatch();

  const [fetchgetBillingAddress] = useFetchgetBillingAddressMutation();
  const [fetchgetShippingAddress] = useFetchgetShippingAddressMutation();

  const fetchAddressData = async () => {
    try {
      try {
      } catch (error) {}

      //  const res2 =    await fetchgetBillingAddress({ user_id: user.id }).unwrap();
      //  const res3 =  await fetchgetShippingAddress({ user_id: user.id }).unwrap();
    } catch (error) {
      console.error("Failed to fetch billing address", error);
    }
  };

  useEffect(() => {
    fetchAddressData();
  }, [user]);

  // const addEditHandleOfForm = (type: Tadress) => {
  //   setAddressType(type);
  //   setModalOpen(true);
  // };

  return (
    <div className="mt-1.5">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <AddressCard
          addresstype="shippingaddress"
          title="Shipping Address"
          addressArray={[]}
        />
        <AddressCard
          addresstype="billingaddress"
          title="Billing Address"
          addressArray={[]}
        />
      </div>
    </div>
  );
};

export default AddressTab;
