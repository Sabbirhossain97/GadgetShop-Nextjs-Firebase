import "../globals.css";
import { Context } from "../context";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Notification from "../components/Animation/Notification";
import { db, auth } from "../services/firebase";
import getWishlistData from "../services/wishlist/getWishlist";
import getCartItems from "../services/cart/getCartItems";

export default function MyApp({ Component, pageProps }) {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);
 
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
    getCartItems(db, user, setCartItems);
  }, [user]);

  useEffect(() => {
    getWishlistData(db, user, setWishlist);
  }, [user]);

  useEffect(() => {
    if (cartItems) {
      setTotalCartItem(cartItems.length)
    }
  }, [cartItems])

  return (
    <>
      <Notification />
      <Context.Provider
        value={{
          cartTotal: [totalCartItem, setTotalCartItem],
          cartData: [cartItems, setCartItems],
          wishlistData: [wishlist, setWishlist],
          userAvatar: [avatar, setAvatar],
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
