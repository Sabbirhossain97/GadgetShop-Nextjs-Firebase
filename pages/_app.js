import "../globals.css";
import { Context } from "../context";
import { useState, useEffect, useReducer } from "react";
import { reducer } from "../components/Reducers/reducer";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseAapp from "../services/firebase";
import Notification from "../components/Animation/Notification";
import { db } from "../services/firebase";
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

const auth = getAuth(firebaseAapp);

export default function MyApp({ Component, pageProps }) {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    const getWishlistData = async () => {
      if(!user){
        setWishlist([])
        return
      }
      try {
        if (!db) {
          console.error('Firestore is not initialized.');
          return;
        }
        const wishlistRef = collection(db, 'wishlists');
        if (!wishlistRef) {
          console.error('Wishlist collection does not exist.');
          return;
        }
        const q = query(wishlistRef, where('userId', '==', user.uid));
        onSnapshot(q, (snapshot) => {
          const wishlistData = [];
          snapshot.forEach((doc) => {
            wishlistData.push({ id: doc.id, ...doc.data() });
          });
          const { Products } = wishlistData?.[0];
          setWishlist(Products);
        });
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    getWishlistData();
  }, [user]);

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
          sidebar: [isSidebarOpen, setIsSidebarOpen]
        }}
      >
        <div className="font-sans">
          <Component {...pageProps} />
        </div>
      </Context.Provider>
    </>
  );
}
