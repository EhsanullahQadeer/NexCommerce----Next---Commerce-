import React, { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import { ChangeEvent } from "react";

import { IAddress, TadressType, Village } from "@/types/adress";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useSkipFirstRender from "@/hooks/useSkipFirstRender";
import {
  useFetchDistrictsMutation,
  useFetchProvincesMutation,
} from "@/store/api/adressApi";
import { selectAdress } from "@/store/slices/adress/adressSlice";
import { useSelector } from "react-redux";
import Modal from "@/components/Modal";
import { useAddBillingAddressMutation } from "@/store/api/billingAddressApi";
import { useAddShippingAddressMutation } from "@/store/api/shippingAddressApi";
import { toast } from "react-toastify";
import { RootState } from "@/store";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required."),
  last_name: Yup.string().required("Last Name is required."),
  phone: Yup.string().required("Phone number is required."),
  address: Yup.string().required("Address is required."),
  address_name: Yup.string().required("Address name is required."),
  provinces: Yup.string().required("Province name is required."),
  village: Yup.string().required("Village name is required."),
  disctrict: Yup.string().required("District name is required."),
});

interface IlocationItem {
  id: number;
  name: string;
}

interface LocationData {
  provinces: IlocationItem;
  disctrict: IlocationItem;
  village: IlocationItem;
}

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
  addresstype: TadressType;
  adressData?: IAddress;
}

const locationInitalData: LocationData = {
  provinces: { id: 0, name: "" },
  disctrict: { id: 0, name: "" },
  village: { id: 0, name: "" },
};

const AddressModal = (props: Iprops) => {
  const { isOpen, onClose, addresstype, adressData } = props;
  const { provinces, districts } = useSelector(selectAdress);
  const [fetchProvinces, { isLoading: isprovinceLoading }] =
    useFetchProvincesMutation();
  const [fetchDistricts, { isLoading: isDistrictLoading }] =
    useFetchDistrictsMutation();
  const [addBillingAddress] = useAddBillingAddressMutation();
  const [addShippingAddress] = useAddShippingAddressMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!provinces.length) {
      fetchProvinces({}).unwrap();
    }
  }, []);

  const initialValues: IAddress = adressData ?? {
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    neighborhood: "",
    address_name: "",
    provinces: null,
    disctrict: null,
    village: null,
    user_id: user.id,
  };
  const [locationData, setLocationData] =
    useState<LocationData>(locationInitalData);

  useSkipFirstRender(async () => {
    const { id: provinceId } = locationData.provinces;
    if (provinceId > 0) {
      fetchDistricts({ provinceId });
    }
  }, [locationData.provinces]);

  const villages: Village[] = useMemo(() => {
    const selectedDistrict = districts.find(
      (item) => item.id == locationData.disctrict.id
    )?.villages;

    return selectedDistrict || [];
  }, [districts, locationData.disctrict.id]);

  const handleModalClose = () => {
    onClose();
    setLocationData(locationInitalData);
  };

  const handleAddressSubmit = async (values: IAddress) => {
    try {
      if (addresstype === "billingaddress") {
        await addBillingAddress(values);
      } else if (addresstype === "shippingaddress") {
        await addShippingAddress(values);
      }
      toast.success("Address submitted successfully!");
      handleModalClose();
    } catch (error) {
      console.error("Error adding/updating address:", error);
    }
  };
  return (
    <Modal
      className="max-w-xl rounded-sm px-6 pt-16 pb-8"
      isOpen={isOpen}
      onClose={handleModalClose}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddressSubmit}
      >
        {({ setFieldValue, values }) => {
          const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
            const { value, name: keyName } = e.target;
            const selectedOption = e.target.options[e.target.selectedIndex];
            const name = selectedOption.dataset.name;

            setLocationData((prev) => {
              let body: LocationData = locationInitalData;
              if (name === "provinces") {
                body.provinces = { id: Number(value), name };
              } else {
                body = {
                  ...prev,
                  [keyName]: { id: value, name },
                };
              }
              return body;
            });
            setFieldValue(keyName, value);
          };
          return (
            <Form>
              <div className="">
                <div className="grid grid-cols-1  sm:grid-cols-2 gap-4">
                  <div>
                    <Field
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className="p-2 block w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      className="p-2 block w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      className="p-2 block w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="address_name"
                      placeholder="Address Name"
                      className="p-2 block w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="address_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  <div>
                    <select
                      value={locationData.provinces.id}
                      className={`p-2 block w-full border rounded-md ${
                        provinces.length && !isprovinceLoading
                          ? "border-gray-300 bg-white"
                          : "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                      name="provinces"
                      onChange={handleLocationChange}
                      disabled={!provinces.length || isprovinceLoading}
                    >
                      {isprovinceLoading ? (
                        <option value="">Loading...</option>
                      ) : (
                        <>
                          <option disabled={!!provinces.length} value={0}>
                            Select Province
                          </option>
                          {provinces.map((row, i) => (
                            <option
                              key={`province-{row.name}`}
                              data-name={row.name}
                              value={row.id}
                            >
                              {row.name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>

                    <ErrorMessage
                      name="provinces"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <select
                      value={locationData.disctrict.id}
                      className={`p-2 block w-full border rounded-md ${
                        districts.length &&
                        !isDistrictLoading &&
                        values.provinces
                          ? "border-gray-300 bg-white"
                          : "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                      name="disctrict"
                      onChange={handleLocationChange}
                      disabled={
                        !districts.length ||
                        isDistrictLoading ||
                        !values.provinces
                      }
                    >
                      {isDistrictLoading ? (
                        <option value="">Loading...</option>
                      ) : (
                        <>
                          <option disabled={!!districts.length} value={0}>
                            Select District
                          </option>
                          {districts.map((row, i) => (
                            <option
                              key={`disctrict-${row.district_name}`}
                              value={row.id}
                              data-name={row.district_name}
                            >
                              {row.district_name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <ErrorMessage
                      name="disctrict"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <select
                      value={locationData.village.id}
                      className={`p-2 block w-full border rounded-md ${
                        villages.length && !isDistrictLoading
                          ? "border-gray-300 bg-white"
                          : "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                      name="village"
                      onChange={handleLocationChange}
                      disabled={!villages.length || isDistrictLoading}
                    >
                      <option disabled={!!villages.length} value={0}>
                        Select Village
                      </option>
                      {villages.map((row) => (
                        <option
                          key={`village_${row.village_name}`}
                          data-name={row.village_name}
                          value={row.id}
                        >
                          {row.village_name}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="village"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <Field
                      type="text"
                      name="address"
                      placeholder="Address"
                      className="p-2 block w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button className="mr-2" onClick={handleModalClose}>
                    Cancel
                  </Button>
                  <Button className="bg-primary text-white" type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddressModal;
