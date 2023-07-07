import firebaseAapp from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseAapp);

export default async function signup(email, password) {
  let user = null,
    error = null;
  try {
    user = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { user, error };
}
