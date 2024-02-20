import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Context } from "../context";
import Spinner from "../components/subcomponents/Spinner";
import Notification from "../components/subcomponents/Notification";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithFacebook, signInWithGoogle } from "../services/firebase";

export default function Signin() {
  const getData = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password)
  };

  useEffect(() => {
    if (loading) return;
    if (user) router.push("/");
  }, [user, loading]);


  return (
    <div>
      <Navbar />
      <Notification />
      <div className="bg-gray-100 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white w-full max-w-xl space-y-8 border border-gray-100 p-8 rounded-xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
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
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
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
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="w-full p-3 bg-slate-800 rounded-md hover:bg-slate-700 text-white"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                {loading ? <Spinner /> : "Sign In"}
              </button>
              <div className="text-center mt-8">
                <p>
                  <span className=" text-base font-medium text-center text-gray-900">
                    Don't have an account yet?
                  </span>

                  <Link href="/Signup">
                    <span className="ml-2 text-base font-semibold text-center text-blue-500 hover:text-blue-700">
                      Sign Up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-slate-900">
                or
              </p>
            </div>
            <div className="flex flex-row w-full ">
              <div className="flex items-center justify-center h-[52px] w-1/2 ">
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center h-[52px] bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <FcGoogle className="text-2xl" />
                  <span className="ml-2 text-sm">Sign in with Google</span>
                </button>
              </div>
              <div className="flex items-center justify-start h-[52px] w-1/2 ml-4">
                <button
                  type="button"
                  onClick={signInWithFacebook}
                  className="flex w-full items-center justify-center h-[52px] bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <BsFacebook className="text-2xl text-[#1778f2]" />
                  <span className="ml-2">Sign in with Facebook</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
