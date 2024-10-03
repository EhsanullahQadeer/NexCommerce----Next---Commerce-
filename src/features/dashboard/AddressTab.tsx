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
import { IAddress, Village } from "@/types/adress";
import useSkipFirstRender from "@/hooks/useSkipFirstRender";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const cardStyles = "w-full py-10 px-7 border border-black-300 bg-[#f9f9f9]";
const titleStyles = "text-xl text-black-75 font-normal leading-[24px] mb-[5px]";
const textStyles =
  "text-black-500 font-extralight text-sm mb-2 leading-[24.1px]";
interface IlocationItem {
  id: number;
  name: string;
}
interface LocationData {
  provinces: IlocationItem;
  disctrict: IlocationItem;
  village: IlocationItem;
}

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

type Tadress = "shippingaddress" | "billingaddress";
const locationInitalData: LocationData = {
  provinces: { id: 0, name: "" },
  disctrict: { id: 0, name: "" },
  village: { id: 0, name: "" },
};
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [addresstype, setAddressType] = useState<Tadress>("billingaddress");

  const dispatch = useDispatch();

  const [fetchgetBillingAddress] = useFetchgetBillingAddressMutation();
  const [addBillingAddress] = useAddBillingAddressMutation();
  const [fetchgetShippingAddress] = useFetchgetShippingAddressMutation();
  const [addShippingAddress] = useAddShippingAddressMutation();
  const [fetchProvinces, { isLoading: isprovinceLoading }] =
    useFetchProvincesMutation();
  const [fetchDistricts, { isLoading: isDistrictLoading }] =
    useFetchDistrictsMutation();

  useEffect(() => {
    if (!provinces.length) {
      fetchProvinces({}).unwrap();
    }
  }, []);

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

  const handleModalClose = () => {
    setModalOpen(false);
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
  const addEditHandleOfForm = (type: Tadress) => {
    setAddressType(type);
    setModalOpen(true);
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

  const initialValues: IAddress = {
    first_name: adressData[addresstype].first_name,
    last_name: adressData[addresstype].last_name,
    phone: adressData[addresstype].phone,
    address: adressData[addresstype].address,
    neighborhood: adressData[addresstype].neighborhood,
    address_name: adressData[addresstype].address_name,
    provinces: null,
    disctrict: null,
    village: null,
    user_id: user.id,
  };
  return (
    <div className="mt-1.5">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <div className={cardStyles}>
          <div className="flex ">
            <div className="grid grid-cols-1">
              <div className="flex items-center">
                <h3 className={titleStyles}>Billing Address</h3>
                <Button
                  className="!py-0 !bg-transparent !border-0 hover:!text-primary !font-extralight py-4"
                  onClick={() => addEditHandleOfForm("billingaddress")}
                >
                  {address ? "Edit" : "Add"}{" "}
                  <i className="lar la-edit ml-1"></i>
                </Button>
              </div>

              {address ? (
                <div>
                  <p className={textStyles}>
                    {first_name} {last_name}
                  </p>
                  <p className={textStyles}>{address}</p>
                  {/* {address_line2 && (
                    <p className={textStyles}>{address_line2}</p>
                  )} */}
                  <p className={textStyles}>
                    {province}, {disctrict}, {village}
                  </p>
                  <p className={textStyles}>Email: {email}</p>
                  <p className={textStyles}>Phone: {phone}</p>
                </div>
              ) : (
                <p className={textStyles}>
                  You have not set up this type of address yet.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className={cardStyles}>
          <div className="flex items-center">
            <h3 className={titleStyles}>Shipping Address</h3>
            <Button
              className="!py-0 !bg-transparent !border-0 hover:!text-primary !font-extralight py-4"
              onClick={() => addEditHandleOfForm("shippingaddress")}
            >
              {shippingaddress.address ? "Edit" : "Add"}{" "}
              <i className="lar la-edit ml-1"></i>
            </Button>
          </div>

          {shippingaddress.address ? (
            <div>
              <p className={textStyles}>
                {shippingaddress.first_name} {shippingaddress.last_name}
              </p>
              <p className={textStyles}>{shippingaddress.address}</p>
              {/* {shippingaddress.address_line2 && (
                <p className={textStyles}>{shippingaddress.address_line2}</p>
              )} */}
              <p className={textStyles}>
                {shippingaddress.province}, {shippingaddress.disctrict}
              </p>
              <p className={textStyles}>Email: {shippingaddress.email}</p>
              <p className={textStyles}>Phone: {shippingaddress.phone}</p>
            </div>
          ) : (
            <p className={textStyles}>
              You have not set up this type of address yet.
            </p>
          )}
        </div>

        {isModalOpen && (
          <Modal onClose={handleModalClose}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleAddressSubmit}
            >
              {({ setFieldValue }) => {
                const handleLocationChange = (
                  e: ChangeEvent<HTMLSelectElement>
                ) => {
                  const { value, name: keyName } = e.target;
                  const selectedOption =
                    e.target.options[e.target.selectedIndex];
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
                    <div className="p-4">
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
                              districts.length && !isDistrictLoading
                                ? "border-gray-300 bg-white"
                                : "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                            name="disctrict"
                            onChange={handleLocationChange}
                            disabled={!districts.length || isDistrictLoading}
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
        )}
      </div>
    </div>
  );
};

export default AddressTab;
