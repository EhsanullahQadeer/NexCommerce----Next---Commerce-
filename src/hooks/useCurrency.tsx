import { selectCurrency } from "@/store/slices/currenctlist/currencySlice";
import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";
import {
  calculatePriceInCurrency,
  findCurrencyById,
} from "@/utility/calculatePriceInCurrency";
import { currencySymbol } from "@/utility/currencySymbols";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useCurrency = (): {
  formatPrice: (price: number, currency_id?: number) => string;
  calculatePrice: (price: number, currency_id: number) => number;
} => {
  const { currencyData } = useSelector(selectCurrency);
  const { selected_currencies_id } = useSelector(selectSiteSetting);
  const currencyCode = useMemo(
    () =>
      findCurrencyById(currencyData, selected_currencies_id)?.currency_code ||
      "TRY",
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected_currencies_id]
  );
  const symbol = currencyCode ? currencySymbol[currencyCode] : "₺";

  const formatPrice = (price: number, currency_id?: number): string => {
    const calculatedPrice = currency_id
      ? calculatePriceInCurrency({
          price,
          currency_id,
          selected_currencies_id,
          currencyData,
        })
      : price;
    const formattedPrice = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(calculatedPrice);

    return `${symbol}${formattedPrice}`;
  };
  const calculatePrice = (price: number, currency_id: number) => {
    return calculatePriceInCurrency({
      price,
      currency_id,
      selected_currencies_id,
      currencyData,
    });
  };
  return { formatPrice, calculatePrice };
};

export default useCurrency;
