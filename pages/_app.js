import "../globals.css";
import { Context } from "../context";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  const [cartItem, setCartItem] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let cookie = Cookies.get("auth");

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
      {" "}
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </Context.Provider>
  );
}
