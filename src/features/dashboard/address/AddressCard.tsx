import Button from "@/components/Button";
import { IAddress, TadressType } from "@/types/adress";
import React, { useState } from "react";
import AddressModal from "./AddressModal";
import useAddress from "@/hooks/adress/useAddress";
import { toast } from "react-toastify";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setLocationData } from "@/store/slices/adress/adressSlice";
import Skeleton from "react-loading-skeleton";

const cardStyles = "w-full py-10 px-7 border border-black-300 bg-[#f9f9f9]";
const titleStyles = "text-xl text-black-75 font-normal leading-[24px] mb-[5px]";
const textStyles =
  "text-black-500 font-extralight text-sm mb-2 leading-[24.1px]";
const buttonStyles = "text-primary hover:text-secondary py-2 px-4";
const cardContainerStyles = "grid grid-cols-1 gap-6 pt-4";
const addressBoxStyles = "p-4 border border-gray-300 bg-gray shadow-md";
interface Iprops {
  title: string;
  addresstype: TadressType;
  isLoading: boolean;
}

const AddressCard = (props: Iprops) => {
  const { title, addresstype, isLoading } = props;

  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [editAdressData, setEditAdressData] = useState<IAddress>();
  const { adressData } = useAddress();

  const adressArray = adressData[addresstype].id
    ? [adressData[addresstype]]
    : [];
  const isAdressAvailable = !!adressArray.length && !isLoading;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isAdressAvailable) {
  //     const adressData = adressArray[0];
  //     let body: IlocationData = {
  //       ...locationInitalData,
  //       provinces: { ...locationInitalData.provinces },
  //       disctrict: { ...locationInitalData.disctrict },
  //       village: { ...locationInitalData.village },
  //     };

  //     body.provinces.id = adressData.provinces;
  //     body.disctrict.id = adressData.disctrict;
  //     body.village.id = adressData.village;
  //     dispatch(setLocationData(body));
  //   }
  // }, [isAdressAvailable]);

  return (
    <>
      <div className={cardStyles}>
        <div className="flex ">
          <div className="grid grid-cols-1 w-full">
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

            {isLoading ? (
              <Skeleton height={325} />
            ) : isAdressAvailable ? (
              <div className={cardContainerStyles}>
                {adressArray.map((item) => {
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
                  } = item;

                  // const provinceName = provinces.find(
                  //   (item) => item.id == id
                  // )?.name;
                  // const disctrictName = districts.find(
                  //   (item) => item.id == id
                  // )?.district_name;
                  // const villageName = villages.find(
                  //   (item) => item.id == id
                  // )?.village_name;

                  return (
                    <div key={"address-" + id} className={addressBoxStyles}>
                      <p className={textStyles + " mb-0"}>
                        <strong>{address_name}</strong>
                      </p>
                      <p className={textStyles}>
                        Name: {first_name} {last_name}
                      </p>
                      <p className={textStyles}>Phone: {phone}</p>
                      <p className={textStyles}>Province: {provinceId}</p>
                      <p className={textStyles}>District: {disctrictId}</p>
                      <p className={textStyles}>Village: {villageId}</p>
                      <p className={textStyles}>Address: {address}</p>
                      <div className="flex space-x-4 mt-4">
                        <Button
                          className={buttonStyles}
                          onClick={() => {
                            setModalOpen(true);
                            setEditAdressData({
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
                            });
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
                        {/* <Button
                          className={buttonStyles}
                          onClick={() => {
                            toast.warning("Delete api is not available!");
                          }}
                        >
                          Delete <i className="la la-trash ml-1"></i>
                        </Button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={textStyles}>
                You have not set up this type of address yet.
              </p>
            )}
          </div>
        </div>
      </div>
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
