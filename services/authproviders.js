import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import firebaseAapp from "./firebase";

const auth = getAuth(firebaseAapp);

const googleProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
export { auth, googleProvider, facebookAuthProvider };
