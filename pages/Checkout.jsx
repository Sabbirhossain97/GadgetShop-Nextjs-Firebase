import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Context } from "../context";
import Link from "next/link";
export default function Checkout() {
  const getData = useContext(Context);
  const [items, setItems] = getData?.cart;

  return (
    <div>
      <Navbar />
      <div className="mx-auto w-11/12 relative ">
        <div className=" ">
          <div className=" md:flex md:flex-row md:items-center md:justify-center flex flex-col min-h-screen mt-8  ">
            {/* form section */}

            <div className=" w-2/5 mt-4">
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
                    className="mt-2 w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    id="cus_name"
                    name="cus_name"
                    type="text"
                    required=""
                    placeholder="Your Name"
                    aria-label="Name"
                  />
                </div>
                <div className="mt-6">
                  <label
                    className="font-semibold block text-sm text-gray-600"
                    htmlFor="cus_email"
                  >
                    Email
                  </label>
                  <input
                    className="mt-2 w-full px-5  py-1 text-gray-700 bg-gray-200 rounded"
                    id="cus_email"
                    name="cus_email"
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
                    className="mt-2 w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required
                    placeholder="Street"
                  />
                </div>
                <div className="mt-4">
                  <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required=""
                    placeholder="City"
                  />
                </div>
                <div className="inline-block mt-4 w-1/2 pr-1">
                  <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required
                    placeholder="Country"
                  />
                </div>
                <div className="inline-block mt-2 -mx-0.5 pl-1 w-1/2">
                  <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
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
                    className="mt-2 w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    required=""
                    placeholder="Card Number MM/YY CVC"
                  />
                </div>
                <div className="mt-8">
                  <button
                    className="font-semibold px-4 py-2 text-white  bg-blue-500 hover:bg-blue-600 rounded"
                    type="submit"
                  >
                    Confirm Payment
                  </button>
                  <Link href="/">
                    <button
                      className="ml-4 font-semibold px-4 py-2 text-white  bg-blue-500 hover:bg-blue-600 rounded"
                      type="submit"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>

            {/*order summary section */}

            <div className="border w-1/3 bg-white  border-gray-200 lg:block mb-20 h-3/4 rounded-xl ml-24">
              <h1 className="py-8 border-b-2 text-xl text-gray-600 px-10 ">
                Order Summary
              </h1>
              <ul className="py-16 border-b space-y-6 px-8">
                {items
                  ? items.map((item, key) => (
                      <li
                        key={key}
                        className="grid grid-cols-6 gap-2 border-b-1"
                      >
                        <div className="col-span-1 self-center">
                          <img
                            src={item.image}
                            alt="Product"
                            className="rounded w-full"
                          />
                        </div>
                        <div className="flex flex-col col-span-3 pt-2">
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
                              {item.quantity} x ${item.price.toFixed(2)}
                            </span>
                            <span className=" font-semibold inline-block">
                              ${(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                  : ""}
              </ul>
              <div className="px-8 border-b">
                <div className="flex justify-between py-4 text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold ">
                    $
                    {items ? (items.reduce(
                      (acm, currentElm) =>
                        acm + currentElm.price * currentElm.quantity,
                      0
                    )).toFixed(2) :''}
                  </span>
                </div>
                <div className="flex justify-between py-4 text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold ">Free</span>
                </div>
              </div>
              <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                <span>Total</span>
                <span>
                  $
                  {items? (items.reduce(
                    (acm, currentElm) =>
                      acm + currentElm.price * currentElm.quantity,
                    0
                  )).toFixed(2): ''}
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
