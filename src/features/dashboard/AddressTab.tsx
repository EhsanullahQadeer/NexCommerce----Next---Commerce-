import AddressModal from "@/components/AddressModal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useState } from "react";

const cardStyles = "w-full py-10 px-7 border border-black-300 bg-[#f9f9f9]";
const titleStyles = "text-xl text-black-75 font-normal leading-[24px] mb-[5px]";
const textStyles =
  "text-black-500 font-extralight text-sm mb-2 leading-[24.1px]";

const AddressTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Address");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const addresses = [
    "Billing Address",
    "User Name",
    "User Company",
    "John str",
    "New York, NY 10001",
    "1-234-987-6543",
    "yourmail@mail.com",
  ];

  return (
    <div className="mt-1.5">
      <div className="flex justify-between items-end md:items-center flex-col md:flex-row my-2">
        <div>
          <h1
            className={`text-[22px] sm:text-[22px] text-black-75
         tracking-[-1px] leading-[44px]`}
          >
            Addresses
          </h1>
          <p className="text-black-500 font-extralight text-sm mb-2.5 leading-[30.1px]">
            The following addresses will be used on the checkout page by
            default.
          </p>
        </div>
        <Button
          className="uppercase"
          size="xs"
          onClick={() => {
            setModalTitle("Add Address");
            toggleModal();
          }}
        >
          Add Address
          <i className="las la-plus ml-2"></i>
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <div className={cardStyles}>
          <h3 className={titleStyles}>Billing Address</h3>
          {addresses.map((address, index) => (
            <p key={index} className={textStyles}>
              {address}
            </p>
          ))}
          <div>
            <Button
              className="!p-0 !bg-transparent !border-0 hover:!text-primary !font-extralight"
              onClick={() => {
                setModalTitle("Edit Address");
                toggleModal();
              }}
            >
              Edit <i className="lar la-edit ml-1"></i>
            </Button>
          </div>
        </div>
        <div className={cardStyles}>
          <h3 className={titleStyles}>Shipping Address</h3>
          <p className={textStyles}>
            You have not set up this type of address yet.
          </p>
          <div>
            <Button
              className="!p-0 !bg-transparent !border-0 hover:!text-primary !font-extralight"
              onClick={() => {
                setModalTitle("Edit Address");
                toggleModal();
              }}
            >
              Edit <i className="lar la-edit ml-1"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddressModal toggleModal={toggleModal} title={modalTitle} />
      )}
    </div>
  );
};

export default AddressTab;
