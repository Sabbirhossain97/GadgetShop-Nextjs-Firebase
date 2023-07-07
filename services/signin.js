import firebaseAapp from "./firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseAapp);

export default async function signIn(email, password) {
  let user = null,
    error = null;
  try {
    user = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { user, error };
}
