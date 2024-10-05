import React, { ReactNode } from "react";
import { Formik, Form, FormikValues, FormikErrors } from "formik";
import * as Yup from "yup";
import creditCardType from "credit-card-type";
import { useScrollToFieldError } from "@/hooks/useScrollToFieldError";

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
const initialValues = {
  card_number: "",
  expiryDate: "",
  expire_month: "",
  expire_year:"",
  cvc: "",
  card_holder_name: "",
};

const ScrollToFieldError = () => {
  useScrollToFieldError();

  return null;
};
const FormWrap = ({ children }: { children: ReactNode }) => {
  const onSubmit = (values: any) => {
    console.log("Form values:", values);
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
        <Form>
          {children}
          <ScrollToFieldError />
        </Form>
      )}
    </Formik>
  );
};

export default FormWrap;
