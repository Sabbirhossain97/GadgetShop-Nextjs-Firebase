import "../globals.css";
import Context from "../context";
import { useState } from "react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [cartItem, setCartItem] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(null);
  return (
    <Context.Provider
      value={{
        cart: [cartItem, setCartItem],
        cartTotal: [totalCartItem, setTotalCartItem],
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}
