import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import signup from "../services/signup";
import Spinner from "../components/subcomponents/Spinner";
import toast from "react-hot-toast";
import Notification from "../components/subcomponents/Notification";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { user, error } = await signup(email, password);
      if (error) {
        console.log(error);
      } else {
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          <form className="mt-8 space-y-6">
            <div className="flex flex-row w-full ">
              <div className="flex items-center justify-center h-[52px] w-1/2 ">
                <button className="w-full flex items-center justify-center h-[52px] bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <FcGoogle className="text-2xl" />
                  <span className="ml-2 text-sm">Sign up with Google</span>
                </button>
              </div>
              <div className="flex items-center justify-start h-[52px] w-1/2 ml-4">
                <button className="flex w-full items-center justify-center h-[52px] bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <BsFacebook className="text-2xl text-[#1778f2]" />
                  <span className="ml-2">Sign up with Facebook</span>
                </button>
              </div>
            </div>

            <div className=" flex justify-center font-semibold">
              <h3>or</h3>
              <hr className="bg-blue-500" />
              <hr className="bg-blue-500" />
            </div>
            <div className="-space-y-px rounded-md shadow-sm">
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
                  onChange={(e) => setEmail(e.target.value)}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
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
                {loading ? <Spinner /> : "Sign Up"}
              </button>
              <div className="text-center mt-8">
                <p>
                  <span className=" text-base font-medium text-center text-gray-900">
                    Already have an account ?
                  </span>

                  <Link href="/Signin">
                    <span className="ml-2 text-base font-bold text-center text-slate-900 hover:text-blue-700">
                      Sign In
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
