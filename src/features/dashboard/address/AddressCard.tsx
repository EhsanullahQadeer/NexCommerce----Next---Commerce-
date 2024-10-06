import Button from "@/components/Button";
import { IAddress, TadressType } from "@/types/adress";
import React, { useEffect, useState } from "react";
import AddressModal from "./AddressModal";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setLocationData } from "@/store/slices/adress/adressSlice";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/lib/utils";
import { selectShippingAddress } from "@/store/slices/shippingaddress/shippingAddressSlice";
import { selectBillingAddress } from "@/store/slices/billingaddress/billingAddressSlice";

const cardStyles = "w-full py-10 px-7 border border-black-300 bg-[#f9f9f9]";
const titleStyles = "text-xl text-black-75 font-normal leading-[24px] mb-[5px]";
const textStyles =
  "text-black-500 font-extralight text-sm mb-2 leading-[24.1px]";
const buttonStyles = "text-primary hover:text-secondary py-2 px-4";
const cardContainerStyles = "grid grid-cols-1 gap-6 pt-4";
const addressBoxStyles = "p-4 border border-gray-300 bg-gray shadow-md";
interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (adress: IAddress) => void;
  setSelectedAddress?: (adress: IAddress) => void;
  selectedAddress?: IAddress;
  disableEdit?: boolean;
  btnBoxProps?: {
    className?: string;
  };
  addNewBtnBox?: {
    className?: string;
    btn?: {
      className?: string;
    };
  };
}
interface Iprops {
  title?: string;
  addresstype: TadressType;
  isLoading: boolean;
  type?: "onlyChildCard";
  cardProps?: CardProps;
}

const AddressCard = (props: Iprops) => {
  const { title, addresstype, isLoading, type, cardProps } = props;
  const {
    selectedAddress,
    setSelectedAddress,
    disableEdit,
    btnBoxProps,
    addNewBtnBox,
  } = cardProps || {};
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [editAdressData, setEditAdressData] = useState<IAddress>();
  const shippingaddress = useSelector(selectShippingAddress);
  const billingaddress = useSelector(selectBillingAddress);
  const adressData = { shippingaddress, billingaddress };

  const adressArray = adressData[addresstype].id
    ? [adressData[addresstype]]
    : [];
  const isAdressAvailable = !!adressArray.length && !isLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdressAvailable && setSelectedAddress) {
      setSelectedAddress(adressArray[0] as unknown as IAddress);
    }
  }, [isAdressAvailable]);

  const Card = () =>
    isLoading ? (
      <Skeleton height={325} />
    ) : isAdressAvailable ? (
      adressArray.map((item) => {
        const {
          first_name,
          last_name,
          id,
          address,
          provinces: provinceId,
          disctrict: disctrictId,
          village: villageId,
          phone,
          address_name,
          postal_code,
          email,
        } = item;
        const addressData: IAddress = {
          first_name,
          last_name,
          user_id: user.id,
          address,
          provinces: provinceId,
          disctrict: disctrictId,
          village: villageId,
          phone,
          address_name,
          postal_code,
          email,
        };
        return (
          <div
            key={"address-" + id}
            {...cardProps}
            className={cn(
              addressBoxStyles,
              cardProps?.className,
              "relative ",
              selectedAddress?.id === id && "border-primary"
            )}
            onClick={() =>
              cardProps?.onClick && cardProps?.onClick(addressData)
            }
          >
            <p className={textStyles + " mb-0"}>
              <strong>{address_name}</strong>
            </p>
            <p className={textStyles}>
              Name: {first_name} {last_name}
            </p>
            <p className={textStyles}>Phone: {phone}</p>
            <p className={textStyles}>Email: {email}</p>
            <p className={textStyles}>
              Location: {provinceId}, {disctrictId}, {villageId}
            </p>
            <p className={textStyles}>Address: {address}</p>
            <div className={cn("flex space-x-4 mt-4", btnBoxProps?.className)}>
              {!disableEdit && (
                <Button
                  className={buttonStyles}
                  onClick={() => {
                    setModalOpen(true);
                    setEditAdressData(addressData);
                    dispatch(
                      setLocationData({
                        provinces: { id: provinceId, name: "" },
                        disctrict: { id: disctrictId, name: "" },
                        village: { id: villageId, name: "" },
                      })
                    );
                  }}
                >
                  Edit <i className="lar la-edit ml-1"></i>
                </Button>
              )}
              {/* <Button
                className={buttonStyles}
                onClick={() => {
                  toast.warning("Delete api is not available!");
                }}
              >
                Delete <i className="la la-trash ml-1"></i>
              </Button> */}
            </div>
            {selectedAddress?.id === id && (
              <div className="flex  absolute top-[-10px] right-[-10px] w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-primary bg-primary items-center justify-center">
                <i className="las la-check text-white text-md sm:text-lg" />
              </div>
            )}
          </div>
        );
      })
    ) : (
      <div className={addNewBtnBox?.className}>
        <p className={textStyles}>
          You have not set up this type of address yet.
        </p>
        <div className={addNewBtnBox?.btn?.className}>
          <Button
            className={buttonStyles}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add New <i className="lar la-edit ml-1"></i>
          </Button>
        </div>
      </div>
    );

  return (
    <>
      {type === "onlyChildCard" ? (
        <Card />
      ) : (
        <div className={cardStyles}>
          <div className="flex ">
            <div className="grid grid-cols-1 w-full">
              <div className="flex items-center">
                <h3 className={titleStyles}>{title}</h3>
              </div>

              <div className={cardContainerStyles}>
                <Card />
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          addresstype={addresstype}
          adressData={editAdressData}
        />
      )}
    </>
  );
};

export default AddressCard;
