import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Signup() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 border border-gray-100 p-8 rounded-xl shadow-xl ">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="email-address" className="sr-only">
                  Phone
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="placeholder:text-gray-300 text-base font-medium text-left text-slate-800  focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-3 rounded-2xl bg-white border border-gray-400"
                  placeholder="Phone"
                />
              </div>
              <div className="mt-4">
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
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
                  for="remember-me"
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
                className="w-full p-3 bg-blue-500 rounded-2xl hover:bg-blue-600 text-white"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign Up
              </button>
              <div className="text-center mt-8">
                <p>
                  <span className=" text-base font-medium text-center text-gray-900">
                    Already have an account ?
                  </span>

                  <Link href="/Signin">
                    <span className="ml-2 text-base font-medium text-center text-[#377dff]">
                      Sign In
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
