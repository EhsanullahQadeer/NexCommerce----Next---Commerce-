import React from "react";
import Select from "../Select";
import Input from "../Input";
import Button from "../Button";

interface ModalProps {
  toggleModal: () => void;
}

const AddressModal = ({ toggleModal }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md rounded p-6 relative">
        <div
          className="absolute right-1 top-1 p-2 text-2xl text-black-200 font-thin hover:text-primary cursor-pointer"
          onClick={toggleModal}
        >
          <i className="las la-times-circle"></i>
        </div>
        <h1
          className={`text-[22px] sm:text-[22px] text-black-75
         tracking-[-1px] leading-[44px]`}
        >
          Add Address
        </h1>
        <div className="space-y-4">
          <div>
            <Input label="Address Name" placeholder="Enter address name" />
          </div>
          <div className="flex w-full gap-4">
            <Input label="Name" placeholder="Enter Name" />
            <Input label="Surname" placeholder="Enter surname" />
          </div>
          <div className="flex w-full gap-4">
            <div className="w-[50%]">
              <label
                className={
                  "inline-block text-sm text-black-100 font-extralight mb-1 leading-[26.04px]"
                }
              >
                District
              </label>
              <Select
                label="District"
                options={[{ value: "Sindh", label: "Sindh" }]}
              />
            </div>
            <div className="w-[50%]">
              <label
                className={
                  "inline-block text-sm text-black-100 font-extralight mb-1 leading-[26.04px]"
                }
              >
                City
              </label>
              <Select
                label="City"
                options={[{ value: "Karachi", label: "Karachi" }]}
              />
            </div>
          </div>
          <div>
            <Input label="Neighborhood" placeholder="Enter neighborhood" />
          </div>
          <div>
            <label
              className={
                "inline-block text-sm text-black-100 font-extralight mb-1 leading-[26.04px]"
              }
            >
              Address
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 focus:border-primary sm:text-sm focus:outline-none"
              placeholder="Complete Address here..."
              rows={3}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <Button className="w-full flex justify-center">Save Address</Button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
