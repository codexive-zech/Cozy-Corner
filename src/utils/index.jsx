import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
}); // general base url

export const formatPrice = (priceInUSD) => {
  const exchangeRate = 30;
  const priceInNaira = (priceInUSD * exchangeRate).toFixed(2);

  const nairaAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(priceInNaira);
  return nairaAmount;
}; // formatting price to naira equivalent

// Array.from method to create an array of a specific length, determined by the number parameter. The second argument of the Array.from method is a callback function that will be invoked for each element in the array. The underscore () is a placeholder for the current element (which we don't need in this case), and index is the index of the current element.
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
