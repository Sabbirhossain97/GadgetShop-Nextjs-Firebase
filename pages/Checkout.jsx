import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto ">
        <div className="min-h-screen grid grid-cols-2 mt-24  ">
          {/* form section */}
          <div className="w-3/4 leading-loose  ml-24 h-3/4">
            <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
              <p className="text-gray-800 font-medium">Customer information</p>
              <div className="">
                <label className="block text-sm text-gray-00" for="cus_name">
                  Name
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="cus_name"
                  name="cus_name"
                  type="text"
                  required=""
                  placeholder="Your Name"
                  aria-label="Name"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" for="cus_email">
                  Email
                </label>
                <input
                  className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                  id="cus_email"
                  name="cus_email"
                  type="text"
                  required=""
                  placeholder="Your Email"
                  aria-label="Email"
                />
              </div>
              <div className="mt-2">
                <label className=" block text-sm text-gray-600" for="cus_email">
                  Address
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                  id="cus_email"
                  name="cus_email"
                  type="text"
                  required=""
                  placeholder="Street"
                  aria-label="Email"
                />
              </div>
              <div className="mt-2">
                <label
                  className="hidden text-sm  text-gray-600"
                  for="cus_email"
                >
                  City
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                  id="cus_email"
                  name="cus_email"
                  type="text"
                  required=""
                  placeholder="City"
                  aria-label="Email"
                />
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="hidden  text-sm text-gray-600"
                  for="cus_email"
                >
                  Country
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                  id="cus_email"
                  name="cus_email"
                  type="text"
                  required=""
                  placeholder="Country"
                  aria-label="Email"
                />
              </div>
              <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                <label
                  className="hidden  text-sm text-gray-600"
                  for="cus_email"
                >
                  Zip
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                  id="cus_email"
                  name="cus_email"
                  type="text"
                  required=""
                  placeholder="Zip"
                  aria-label="Email"
                />
              </div>
              <p className="mt-4 text-gray-800 font-medium">
                Payment information
              </p>
              <div className="">
                <label className="block text-sm text-gray-600" for="cus_name">
                  Card
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                  id="cus_name"
                  name="cus_name"
                  type="text"
                  required=""
                  placeholder="Card Number MM/YY CVC"
                  aria-label="Name"
                />
              </div>
              <div className="mt-4">
                <button
                  className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                  type="submit"
                >
                  $3.00
                </button>
              </div>
            </form>
          </div>

          {/*order summary section */}

          <div className="w-2/3 bg-white lg:block hidden h-2/3">
            <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
              Order Summary
            </h1>
            <ul className="py-6 border-b space-y-6 px-8">
              <li className="grid grid-cols-6 gap-2 border-b-1">
                <div className="col-span-1 self-center">
                  <img
                    src="https://bit.ly/3oW8yej"
                    alt="Product"
                    className="rounded w-full"
                  />
                </div>
                <div className="flex flex-col col-span-3 pt-2">
                  <span className="text-gray-600 text-md font-semi-bold">
                    Studio 2 Headphone
                  </span>
                  <span className="text-gray-400 text-sm inline-block pt-2">
                    Red Headphone
                  </span>
                </div>
                <div className="col-span-2 pt-3">
                  <div className="flex items-center space-x-2 text-sm justify-between">
                    <span className="text-gray-400">2 x €30.99</span>
                    <span className=" font-semibold inline-block">
                      €61.98
                    </span>
                  </div>
                </div>
              </li>
              <li className="grid grid-cols-6 gap-2 border-b-1">
                <div className="col-span-1 self-center">
                  <img
                    src="https://bit.ly/3lCyoSx"
                    alt="Product"
                    className="rounded w-full"
                  />
                </div>
                <div className="flex flex-col col-span-3 pt-2">
                  <span className="text-gray-600 text-md font-semi-bold">
                    Apple iPhone 13
                  </span>
                  <span className="text-gray-400 text-sm inline-block pt-2">
                    Phone
                  </span>
                </div>
                <div className="col-span-2 pt-3">
                  <div className="flex items-center space-x-2 text-sm justify-between">
                    <span className="text-gray-400">1 x €785</span>
                    <span className=" font-semibold inline-block">
                      €785
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <div className="px-8 border-b">
              <div className="flex justify-between py-4 text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold ">€846.98</span>
              </div>
              <div className="flex justify-between py-4 text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold ">Free</span>
              </div>
            </div>
            <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
              <span>Total</span>
              <span>€846.98</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
