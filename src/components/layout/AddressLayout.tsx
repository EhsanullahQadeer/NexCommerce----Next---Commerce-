/* eslint-disable react-hooks/exhaustive-deps */
import {
  useFetchDistrictsMutation,
  useFetchProvincesMutation,
} from "@/store/api/adressApi";
import {
  selectAdress,
  updateVillages,
} from "@/store/slices/adress/adressSlice";
import { ReactNode, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  children: ReactNode;
}
const AddressLayout = (props: IProps) => {
  const { children } = props;
  const { provinces, districts, locationData } = useSelector(selectAdress);
  const dispatch = useDispatch();
  const [fetchProvinces] = useFetchProvincesMutation();
  const [fetchDistricts] = useFetchDistrictsMutation();

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

  return children;
};

export default AddressLayout;
