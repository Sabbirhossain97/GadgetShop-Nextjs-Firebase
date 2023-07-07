import "../globals.css";
import { Context } from "../context";
import { useState, useEffect, useReducer } from "react";
import { Inter } from "next/font/google";
import { reducer } from "../components/Reducers/reducer";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseAapp from "../services/firebase";
const inter = Inter({ subsets: ["latin"] });

const auth = getAuth(firebaseAapp);

export default function MyApp({ Component, pageProps }) {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);
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

  return (
    <Context.Provider
      value={{
        cartTotal: [totalCartItem, setTotalCartItem],
        userAvatar: [avatar, setAvatar],
        cartReducer: [state, dispatch],
        isAuth: [user, setUser],
      }}
    >
      <div className="font-sans">
        <Component {...pageProps} />
      </div>
    </Context.Provider>
  );
}
