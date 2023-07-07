import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "nextjs-ecommerce-c1457.appspot.com",
  messagingSenderId: "395338672751",
  appId: "1:395338672751:web:eff1ed764cfaf8f087fb9a",
  measurementId: "G-Z4FMQ0EL41",
};

let firebaseAapp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseAapp;
