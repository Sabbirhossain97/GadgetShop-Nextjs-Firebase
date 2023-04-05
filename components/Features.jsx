import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { AiFillGift } from "react-icons/ai";
import { IoMdPricetags } from "react-icons/io";

export default function Features() {
  return (
    <section class="bg-gray-100 py-16">
      <div class="container mx-auto w-1/2">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold">Our Features</h2>
          <p class="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class=" rounded-full  mr-4">
                <MdLocalShipping className="h-7 w-7 text-blue-500" />
              </span>
              <h3 class="text-md font-semibold">Free Shipping</h3>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class="rounded-full mr-4">
                <GiTakeMyMoney className="h-7 w-7 text-blue-500" />
              </span>
              <p class="text-md font-semibold">Money-back Guarantee</p>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class=" rounded-full  mr-4">
                <BiSupport className="h-7 w-7 text-blue-500" />
              </span>
              <h3 class="text-md font-semibold">24/7 Customer Support</h3>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class=" rounded-full mr-4">
                <IoMdPricetags className="h-7 w-7 text-blue-500" />
              </span>
              <h3 class="text-md font-semibold">Affordable Prices</h3>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class="rounded-full mr-4">
                <AiFillGift className="h-7 w-7 text-blue-500" />
              </span>
              <h3 class="text-md font-semibold">Free Gift Wrapping</h3>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
