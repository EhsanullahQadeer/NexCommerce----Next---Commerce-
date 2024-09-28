import { selectCurrency } from "@/store/slices/currenctlist/currencySlice";
import { selectSiteSetting } from "@/store/slices/siteSetting/siteSettingSlice";
import { currencySymbol } from "@/utility/currencySymbols";
import { useSelector } from "react-redux";

const useCurrency = (): { formatPrice: (price: number) => string } => {
  const { currencyData } = useSelector(selectCurrency);
  const { selected_currencies_id } = useSelector(selectSiteSetting);

  const currencyCode = currencyData.find(
    (currency) => currency.id.toString() === selected_currencies_id.toString()
  )?.currency_code;

  const symbol = currencyCode ? currencySymbol[currencyCode] : "₺";

  const formatPrice = (price: number): string => {
    return `${symbol}${price.toFixed(2)}`;
  };

  return { formatPrice };
};

export default useCurrency;
