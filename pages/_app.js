import "../globals.css";
import { Context } from "../context";
import { useState, useEffect, useReducer } from "react";
import { reducer } from "../components/Reducers/reducer";
import { onAuthStateChanged } from "firebase/auth";
import Notification from "../components/Animation/Notification";
import { db, auth } from "../services/firebase";
import getWishlistData from "../services/wishlist/getWishlist";

export default function MyApp({ Component, pageProps }) {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);
  const initialState = {
    items: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getWishlistData(db, user, setWishlist);
  }, [user]);

  useEffect(() => {
    setTotalCartItem(state.items.length)
  }, [state.items])


  return (
    <>
      <Notification />
      <Context.Provider
        value={{
          cartTotal: [totalCartItem, setTotalCartItem],
          wishlistData: [wishlist, setWishlist],
          userAvatar: [avatar, setAvatar],
          cartReducer: [state, dispatch],
          isAuth: [user, setUser],
          sidebar: [isCartSidebarOpen, setIsCartSidebarOpen],
          categorySidebar: [isCategorySidebarOpen, setIsCategorySidebarOpen]
        }}
      >
        <div className="font-sans">
          <Component {...pageProps} />
        </div>
      </Context.Provider>
    </>
  );
}
