import React, { useState, useEffect } from "react";
import Navbar from "../components/Navigation/Navbar";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import Spinner from "../components/Animation/Spinner";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword, signInWithGoogle, signInWithFacebook } from "../services/firebase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const db = getFirestore();
  const [user, loading, error] = useAuthState(auth);


  const register = () => {
    const response = registerWithEmailAndPassword(name, email, password);
    console.log(response)
  };

  useEffect(() => {
    if (loading) return;
    if (user) router.push("/");
  }, [user, loading]);


  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white w-full max-w-xl space-y-8 border border-gray-100 p-8 rounded-xl shadow-xl ">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
          {error ? (
            <div className="border p-3 border-red-400 bg-red-100/50 text-center">
              <p className="text-red-500">{error} </p>
            </div>
          ) : (
            ""
          )}
          <form className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              <div className="mt-4">
                <label htmlFor="email" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="placeholder:text-gray-300 text-base font-medium text-left text-slate-800  focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-3 rounded-md bg-white border border-gray-400"
                  placeholder="Name"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="placeholder:text-gray-300 text-base font-medium text-left text-slate-800  focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-3 rounded-md bg-white border border-gray-400"
                  placeholder="Email"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-4 placeholder:text-gray-300 text-base font-medium text-left text-slate-800  focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-3 rounded-md bg-white border border-gray-400"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={register}
                className="w-full p-3 bg-slate-800 rounded-md hover:bg-slate-700 text-white transition duration-300"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                {loading ? <Spinner /> : "Sign Up"}
              </button>
              <div className="text-center mt-8">
                <p>
                  <span className=" text-base font-semibold text-center text-gray-900">
                    Already have an account ?
                  </span>

                  <Link href="/Signin">
                    <span className="ml-2 text-base font-semibold text-center text-blue-500 hover:text-blue-700">
                      Sign In
                    </span>
                  </Link>
                </p>
              </div>
            </div>
            <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p class="mx-4 mb-0 text-center font-semibold dark:text-slate-900">
                or
              </p>
            </div>
            <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 sm:gap-0 w-full ">
              <div className="flex items-center justify-center h-[52px] w-full sm:w-1/2 ">
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center h-[52px] transition duration-300 bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <FcGoogle className="text-2xl" />
                  <span className="ml-2 text-sm whitespace-nowrap">Sign in with Google</span>
                </button>
              </div>
              <div className="flex items-center justify-start h-[52px] w-full sm:w-1/2 ml-0 sm:ml-4">
                <button
                  type="button"
                  onClick={signInWithFacebook}
                  className="flex w-full items-center justify-center h-[52px] transition duration-300 bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <BsFacebook className="text-2xl text-[#1778f2]" />
                  <span className="ml-2" whitespace-nowrap>Sign in with Facebook</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div >
      <Footer />
    </div >
  );
}
