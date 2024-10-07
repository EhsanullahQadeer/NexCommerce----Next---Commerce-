import React, { ReactNode, useMemo, useRef, useState } from "react";
import { Formik, Form, FormikValues, FormikErrors } from "formik";
import * as Yup from "yup";
import creditCardType from "credit-card-type";
import { useScrollToFieldError } from "@/hooks/useScrollToFieldError";
import { useCheckoutContext } from "./context/CheckoutContext";
import { TadressType } from "@/types/adress";
import AddressModal from "../dashboard/address/AddressModal";
import { clearCart, selectCart } from "@/store/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "@/store/api/ordersApi";
import { OrderItem } from "@/types/order";
import { RootState } from "@/store";
import {
  clearCoupon,
  selectCoupenCode,
} from "@/store/slices/coupencode/coupenCodeSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface PaymentFormValues {
  card_number: string;
  expire_month: string;
  expire_year: string;
  cvc: string;
  card_holder_name: string;
}

const currentYear = new Date().getFullYear();

const validationSchema = Yup.object({
  card_number: Yup.string()
    .required("Card number is required")
    .test("valid-card", "Invalid card number", (value) => {
      if (!value) return false;
      const cardData = creditCardType(value.replace(/\D/g, ""));
      return !!cardData.length;
    }),
  cvc: Yup.string()
    .required("Security code (CVC/CVV) is required")
    .matches(/^\d{3,4}$/, "CVC must be 3 or 4 digits") // Ensure CVC is either 3 or 4 digits
    .test("valid-cvc", "Invalid CVC for the card type", (value, context) => {
      const cardNumber = context.parent.card_number;
      const cardData = creditCardType(cardNumber.replace(/\D/g, ""));
      if (cardData.length > 0) {
        const cardInfo = cardData[0];
        if (cardInfo.code.size === 3) {
          return value?.length === 3;
        } else if (cardInfo.code.size === 4) {
          return value?.length === 4;
        }
      }
      return true;
    }),
  card_holder_name: Yup.string().required("Name on card is required"),
  expire_month: Yup.string()
    .required("Expiration month is required")
    .matches(/^(0[1-9]|1[0-2])$/, "Invalid month"), // Month must be 01-12
  expire_year: Yup.string()
    .required("Expiration year is required")
    .matches(/^\d{4}$/, "Invalid year")
    .test("is-future", "Year must be in the future", (value) => {
      return parseInt(value) >= currentYear;
    }),
});

// Function to check if expiration date is in the future
const isExpirationDateValid = (month: string, year: string) => {
  const currentDate = new Date();
  const expirationDate = new Date(`${year}-${month}-01`);
  return expirationDate >= currentDate;
};
const initialValues: PaymentFormValues = {
  card_number: "5526080000000006",
  expire_year: "2026",
  expire_month: "11",
  cvc: "123",
  card_holder_name: "Test User",
  // card_number: "",
  // expire_month: "",
  // expire_year: "",
  // cvc: "",
  // card_holder_name: "",
};

const ScrollToFieldError = () => {
  useScrollToFieldError();
  return null;
};
let addresstype: TadressType = "shippingaddress";
const FormWrap = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [addOrder] = useAddOrderMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { coupon_code } = useSelector(selectCoupenCode);
  const { cartDetails } = useSelector(selectCart);
  const {
    isBillingSame,
    selectedShippingAddress,
    selectedBillingAddress,
  } = useCheckoutContext();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const orderItems: OrderItem[] = useMemo(() => {
    return cartDetails.map((item) => {
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_order: item.product.price,
        variant_id: item.variant.id,
      };
    });
  }, [cartDetails]);

  const onSubmit = async (values: PaymentFormValues) => {
    if (!selectedShippingAddress) {
      addresstype = "shippingaddress";
      setModalOpen(true);
      return;
    } else if (!isBillingSame && !selectedBillingAddress) {
      addresstype = "billingaddress";
      setModalOpen(true);
      return;
    }

    const shipping_address_id = selectedShippingAddress?.id;
    const billing_address_id = isBillingSame
      ? selectedShippingAddress?.id
      : selectedBillingAddress?.id;

    if (shipping_address_id && billing_address_id) {
      const { province_name, district_name, village_name } =
        selectedShippingAddress;
      const payload = {
        ...values,
        card_number: values.card_number.replaceAll(" ", ""),
        shipping_address_id,
        billing_address_id,
        order_items: orderItems,
        user_id: user.id,
        province_name,
        district_name,
        village_name,
        ...(coupon_code ? { coupon_code } : {}),
      };

      try {
        await addOrder({ payload, fullPageLoader: true }).unwrap();
        toast.success(
          "Order placed successfully! Thank you for your purchase."
        );
        if (coupon_code) {
          dispatch(clearCoupon());
        }
        dispatch(clearCart());
        router.push("/dashboard/orders");
      } catch (error) {}
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validate={(values: FormikValues) => {
        let errors: FormikErrors<FormikValues> = {};

        // Validate expiration date (month + year)
        if (values.expire_month && values.expire_year) {
          if (!isExpirationDateValid(values.expire_month, values.expire_year)) {
            errors.expire_year = "Expiration date cannot be in the past";
          }
        }

        return errors;
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <div>
          <Form>
            {children}
            <ScrollToFieldError />
          </Form>
          {isModalOpen && (
            <AddressModal
              isOpen={isModalOpen}
              onClose={() => {
                setModalOpen(false);
              }}
              addresstype={addresstype}
            />
          )}
        </div>
      )}
    </Formik>
  );
};

export default FormWrap;
