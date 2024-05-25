import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navigation/Navbar";
import Footer from "../../components/Footer/Footer";
import { Context } from "../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { sponsors } from "../../helpers/helpers";

export default function Checkout() {
  const getData = useContext(Context);
  const [state, dispatch] = getData?.cartReducer;
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <div className="mx-auto w-11/12 relative min-h-screen">
        <div >
          <div className="relative flex flex-col xl:flex-row md:items-start md:justify-center flex-wrap py-44">
            {/* form section */}
            <div className="w-full xl:w-2/5 ml-10 md:ml-0 md:mt-4">
              <div className="flex flex-row rounded-md text-xl font-medium text-black ">
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
              <form className="mt-4 border-t border-l border-b border-r border-gray-200 w-full  p-8 bg-white rounded-xl ">
                <p className="text-gray-800 font-bold text-xl">
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
                <div>
                  <p className="pt-8 pb-2 text-gray-800 font-bold text-xl border-b border-gray-200">
                    Payment Method
                  </p>
                  <p className="text-md mt-4 font-semibold">Select a payment method</p>
                  <div className="pt-4">
                    <div className="flex items-center mb-4">
                      <input type="radio" value="" name="payment" id="radio-cash" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                      <label htmlFor="radio-cash" className="ms-2 text-sm font-medium text-gray-900 ">Cash on delivery</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" value="" name="payment" id="radio-online" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                      <label htmlFor="radio-online" className="ms-2 text-sm font-medium text-gray-900 ">Online payment</label>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="font-semibold">We Accept</p>
                    <div className="flex pt-2">
                      {sponsors.slice(0, 3).map((item, index) => (
                        <div key={index}>
                          <img src={`/assets/sponsors/${item}.png`} className='cursor-pointer h-8 w-12' />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="pt-8 pb-2 text-gray-800 font-bold text-xl border-b border-gray-200">
                    Delivery Method
                  </p>
                  <p className="text-md mt-4 font-semibold">Select a delivery method</p>
                  <div className="pt-4">
                    <div className="flex items-center mb-4">
                      <input type="radio" value="" name="delivery" id="radio-home" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                      <label htmlFor="radio-home" className="ms-2 text-sm font-medium text-gray-900 ">Home delivery</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" value="" name="delivery" id="radio-store" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                      <label htmlFor="radio-store" className="ms-2 text-sm font-medium text-gray-900 ">Store pickup</label>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-2">
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
                </div> */}
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

            <div className="border w-full xl:w-1/3  bg-white border-gray-200 h-[610px] rounded-xl xl:ml-24 ml-0 mt-16">
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
              <div className="px-8 border-b border-t border-gray-200 pt-8">
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
