import React, { useState } from "react";
import { Form, Field, ErrorMessage } from "formik";
import { Tooltip } from "@mui/material";
import creditCardType, { getTypeInfo } from "credit-card-type";
import { cardIcons } from "@/app/checkout/cardIcon";

const fieldClass =
  "mt-1 block w-full px-3 py-4 border border-[#dedede] rounded-md shadow-sm focus:outline focus:ring-primary focus:border-primary sm:text-sm outline-primary";

export const CreditCardBox = () => {
  const [cardType, setCardType] = useState<string | null>(null);

  function prettyCardNumber(card_number: string, cardType: string) {
    var card = getTypeInfo(cardType);

    if (card) {
      var offsets = [0].concat(0, card.gaps, card_number.length);
      var components = [];

      for (var i = 0; offsets[i] < card_number.length; i++) {
        var start = offsets[i];
        var end = Math.min(offsets[i + 1], card_number.length);
        components.push(card_number.substring(start, end));
      }

      return components.join(" ");
    }

    return card_number;
  }

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const card_number = e.target.value.replace(/\D/g, "");
    const cardData = creditCardType(card_number);

    if (cardData.length > 0) {
      const cardInfo = cardData[0];
      if (cardData.length === 1) {
        setCardType(cardInfo.niceType);
      }

      const { gaps, lengths } = cardInfo;
      const maxLength = Math.max(...lengths);
      const truncatedCardNumber = card_number.slice(0, maxLength);
      const formattedNumber = prettyCardNumber(
        truncatedCardNumber,
        cardInfo.type
      );
      e.target.value = formattedNumber;
      if (!formattedNumber) {
        setCardType(null);
      }
    } else {
      setCardType(null);
    }
  };
  return (
    <div className="px-4">
      <div className="my-4  w-full relative">
        <Field
          id="card_holder_name"
          type="text"
          name="card_holder_name"
          Placeholder="Name on Card"
          className={fieldClass}
        />

        <ErrorMessage
          name="card_holder_name"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
      <div className="mb-4  w-full ">
        <div className="relative">
          <Field
            id="card_number"
            type="text"
            name="card_number"
            Placeholder="Card Number"
            className={fieldClass}
            onInput={handleCardInput}
          />

          <div className="absolute top-[50%] transform -translate-y-1/2 right-0 flex items-center justify-center pr-3 pointer-events-none ">
            {cardType &&
              cardType in cardIcons &&
              React.createElement(cardIcons[cardType])}
            <i className="la la-lock text-black-75 text-2xl ml-3"></i>
          </div>
        </div>
        <ErrorMessage
          name="card_number"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>

      <div className="mb-4 flex flex-col sm:flex-row  gap-4 w-full">
        <div className="w-full">
          <Field
            id="expire_month"
            type="text"
            name="expire_month"
            inputMode="numeric"
            pattern="^(0[1-9]|1[0-2])$"
            Placeholder="Expiration month (MM)"
            maxLength="2"
            className={fieldClass}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              let value = e.target.value.replace(/[^0-9]/g, "");
              if (value.length === 1 && value > "1") {
                value = "0" + value;
              } else if (value.length === 2 && (value < "01" || value > "12")) {
                value = value.slice(0, 1);
              }

              e.target.value = value;
            }}
          />
          <ErrorMessage
            name="expire_month"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div className="w-full">
          <Field
            id="expire_year"
            type="text"
            name="expire_year"
            inputmode="numeric"
            pattern="[0-9]*"
            Placeholder="Expiration Year (YYYY)"
            className={fieldClass}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              let value = e.target.value.replace(/[^0-9]/g, "");
              if (value.length > 4) {
                value = value.slice(0, 4);
              }
              e.target.value = value;
            }}
          />
          <ErrorMessage
            name="expire_year"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div className="w-full">
          <div className="relative">
            <Field
              id="cvc"
              type="text"
              name="cvc"
              Placeholder="Security Code (CVC/CVV)"
              className={fieldClass}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                const cvc = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
                e.target.value = cvc;
              }}
            />
            <span className="text-[#707070] stroke-current absolute z-10 right-0 top-[50%] transform -translate-y-1/2 pr-3 cursor-pointer">
              <Tooltip
                arrow
                title={
                  <div className="w-36 text-xs text-center py-2 leading-relaxed">
                    3-digit security code usually found on the back of your
                    card. American Express cards have a 4-digit code located on
                    the front.
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
            name="cvc"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
      </div>
    </div>
  );
};
