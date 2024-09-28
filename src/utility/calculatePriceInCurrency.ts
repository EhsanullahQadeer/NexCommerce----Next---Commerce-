import { Currency } from "@/store/slices/currenctlist/currencySlice";

export const findCurrencyById = (currencyData: Currency[], currency_id: number) => {
    const currencyCode = currencyData.find(
        (currency) => currency.id.toString() === currency_id.toString()
    );
    return currencyCode;
};[]
export const calculatePriceInCurrency = ({
    price,
    currency_id,
    selected_currencies_id,
    currencyData,
}: {
    price: number;
    currency_id: number;
    selected_currencies_id: number;
    currencyData: Currency[];
}): number => {
    if (currency_id == selected_currencies_id) {
        return price;
    } else {
        const currency = findCurrencyById(currencyData, currency_id);
        if (!currency || !currency.exchange_rate_to_usd) {
            return price;
        }

        const { exchange_rate_to_usd } = currency;
        const exchangeRate = parseFloat(exchange_rate_to_usd);

        if (isNaN(exchangeRate) || exchangeRate === 0) {
            console.warn("Invalid exchange rate");
            return price;
        }
       return price * exchangeRate
    }
};