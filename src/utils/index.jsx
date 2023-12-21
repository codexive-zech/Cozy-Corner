import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
}); // general base url

export const formatPrice = (priceInUSD) => {
  const exchangeRate = 50;
  const priceInNaira = (priceInUSD * exchangeRate).toFixed(2);

  const nairaAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(priceInNaira);
  return nairaAmount;
}; // formatting price to naira equivalent

export const generateAmountOption = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
}; // generating numeric options value for amount
