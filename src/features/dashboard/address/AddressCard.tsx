import Button from "@/components/Button";
import { IAddress, TadressType } from "@/types/adress";
import React, { useState } from "react";
import AddressModal from "./AddressModal";

const cardStyles = "w-full py-10 px-7 border border-black-300 bg-[#f9f9f9]";
const titleStyles = "text-xl text-black-75 font-normal leading-[24px] mb-[5px]";
const textStyles =
  "text-black-500 font-extralight text-sm mb-2 leading-[24.1px]";
interface Iprops {
  title: string;
  addressArray: IAddress[];
  addresstype: TadressType;
}
const AddressCard = (props: Iprops) => {
  const { title, addressArray, addresstype } = props;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const isAdressAvailable = !!addressArray.length;
  return (
    <>
      <div className={cardStyles}>
        <div className="flex ">
          <div className="grid grid-cols-1">
            <div className="flex items-center">
              <h3 className={titleStyles}>{title}</h3>
              <Button
                className="!bg-transparent !border-0 hover:!text-primary !font-extralight py-4"
                onClick={() => setModalOpen(true)}
              >
                {!isAdressAvailable && (
                  <>
                    Add <i className="lar la-edit ml-1"></i>
                  </>
                )}
              </Button>
            </div>

            {isAdressAvailable ? (
              <div>
                {/* <p className={textStyles}>
                  {first_name} {last_name}
                </p>
                <p className={textStyles}>{address}</p>
                <p className={textStyles}>
                  {province}, {disctrict}, {village}
                </p>
                <p className={textStyles}>Email: {email}</p>
                <p className={textStyles}>Phone: {phone}</p> */}
              </div>
            ) : (
              <p className={textStyles}>
                You have not set up this type of address yet.
              </p>
            )}
          </div>
        </div>
      </div>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        addresstype={addresstype}
        // adressData={adressData[addresstype]}
      />
    </>
  );
};

export default AddressCard;
