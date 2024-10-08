import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { message } from "antd";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  let error;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    message.error(err.message);
    error = err.message;
    return error
  }
};

const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await updateProfile(user, {
      displayName: username
    });

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username,
      authProvider: "local",
      email,
    });
  } catch (err) {
    message.error(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  storage,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};