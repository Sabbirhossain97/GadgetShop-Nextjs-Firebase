import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cookies from "js-cookie";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartSideBar from "./CartSideBar";

export default function Navbar() {
  const getData = useContext(Context);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [items, setItems] = getData?.cart;
  const [isLoggedIn, setIsLoggedIn] = getData?.auth;
  const [avatar, setAvatar] = getData?.userAvatar;
  const [cartTotalValue, setCartTotalValue] = getData?.cartTotal;
  const [isOpen, setIsOpen] = useState(false);
  const [showSideCart, setShowSideCart] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    setRole(getUser);
    if (getUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    localStorage.removeItem("token");
    Cookies.remove("auth");
    setItems(null);
    setIsLoggedIn(false);
    setAvatar(null);
    toast.success("You have been logged out!", {
      position: "top-center",
      autoClose: 3000,
    });
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const handleSignIn = () => {
    if (!isLoggedIn) {
      router.push("/Signin");
    }
  };
  const goToCart = () => {
    if (window.innerWidth < 800) {
      setShowSideCart(true);
    } else if (window.innerWidth > 800) {
      setShowSideCart(false);
      if (!isLoggedIn) {
        router.push("/Signin");
      } else {
        router.push("/Shop/Cart");
      }
    }
  };

  return (
    <nav className="bg-slate-800 fixed right-0 left-0 top-0 z-10">
      <ToastContainer theme="light" />
      {showSideCart ? (
        <CartSideBar
          setShowSideCart={setShowSideCart}
          showSideCart={showSideCart}
          setOpenSideBar={setOpenSideBar}
          openSideBar={openSideBar}
        />
      ) : (
        ""
      )}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <svg
                  className=" h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className=" flex flex-row flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className=" hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/">
                  <p
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Home
                  </p>
                </Link>

                {isLoggedIn ? (
                  <p
                    onClick={goToCart}
                    className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Cart
                  </p>
                ) : (
                  <Link href="/Signin">
                    <p className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                      Cart
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* cart */}

            <button
              type="button"
              onClick={goToCart}
              className="relative hover:bg-slate-900 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <AiOutlineShoppingCart className=" text-gray-100/50 text-3xl" />
              <span className="absolute top-0 right-1 text-xs text-white bg-blue-500 h-4 w-4   rounded-full">
                {cartTotalValue}
              </span>
            </button>

            <div className=" relative ml-10 right-0 ">
              <div className="">
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setOpenDropDown(!openDropDown)}
                >
                  <span className="sr-only">Open user menu</span>
                  {isLoggedIn ? (
                    <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
                  ) : (
                    <RxAvatar className="w-8 h-8 text-gray-100/50" />
                  )}
                </button>

                <div className="w-[30px]"></div>
              </div>

              {openDropDown && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link href="/">
                    <p
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Home
                    </p>
                  </Link>

                  {role === "admin" ? (
                    <Link href="#">
                      <p className="block px-4 py-2 text-sm text-black">
                        Dashboard
                      </p>
                    </Link>
                  ) : (
                    ""
                  )}

                  {isLoggedIn ? (
                    <p
                      onClick={handleSignOut}
                      className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign Out
                    </p>
                  ) : (
                    <p
                      onClick={handleSignIn}
                      className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                    >
                      Sign In
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div
          className="sm:hidden transition-all ease-in-out delay-300"
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link href="/">
              <p
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
              >
                Home
              </p>
            </Link>

            {isLoggedIn ? (
              <p
                onClick={goToCart}
                className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Cart
              </p>
            ) : (
              <Link href="/Signin">
                <p className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Cart
                </p>
              </Link>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}
