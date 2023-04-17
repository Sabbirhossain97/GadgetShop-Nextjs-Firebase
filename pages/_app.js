import "../globals.css";
import { Context } from "../context";
import { useState, useEffect, useReducer } from "react";
// import Cookies from "js-cookie";
import { Inter } from "next/font/google";
import { reducer } from "../components/Reducers/reducer";
const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // let cookie = Cookies.get("auth");
  const initialState = {
    items: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const item = localStorage.getItem("avatar");
    setAvatar(item);
  }, []);

  return (
    <Context.Provider
      value={{
        cartTotal: [totalCartItem, setTotalCartItem],
        userAvatar: [avatar, setAvatar],
        auth: [isLoggedIn, setIsLoggedIn],
        cartReducer: [state, dispatch],
      }}
    >
      {" "}
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </Context.Provider>
  );
}
