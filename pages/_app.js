import "../globals.css";
import { Context } from "../context";
import { useState, useEffect } from "react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [cartItem, setCartItem] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  useEffect(() => {
    const item = localStorage.getItem("avatar");
    setAvatar(item);
  }, []);

  return (
    <Context.Provider
      value={{
        cart: [cartItem, setCartItem],
        cartTotal: [totalCartItem, setTotalCartItem],
        userAvatar: [avatar, setAvatar],
        auth: [isLoggedIn, setIsLoggedIn],
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}
