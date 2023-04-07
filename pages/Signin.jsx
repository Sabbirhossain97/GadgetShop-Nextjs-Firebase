import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import users from "../users";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../context";
import secret from "../secret";

export default function Signin() {
  const getData = useContext(Context);
  const [avatar, setAvatar] = getData?.userAvatar;
  const [isLoggedIn, setIsLoggedIn] = getData?.auth;
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      setTimeout(() => {
        router.push("/Signup");
        setMessage("Please Sign up!");
      }, 2000);
    } else {
      let authUsers = users.filter((item) => {
        if (item.phone === phone && item.password === password) {
          localStorage.setItem("user", item.role);
          localStorage.setItem("avatar", item.avatar);
          Cookies.set("auth", "loggedIn");
          setTimeout(() => {
            router.push("/");
          }, 2000);
          setAvatar(localStorage.getItem("avatar"));
          setPhone("");
          setPassword("");
          setIsLoggedIn(true);
          setMessage("Successfully logged in!");
          return item;
        }
      });
    }
  };
  const logInNotify = () => toast(message);
  useEffect(() => {
    logInNotify();
  }, [message]);

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 border border-gray-100 p-8 rounded-xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6">
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
                  className="placeholder:text-gray-300 text-base font-medium text-left text-slate-800  focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-3 rounded-2xl bg-white border border-gray-400"
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
                  className="mt-4 placeholder:text-gray-300 text-base font-medium text-left text-slate-800  focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-3 rounded-2xl bg-white border border-gray-400"
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

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="w-full p-3 bg-blue-500 rounded-2xl hover:bg-blue-600 text-white"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign in
              </button>
              <ToastContainer theme="dark" />
              <div className="text-center mt-8">
                <p>
                  <span className=" text-base font-medium text-center text-gray-900">
                    Don't have an account yet?
                  </span>

                  <Link href="/Signup">
                    <span className="ml-2 text-base font-medium text-center text-[#377dff]">
                      Sign Up
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
