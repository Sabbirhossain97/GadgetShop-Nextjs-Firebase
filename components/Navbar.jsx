import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import { Context } from "../context";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/router";
import CartSideBar from "./CartSideBar";
import { getAuth, signOut } from "firebase/auth";
import firebaseAapp from "../services/firebase";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import products from "../products.json"

const auth = getAuth(firebaseAapp);

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function Navbar() {
  const getData = useContext(Context);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [state, dispatch] = getData?.cartReducer;
  const [cartTotalValue, setCartTotalValue] = getData?.cartTotal;
  const [user, setUser] = getData?.isAuth;
  const [isLoggedIn] = getData?.isAuth;
  const [isOpen, setIsOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [role, setRole] = useState("");
  const [browserWindow, setBrowserWindow] = useState(null);
  const [width, height] = useWindowSize();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState(null)
  const router = useRouter();
  // useEffect(() => {
  //   const getUser = localStorage.getItem("user");
  //   setRole(getUser);
  //   if (getUser) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);
  const handleSignOut = async () => {
    await signOut(auth);
    dispatch({ type: "CLEAR_ALL" });
    toast.success("Logged Out!", {
      position: "top-center",
    });
  };

  const handleSignIn = () => {
    if (!isLoggedIn) {
      router.push("/Signin");
    }
  };
  const goToCart = () => {
    if (width < 800) {
      setIsSideBarOpen(true);
    } else if (width > 800) {
      setIsSideBarOpen(false);
      router.push("/Shop/Cart");
      // if (!user) {
      //   router.push("/Signin");
      // } else {
      //   router.push("/Shop/Cart");
      // }
    }
  };

  useEffect(() => {
    const fetchedProducts = products.filter((val) => {
      if (searchQuery === "") {
        return [];
      } else if (
        val.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return val;
      }
    })
    setSearchedProducts(fetchedProducts)
  }, [searchQuery])

  const goToSingleProduct = (id) => {
    if (isLoggedIn) {
      router.push(`/SingleProduct/${id}`);
      setSearchQuery("")
    } else {
      router.push(`/Signin`);
      setSearchQuery("")
    }
  };

  return (
    <nav className="bg-slate-800 fixed right-0 left-0 top-0 z-10">
      <CartSideBar
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
      />

      <div className="mx-auto w-full md:w-10/12 px-2 sm:px-6 lg:px-8  ">
        <div className="relative flex h-[70px] items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
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
          <div className="flex flex-row flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
            <div className="flex space-x-4 items-center h-full">
              {/* <Link href="/">
                  <p
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Home
                  </p>
                
                <Link href="/Products">
                  <p className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    Products
                  </p>
                </Link> */}
              <Link href="/">
                <img src="/assets/logo.png" width="200px" height="100px" className="mb-4 " />
              </Link>
            </div>
            <div className="ml-12 w-4/6 flex items-center relative ">
              <input onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" className=" h-[40px] w-full rounded-md bg-gray-100 border border-gray-600 indent-10" />
              <IoSearch className="absolute left-4 text-gray-600" />
              {
                searchQuery && <div className="bg-gray-100 w-full pb-4 pl-2 pt-2 z-1000 absolute top-16 max-h-96 shadow-xl overflow-y-auto rounded-md">
                  <ul className="space-y-2">
                    {searchedProducts.length > 0 ? searchedProducts.map((product) => (
                      <li
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
                    )) : <li className=" hover:bg-gray-200 cursor-pointer">
                      <div className="flex space-x-2 text-center justify-center">
                        <h1 className="text-center">No products found!</h1>
                      </div>
                    </li>}

                  </ul>
                </div>
              }
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            <button
              type="button"
              onClick={goToCart}
              className="relative hover:bg-slate-900 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <AiOutlineShoppingCart className=" text-gray-100/50 text-3xl" />
              <span className="absolute top-0 right-1 text-xs text-white bg-blue-500 h-4 w-4  rounded-full">
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
                  {user ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <RxAvatar className="w-8 h-8 text-gray-100/50" />
                  )}
                </button>

                <div className="w-[30px]"></div>
              </div>

              {openDropDown && (
                <div
                  className={`absolute right-0 z-2 mt-2 transition-all origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${openDropDown ? "w-48" : "w-0"
                    }  ease-in-out duration-500`}
                >
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

                  {user ? (
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
          className={`sm:hidden transition-all${isOpen ? "h-24" : "h-0"
            } ease-in-out delay-300`}
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
            <Link href="/AllProducts">
              <p className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                Products
              </p>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}
