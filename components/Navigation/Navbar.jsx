import React, { useContext, useState, useEffect, useCallback } from "react";
import { Context } from "../../context";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/router";
import CartSideBar from "./CartSideBar";
import { getAuth, signOut } from "firebase/auth";
import firebaseAapp from "../../services/firebase";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import products from "../../products.json"
import { Flash, SearchLoader, SearchLoaderMb } from "../SvgComponents/SVG";
import { useWindowSize } from "../hooks/useWindowSize";
import { Input } from 'antd';

const { Search } = Input;

const auth = getAuth(firebaseAapp);

export default function Navbar() {
  const getData = useContext(Context);
  const [, dispatch] = getData?.cartReducer;
  const [cartTotalValue] = getData?.cartTotal;
  const [user] = getData?.isAuth;
  const [isLoggedIn] = getData?.isAuth;
  const [, setIsOpen] = getData?.sidebar;
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [width] = useWindowSize();
  const [isSearched, setIsSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState(null)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch({ type: "CLEAR_ALL" });
    toast.success("Logged Out!", {
      position: "top-center",
    });
  };

  const handleRegister = () => {
    if (!isLoggedIn) {
      router.push("/Signup");
    }
  };

  const handleSignIn = () => {
    if (!isLoggedIn) {
      router.push("/Signin");
    }
  };

  const handleSpecialDeals = () => {
    router.push('/SpecialDeals')
  }

  const goToCart = () => {
    if (width < 800) {
      setIsSideBarOpen(true);
    } else if (width > 800) {
      setIsSideBarOpen(false);
      router.push("/Shop/Cart");
    }
  };

  useEffect(() => {
    setIsSearched(true);
    const timeoutId = setTimeout(() => {
      const fetchedProducts = products.filter((val) => {
        if (searchQuery === "") {
          return [];
        } else if (val.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return val;
        }
      });
      setSearchedProducts(fetchedProducts);
      setIsSearched(false);
    }, 1500);

    return () => clearTimeout(timeoutId);


  }, [searchQuery])

  const goToSingleProduct = useCallback((id) => {
    if (isLoggedIn) {
      setTimeout(() => {
        setSearchQuery("")
        setShowSearchBar(false)
        router.push(`/SingleProduct/${id}`);
      }, 1500)
    } else {
      router.push(`/Signin`);
      setSearchQuery("")
    }
  }, []);

  useEffect(() => {
    if (width > 640) {
      setShowSearchBar(false)
    }
  }, [width])

  return (
    <nav className="bg-slate-800 fixed right-0 left-0 top-0 z-20">
      <CartSideBar
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
      />

      <div className="mx-auto w-full md:w-full lg:w-full xl:w-11/12 px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-[70px] items-center justify-between">
          <div className="flex flex-row flex-1 items-center gap-0  justify-center sm:items-stretch sm:justify-start ">
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="inline-flex transition duration-300 items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg
                  className="block h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                 
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className="w-10/12 sm:w-[350px] h-20 flex items-center justify-start">
              <Link href="/">
                <img src="/assets/logo.png" className="mb-4 w-full h-20" />
              </Link>
            </div>
            <div className="hidden ml-2 xl:ml-4 w-11/12 sm:flex items-center relative">
              <input onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" className=" h-[40px] w-full rounded-md bg-gray-100 indent-10" />
              <IoSearch className="absolute left-4 text-gray-600" />
              {isSearched ? <SearchLoader /> : "  "}
              {
                searchQuery && <div className="bg-white w-full pb-4 pl-2 pt-2 z-1000 absolute top-16 max-h-96 shadow-xl overflow-y-auto rounded-md">
                  <ul className="space-y-2">
                    {
                      searchedProducts && searchedProducts.length > 0 ? searchedProducts.map((product, index) => (
                        <li
                          key={index}
                          onClick={() => goToSingleProduct(product.id)}
                          className=" hover:bg-gray-200 cursor-pointer transition duration-300 hover:opacity-75">
                          <div className="flex space-x-2">
                            <img className="h-24 w-24" src={product.image} />
                            <div className=" w-full flex flex-col space-y-2 justify-center">
                              <p>{product.title}</p>
                              <p>${product.price}</p>
                            </div>
                          </div>
                        </li>
                      )) : <li className=" hover:bg-gray-200 cursor-pointer">
                        <div className="flex space-x-2 text-center justify-center">
                          <h1 className="text-center">No products found!</h1>
                        </div>
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>

            {/* search bar for small screen */}
            <div className="flex sm:hidden relative w-1/6 h-full px-4 py-8 justify-end">
              <IoSearch onClick={() => setShowSearchBar(true)} className="text-white w-6 h-6 cursor-pointer hover:text-gray-400 transition duration-300" />
            </div>
            {showSearchBar && width < 640 ?
              <div
                onClick={() => {
                  setShowSearchBar(false);
                  setSearchQuery("")
                }
                }
                className="block fixed sm:hidden top-0 bottom-0 left-0 right-0 z-30 inset-0 bg-gray-500 bg-opacity-25 transition-opacity duration-500 ease-in-out backdrop-blur-sm"
              >
                <div
                  onClick={(e) => e.stopPropagation()} className="p-4 relative">
                  <input onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for products..." className="h-[40px] w-full rounded-md bg-gray-100 border border-gray-600 indent-10" />
                  <IoSearch className="absolute top-7 left-7" />
                  {isSearched ? <SearchLoaderMb /> : ""}

                  {
                    searchQuery && <div className="bg-white mx-auto p-4 z-1000 left-4 right-4 absolute top-16 max-h-96 shadow-xl overflow-y-auto rounded-md">
                      <ul className="space-y-2">
                        {
                          searchedProducts.length > 0 && searchedProducts.map((product, index) => (
                            <li
                              key={index}
                              onClick={() => goToSingleProduct(product.id)}
                              className=" hover:bg-gray-200 cursor-pointer">
                              <div className="flex space-x-2">
                                <img className="h-24 w-24" src={product.image} />
                                <div className=" w-full flex flex-col space-y-2 justify-center">
                                  <p>{product.title}</p>
                                  <p>${product.price}</p>
                                </div>
                              </div>
                            </li>

                          ))}
                        {searchedProducts.length === 0 && <li >
                          <div className="flex space-x-2 text-center justify-center">
                            <h1 className="text-center">No products found!</h1>
                          </div>
                        </li>}
                      </ul>
                    </div>
                  }
                </div>
              </div> : ""}
          </div>

          <div className="hidden xl:flex xl:w-[400px] items-center justify-end gap-8 sm:static sm:inset-auto sm:pr-0 ">
            <div className="flex items-center">
              <Flash />
              <div onClick={handleSpecialDeals} className="hover:opacity-75 cursor-pointer hover:text-blue-500">
                <p className="flex text-sm text-white">Offers</p>
                <p className=" text-[12px] text-gray-400 whitespace-nowrap">Special Deals</p>
              </div>
            </div>
            <div className="block relative right-0 ">
              <div >
                {user ? (
                  <div className="flex items-center gap-2">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                    <div className="flex flex-col text-white">
                      <p className="text-sm font-bold whitespace-nowrap">{user.displayName}</p>
                      <p className="text-[12px] font-norma text-gray-400"><span className="cursor-pointer hover:text-blue-500">Profile</span> or <span onClick={handleSignOut} className="cursor-pointer hover:text-blue-500">Logout</span></p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RxAvatar className="w-8 h-8 text-gray-100/50" />
                    <div className="flex flex-col text-white">
                      <p className="text-sm font-bold">Account</p>
                      <p className="text-[12px] text-gray-400"><span onClick={handleRegister} className="cursor-pointer hover:text-blue-500 transition duration-300">Register</span> or <span onClick={handleSignIn} className="cursor-pointer hover:text-blue-500 transition duration-300">Login</span></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={goToCart}
                className="relative hover:bg-slate-900 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <AiOutlineShoppingCart className=" text-gray-100/50 text-3xl " />
                <span className="absolute top-0 right-1 text-xs text-white bg-blue-500 h-4 w-4  rounded-full">
                  {cartTotalValue}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* for mobile screen */}
      <div className="py-2 block xl:hidden fixed z-10 bottom-0 left-0 right-0 bg-slate-800 shadow-md border-t border-slate-700">
        <ul className="text-white flex justify-around items-center">
          <li className="h-full">
            <div className="flex">
              <Flash />
              <div onClick={handleSpecialDeals} className="hover:opacity-75 cursor-pointer hover:text-blue-500">
                <p className="flex text-sm text-white">Offers</p>
                <p className=" text-[12px] text-gray-400 whitespace-nowrap">Special Deals</p>
              </div>
            </div>
          </li>
          <li>
            <div className="block relative right-0 ">
              <div >
                {user ? (
                  <div className="flex items-center gap-2">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                    <div className="flex flex-col text-white">
                      <p className="text-sm font-bold whitespace-nowrap">{user.displayName}</p>
                      <p className="text-[12px] font-norma text-gray-400"><span className="cursor-pointer hover:text-blue-500">Profile</span> or <span onClick={handleSignOut} className="cursor-pointer hover:text-blue-500">Logout</span></p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RxAvatar className="w-8 h-8 text-gray-100/50" />
                    <div className="flex flex-col text-white">
                      <p className="text-sm font-bold">Account</p>
                      <p className="text-[12px] text-gray-400"><span onClick={handleRegister} className="cursor-pointer hover:text-blue-500 transition duration-300">Register</span> or <span onClick={handleSignIn} className="cursor-pointer hover:text-blue-500 transition duration-300">Login</span></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
          <li>
            <div>
              <button
                type="button"
                onClick={goToCart}
                className="relative hover:bg-slate-900 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <AiOutlineShoppingCart className=" text-gray-100/50 text-3xl " />
                <span className="absolute top-0 right-1 text-xs text-white bg-blue-500 h-4 w-4  rounded-full">
                  {cartTotalValue}
                </span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
