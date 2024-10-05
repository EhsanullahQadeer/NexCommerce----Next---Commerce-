/* eslint-disable react-hooks/exhaustive-deps */
import {
  useFetchDistrictsMutation,
  useFetchProvincesMutation,
} from "@/store/api/adressApi";
import {
  selectAdress,
  updateVillages,
} from "@/store/slices/adress/adressSlice";
import { selectBillingAddress } from "@/store/slices/billingaddress/billingAddressSlice";
import { selectShippingAddress } from "@/store/slices/shippingaddress/shippingAddressSlice";
import { ReactNode, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useFetchgetBillingAddressMutation,
  } from "@/store/api/billingAddressApi";
import { useFetchgetShippingAddressMutation } from "@/store/api/shippingAddressApi";
import { RootState } from "@/store";
interface IProps {
  children: ReactNode;
}
const AddressLayout = (props: IProps) => {
  const { children } = props;
  const { provinces, districts, locationData } = useSelector(selectAdress);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [fetchProvinces] = useFetchProvincesMutation();
  const [fetchDistricts] = useFetchDistrictsMutation();
  const [fetchgetBillingAddress] = useFetchgetBillingAddressMutation();
  const [fetchgetShippingAddress] = useFetchgetShippingAddressMutation();
  const shippingaddress = useSelector(selectShippingAddress);
  const billingaddress = useSelector(selectBillingAddress);

  useEffect(() => {
    if (!provinces.length) {
      fetchProvinces({}).unwrap();
    }
  }, []);

  useEffect(() => {
    const { id: provinceId } = locationData.provinces;
    const isDistrictsAvailable = districts[0]?.province_id === provinceId;
    if (!!provinceId && !isDistrictsAvailable) {
      fetchDistricts({ provinceId });
    }
  }, [locationData.provinces]);

  useEffect(() => {
    if (!districts) {
      return;
    }
    const selectedDistrict = districts.find(
      (item) => item.id == locationData.disctrict.id
    )?.villages;

    dispatch(updateVillages(selectedDistrict || []));
  }, [districts, locationData.disctrict.id]);

  useEffect(() => {
    if (!shippingaddress.id && user) {
        fetchgetBillingAddress({ user_id: user.id })
    }
    if (!billingaddress.id && user) {
        fetchgetShippingAddress({ user_id: user.id })
    }

}, [user])

  return children;
};

export default AddressLayout;
