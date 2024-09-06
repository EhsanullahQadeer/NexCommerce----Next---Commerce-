import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import Modal from './model';
import { useAddBillingAddressMutation, useFetchgetBillingAddressMutation } from '@/store/api/billingAddressApi'
import { useDispatch, useSelector } from 'react-redux';
import { BillingAddressSlice, selectBillingAddress, updateBillingAddress } from '@/store/slices/billingaddress/billingAddressSlice';
import { RootState } from '@/store';
import { selectShippingAddress } from '@/store/slices/shippingaddress/shippingAddressSlice';
import { useAddShippingAddressMutation, useFetchgetShippingAddressMutation } from '@/store/api/shippingAddressApi';
const cardStyles = 'w-full py-10 px-7 border border-black-300 bg-[#f9f9f9]';
const titleStyles = 'text-xl text-black-75 font-normal leading-[24px] mb-[5px]';
const textStyles =
  "text-black-500 font-extralight text-sm mb-2 leading-[24.1px]";

const AddressTab = () => {

  const { user } = useSelector((state: RootState) => state.auth);
  const shippingaddress = useSelector(selectShippingAddress);
  const billingaddress = useSelector(selectBillingAddress);

  console.log("billingaddress", billingaddress);

  const { first_name, last_name, email, phone, postal_code, country, city, state, address_line1, address_line2 } = billingaddress

  const [isModalOpen, setModalOpen] = useState(false);
  const [addresstype, setAddressType] = useState("")
  const [errors, setErrors] = useState<any>({});
  const [newAddress, setNewAddress] = useState<BillingAddressSlice>({
    user_id: user.id,
    first_name: "",
    last_name: "",
    phone: 0,
    email: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "",
    postal_code: 0
  });

  const dispatch = useDispatch();
  
  const [fetchgetBillingAddress] = useFetchgetBillingAddressMutation();
  const [addBillingAddress] = useAddBillingAddressMutation();
  const [fetchgetShippingAddress] = useFetchgetShippingAddressMutation();
  const [addShippingAddress] = useAddShippingAddressMutation();

  const fetchAddressData = async () => {
    try {
      if(user.id){
        await fetchgetBillingAddress({ user_id: user.id }).unwrap();
      await fetchgetShippingAddress({ user_id: user.id }).unwrap();
      }

    } catch (error) {
      console.error('Failed to fetch billing address', error);
    }
  };


  useEffect(() => {
    fetchAddressData();
  }, [user]);


  const handleAddressChange = (e: any) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setAddressType("")
    setNewAddress({
      user_id: user.id,
      first_name: "",
      last_name: "",
      phone: 0,
      email: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      postal_code: 0
    })
    setErrors({});
  }

  const validateForm = () => {
    const newErrors: any = {};
    if (!newAddress.first_name) newErrors.first_name = "First Name is required.";
    if (!newAddress.last_name) newErrors.last_name = "Last Name is required.";
    if (!newAddress.email || !/\S+@\S+\.\S+/.test(newAddress.email)) newErrors.email = "A valid email is required.";
    if (!newAddress.phone || isNaN(Number(newAddress.phone))) newErrors.phone = "A valid phone number is required.";
    if (!newAddress.address_line1) newErrors.address_line1 = "Address Line 1 is required.";
    if (!newAddress.city) newErrors.city = "City is required.";
    if (!newAddress.state) newErrors.state = "State is required.";
    if (!newAddress.country) newErrors.country = "Country is required.";
    if (!newAddress.postal_code || isNaN(Number(newAddress.postal_code))) newErrors.postal_code = "A valid postal code is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressSubmit = async () => {
    try {
      if (!validateForm()) return;
      if (addresstype == "billingaddress") {
        await addBillingAddress({...newAddress, user_id: user.id});
        await fetchgetBillingAddress({ user_id: user.id }).unwrap();
      }
      if (addresstype == "shippingaddress") {
        await addShippingAddress({...newAddress, user_id: user.id});
        await fetchgetShippingAddress({ user_id: user.id }).unwrap();
      }

      setAddressType("")
      handleModalClose();
    } catch (error) {
      console.error('Error adding/updating billing address:', error);
    }
  };

  const addEditHandleOfForm = (type: string) => {
    if (type == "billingaddress") {
      setNewAddress(billingaddress)
      setAddressType("billingaddress")
    }
    if (type == "shippingaddress") {
      setNewAddress(shippingaddress)
      setAddressType("shippingaddress")
    }
    setModalOpen(true);
  }

  return (
    <div className="mt-1.5">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <div className={cardStyles}>
          <div className='flex '>
            <div className="grid grid-cols-1">
              <div className='flex items-center'>
                <h3 className={titleStyles}>Billing Address</h3>
                <Button
                  className="!py-0 !bg-transparent !border-0 hover:!text-primary !font-extralight py-4"
                  onClick={() => addEditHandleOfForm("billingaddress")}
                >
                  {address_line1 ? "Edit" : "Add"} <i className="lar la-edit ml-1"></i>
                </Button>
              </div>

              {address_line1 ? (
                <div>
                  <p className={textStyles}>
                    {first_name} {last_name}
                  </p>
                  <p className={textStyles}>{address_line1}</p>
                  {address_line2 && (
                    <p className={textStyles}>{address_line2}</p>
                  )}
                  <p className={textStyles}>
                    {city}, {state},{' '}
                    {postal_code}, {country}
                  </p>
                  <p className={textStyles}>Email: {email}</p>
                  <p className={textStyles}>Phone: {phone}</p>
                </div>
              ) : (
                <p className={textStyles}>You have not set up this type of address yet.</p>
              )}
            </div>

          </div>
        </div>
        <div className={cardStyles}>
          <div className='flex items-center'>
            <h3 className={titleStyles}>Shipping Address</h3>
            <Button
              className="!py-0 !bg-transparent !border-0 hover:!text-primary !font-extralight py-4"
              onClick={() => addEditHandleOfForm("shippingaddress")}
            >
              {shippingaddress.address_line1 ? "Edit" : "Add"} <i className="lar la-edit ml-1"></i>
            </Button>
          </div>

          {shippingaddress.address_line1 ? (
            <div>
              <p className={textStyles}>
                {shippingaddress.first_name} {shippingaddress.last_name}
              </p>
              <p className={textStyles}>{shippingaddress.address_line1}</p>
              {shippingaddress.address_line2 && (
                <p className={textStyles}>{shippingaddress.address_line2}</p>
              )}
              <p className={textStyles}>
                {shippingaddress.city}, {shippingaddress.state},{' '}
                {shippingaddress.postal_code}, {shippingaddress.country}
              </p>
              <p className={textStyles}>Email: {shippingaddress.email}</p>
              <p className={textStyles}>Phone: {shippingaddress.phone}</p>
            </div>
          ) : (
            <p className={textStyles}>You have not set up this type of address yet.</p>
          )}
        </div>

        {isModalOpen && (
          <Modal onClose={handleModalClose}>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={newAddress.first_name}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={newAddress.last_name}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={newAddress.email}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={newAddress.phone ? newAddress.phone : ""}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <input
                    type="text"
                    name="address_line1"
                    placeholder="Address Line 1"
                    value={newAddress.address_line1}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {errors.address_line1 && <p className="text-red-500 text-sm">{errors.address_line1}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="address_line2"
                    placeholder="Address Line 2"
                    value={newAddress.address_line2}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={newAddress.postal_code ? newAddress.postal_code : ""}
                    onChange={handleAddressChange}
                    className="p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {errors.postal_code && <p className="text-red-500 text-sm">{errors.postal_code}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  className="p-2 block w-full border border-gray-300 rounded-md"
                />
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
              </div>

              <div className="flex justify-end mt-4">
                <Button className="mr-2" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button className="bg-primary text-white" onClick={handleAddressSubmit}>
                  Save
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AddressTab;
