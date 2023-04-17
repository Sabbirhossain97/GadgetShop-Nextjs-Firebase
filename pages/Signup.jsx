import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import users from "../users";
import secret from "../secret";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function Signup() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    let register = users.filter((currentElm) => {
      if (currentElm.phone === phone && currentElm.password === password) {
        let jwt = secret.filter((item) => {
          if (item.id === currentElm.id) {
            localStorage.setItem("token", item.key);
            return item;
          }
        });
        toast.success("Successfully registered!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/Signin");
        }, 2000);
        return currentElm;
      } else if (
        currentElm.phone !== phone &&
        currentElm.password !== password
      ) {
        toast.warn("You can only register with defined users!", {
          toastId: "warn1",
          position: "top-center",
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white w-full max-w-md space-y-8 border border-gray-100 p-8 rounded-xl shadow-xl ">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="placeholder:text-gray-300 text-base font-medium text-left text-slate-800  focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-3 rounded-md bg-white border border-gray-400"
                  placeholder="Phone"
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
                Sign Up
              </button>
              <ToastContainer theme="light" />
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
