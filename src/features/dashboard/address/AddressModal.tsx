import React, { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import { ChangeEvent } from "react";

import { IAddress, IlocationData, TadressType, Village } from "@/types/adress";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  locationInitalData,
  selectAdress,
  setLocationData,
} from "@/store/slices/adress/adressSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/Modal";
import {
  useAddBillingAddressMutation,
  useFetchgetBillingAddressMutation,
} from "@/store/api/billingAddressApi";
import {
  useAddShippingAddressMutation,
  useFetchgetShippingAddressMutation,
} from "@/store/api/shippingAddressApi";
import { toast } from "react-toastify";
import { RootState } from "@/store";
import useIsMutating from "@/hooks/useIsMutating";
import { PhoneInput } from "react-international-phone";
import parsePhoneNumberFromString from "libphonenumber-js";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required."),
  last_name: Yup.string().required("Last Name is required."),
  phone: Yup.string()
    .required("Phone number is required")
    .test("is-valid-phone", "Phone number must be valid", (value) => {
      if (!value) return false; // Skip if no value
      const phoneNumber = parsePhoneNumberFromString(value, "TR");
      return phoneNumber ? phoneNumber.isValid() : false;
    }),
  address: Yup.string().required("Address is required."),
  address_name: Yup.string().required("Address name is required."),
  provinces: Yup.string().required("Province name is required."),
  disctrict: Yup.string().required("District name is required."),
  village: Yup.string().required("Village name is required."),
  postal_code: Yup.string().required("Postal code name is required."),
});

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
  addresstype: TadressType;
  adressData?: IAddress;
}

const AddressModal = (props: Iprops) => {
  const { isOpen, onClose, addresstype, adressData } = props;
  const { provinces, districts, villages, locationData } =
    useSelector(selectAdress);
  const { apiStatus } = useIsMutating();
  const { isLoading: isprovinceLoading } = apiStatus("fetchProvinces");
  const { isLoading: isDistrictLoading } = apiStatus("fetchDistricts");
  const [addBillingAddress] = useAddBillingAddressMutation();
  const [addShippingAddress] = useAddShippingAddressMutation();
  const [fetchgetBillingAddress] = useFetchgetBillingAddressMutation();
  const [fetchgetShippingAddress] = useFetchgetShippingAddressMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const initialValues: IAddress = adressData ?? {
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    neighborhood: "",
    address_name: "",
    provinces: "",
    disctrict: "",
    village: "",
    user_id: user.id,
    postal_code: "",
  };

  const handleModalClose = () => {
    onClose();
    setLocationData(locationInitalData);
    document.body.style.overflow = "";
  };

  const handleAddressSubmit = async (values: IAddress) => {
    try {
      if (addresstype === "billingaddress") {
        await addBillingAddress(values);
        fetchgetBillingAddress({ user_id: user.id });
      } else if (addresstype === "shippingaddress") {
        await addShippingAddress(values);
        fetchgetShippingAddress({ user_id: user.id });
      }
      toast.success("Address submitted successfully!");
      handleModalClose();
    } catch (error) {
      console.error("Error adding/updating address:", error);
    }
  };

  return (
    <Modal
      className="max-w-xl rounded-sm px-6  pb-8"
      isOpen={isOpen}
      onClose={handleModalClose}
    >
      <div className="pt-4 pb-6 text-xl text-primary font-normal leading-[24px]">
        <h1>{adressData ? "Edit Address" : "Add New Address"}</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddressSubmit}
      >
        {({ setFieldValue, values, dirty }) => {
          const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
            const { value, name: keyName } = e.target;
            const selectedOption = e.target.options[e.target.selectedIndex];
            const name = selectedOption.dataset.name;

            let body: IlocationData = locationInitalData;
            if (name === "provinces") {
              body.provinces = { id: Number(value), name };
            } else {
              body = {
                ...locationData,
                [keyName]: { id: value, name },
              };
            }
            dispatch(setLocationData(body));
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

                <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 mt-4 \">
                  <div>
                    <PhoneInput
                      defaultCountry={"tr"}
                      value={values.phone}
                      onChange={(value) => setFieldValue("phone", value)}
                      inputClassName=" block w-full border border-gray-300 rounded-md text-lg"
                      inputStyle={{ height: "41.6px",fontSize:16 }}
                      countrySelectorStyleProps={{
                        buttonStyle:{ height: "41.6px" ,padding:"6px"}
                      }}
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
                      name="postal_code"
                      placeholder="Postal Code"
                      className="p-2 block w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="postal_code"
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
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <Field
                      as="textarea"
                      type="text"
                      name="address"
                      placeholder="Address"
                      className="p-2 block w-full border border-gray-300 rounded-md"
                      style={{ maxHeight: '200px' ,minHeight:"70px" }}
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
                  <Button
                    variant={dirty ? "outlined" : "disabled"}
                    className="bg-primary text-white"
                    type="submit"
                  >
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
