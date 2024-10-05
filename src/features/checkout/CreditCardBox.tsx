import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Tooltip } from "@mui/material";
const validationSchema = Yup.object({
  cardNumber: Yup.string().required("Card number is required"),
  expiryDate: Yup.string().required("Expiration date is required"),
  securityCode: Yup.string().required("Security code is required"),
  nameOnCard: Yup.string().required("Name on card is required"),
});

const fieldClass =
  "mt-1 block w-full px-3 py-4 border border-[#dedede] rounded-md shadow-sm focus:outline focus:ring-primary focus:border-primary sm:text-sm outline-primary";

export const CreditCardBox = () => {
  const initialValues = {
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
    nameOnCard: "",
  };
  const onSubmit = (values: any) => {
    console.log("Form values:", values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="px-4">
          <div className="my-4 w-full ">
            <div className="relative">
              <Field
                id="cardNumber"
                type="text"
                name="cardNumber"
                Placeholder="Card Number"
                className={fieldClass}
              />

              <div className="absolute top-[50%] transform -translate-y-1/2 right-0 flex items-center justify-center pr-3 pointer-events-none  w-8 h-8">
                <i className="la la-lock text-black-75 text-2xl"></i>
              </div>
            </div>
            <ErrorMessage
              name="cardNumber"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4 flex flex-col sm:flex-row  gap-4 w-full">
            <div className="w-full">
              <Field
                id="expiryDate"
                type="text"
                name="expiryDate"
                inputmode="numeric"
                pattern="[0-9]*"
                Placeholder="Expiration Date (MM / YY)"
                className={fieldClass}
              />
              <ErrorMessage
                name="expiryDate"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="w-full">
              <div className="relative">
                <Field
                  id="securityCode"
                  type="text"
                  name="securityCode"
                  Placeholder="Security Code"
                  className={fieldClass}
                />
                <span className="text-[#707070] stroke-current absolute z-10 right-0 top-[50%] transform -translate-y-1/2 pr-3 cursor-pointer">
                  <Tooltip
                    arrow
                    title={
                      <div className="w-36 text-xs text-center py-2 leading-relaxed">
                        3-digit security code usually found on the back of your
                        card. American Express cards have a 4-digit code located
                        on the front.
                      </div>
                    }
                  >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-black-75">
                      ?
                    </div>
                  </Tooltip>
                </span>
              </div>

              <ErrorMessage
                name="securityCode"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          <div className="mb-4 w-full relative">
            <Field
              id="nameOnCard"
              type="text"
              name="nameOnCard"
              Placeholder="Name on Card"
              className={fieldClass}
            />

            <ErrorMessage
              name="nameOnCard"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
