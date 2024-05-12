import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navigation/Navbar";
import Footer from "../../components/Footer/Footer";
import { Context } from "../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";

export default function Checkout() {
  const getData = useContext(Context);
  const [state, dispatch] = getData?.cartReducer;
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <div className="mx-auto w-11/12 relative ">
        <div className=" ">
          <div className=" relative md:flex md:flex-row md:items-center md:justify-center flex flex-col min-h-screen mt-16 flex-wrap ">
            {/* form section */}
            <div className=" absolute top-20 left-10 md:top-24 md:left-48 flex flex-row rounded-md text-xl font-medium text-black ">
              <Link href="/">
                <AiFillHome className="mt-0.5 text-slate-800 hover:text-blue-500 cursor-pointer" />
              </Link>
              <span className="text-gray-400">
                &nbsp;{router?.pathname.slice(0, 1)}
              </span>
              <Link href="/Shop/Cart">
                <span className="text-slate-900 hover:text-blue-600">
                  &nbsp;Cart
                </span>
              </Link>
              <span>
                <span className="text-gray-400">
                  &nbsp;{router?.pathname.slice(0, 1)}
                </span>
                &nbsp;
                <span className="text-slate-900">Checkout</span>
              </span>
            </div>
            <div className=" md:w-2/5 w-10/12 ml-10 md:ml-0 md:mt-4 mt-32">
              <form className=" border-t border-l border-b border-r border-gray-200 w-full  p-8 bg-white rounded-xl ">
                <p className="text-gray-800 font-medium text-xl">
                  Customer information
                </p>
                <div className="mt-4">
                  <label
                    className="font-semibold block text-sm text-gray-00"
                    htmlFor="cus_name"
                  >
                    Name
                  </label>
                  <input
                    className="placeholder:text-sm mt-2 w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
                    id="cus_name"
                    name="name"
                    type="text"
                    required=""
                    placeholder="Your Name"
                    aria-label="Name"
                  />
                </div>
                <div className="mt-6">
                  <label
                    className="font-semibold block text-sm text-gray-600"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="placeholder:text-sm mt-2 w-full px-3  py-1 text-gray-700 bg-gray-200 rounded"
                    id="cus_email"
                    name="email"
                    type="text"
                    required=""
                    placeholder="Your Email"
                    aria-label="Email"
                  />
                </div>
                <div className="mt-6">
                  <label className="font-semibold  block text-sm text-gray-600">
                    Address
                  </label>
                  <input
                    className="placeholder:text-sm mt-2 w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required
                    placeholder="Street"
                  />
                </div>
                <div className="mt-4">
                  <input
                    className="placeholder:text-sm w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required=""
                    placeholder="City"
                  />
                </div>
                <div className="inline-block mt-4 w-1/2 pr-1">
                  <input
                    className="placeholder:text-sm w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required
                    placeholder="Country"
                  />
                </div>
                <div className="inline-block mt-2 -mx-0.5 pl-1 w-1/2">
                  <input
                    className="placeholder:text-sm w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required=""
                    placeholder="Zip"
                  />
                </div>
                <p className="mt-8 text-gray-800 font-medium text-xl">
                  Payment information
                </p>
                <div className="mt-2">
                  <label
                    className="font-semibold block text-sm text-gray-600"
                    htmlFor="cus_name"
                  >
                    Card
                  </label>
                  <input
                    className="placeholder:text-sm mt-2 w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required=""
                    placeholder="Card Number MM/YY CVC"
                  />
                </div>
                <div className="mt-8">
                  <button
                    className="text-sm font-semibold px-4 py-2 text-white  bg-slate-800 hover:bg-slate-700 rounded-md"
                    type="submit"
                  >
                    Confirm Payment
                  </button>
                  <Link href="/">
                    <button
                      className="text-sm ml-4 font-semibold px-4 py-2 text-white  bg-slate-800 hover:bg-slate-700 rounded-md"
                      type="submit"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>

            {/*order summary section */}

            <div className="border md:w-1/3 w-10/12 bg-white  border-gray-200  md:mt-10 mt-8 mb-20 h-[610px] rounded-xl md:ml-24 ml-10 ">
              <h1 className="py-4 border-b-2 text-xl text-gray-600 px-10 ">
                Order Summary
              </h1>
              <div className="h-[340px] overflow-y-auto">
                <ul className=" py-16  space-y-6 px-8  ">
                  {state.items
                    ? state.items.map((item, key) => (
                      <li
                        key={key}
                        className="grid grid-cols-6 gap-2 border-b-1"
                      >
                        <div className="col-span-1 ">
                          <img
                            src={item.image}
                            alt="Product"
                            className="rounded w-full   "
                          />
                        </div>
                        <div className="flex flex-col col-span-3 pt-2 ml-4">
                          <span className="text-gray-600 text-md font-semi-bold">
                            {item.title}
                          </span>
                          <span className="text-gray-400 text-sm inline-block pt-2">
                            {item.category}
                          </span>
                        </div>
                        <div className="col-span-2 pt-3">
                          <div className="flex items-center space-x-2 text-sm justify-between">
                            <span className="text-gray-400">
                              {item.quantity} x ${item.price}
                            </span>
                            <span className=" font-semibold inline-block">
                              ${(item.quantity * item.price)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                    : ""}
                </ul>
              </div>
              <div className="px-8 border-b border-t border-gray-200 mt-8">
                <div className="flex justify-between py-4 text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold ">
                    $
                    {state.items
                      ? state.items
                        .reduce(
                          (acm, currentElm) =>
                            acm + currentElm.price * currentElm.quantity,
                          0
                        )

                      : ""}
                  </span>
                </div>
                <div className="flex justify-between py-4 text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold ">Free</span>
                </div>
              </div>
              <div className="font-semibold text-xl px-8 flex justify-between py-4 text-gray-600">
                <span>Total</span>
                <span>
                  $
                  {state.items
                    ? state.items
                      .reduce(
                        (acm, currentElm) =>
                          acm + currentElm.price * currentElm.quantity,
                        0
                      )

                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
