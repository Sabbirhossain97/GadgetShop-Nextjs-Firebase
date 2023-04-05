import React from "react";

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
              <span class="bg-blue-500 text-white rounded-full p-3 mr-4">
                <i class="fas fa-shipping-fast"></i>
              </span>
              <h3 class="text-xl font-bold">Free Shipping</h3>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class="bg-blue-500 text-white rounded-full p-3 mr-4">
                <i class="fas fa-money-bill-wave"></i>
              </span>
              <h3 class="text-xl font-bold">Money-back Guarantee</h3>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class="bg-blue-500 text-white rounded-full p-3 mr-4">
                <i class="fas fa-headset"></i>
              </span>
              <h3 class="text-xl font-bold">24/7 Customer Support</h3>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class="bg-blue-500 text-white rounded-full p-3 mr-4">
                <i class="fas fa-tags"></i>
              </span>
              <h3 class="text-xl font-bold">Affordable Prices</h3>
            </div>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-8">
            <div class="flex items-center mb-4">
              <span class="bg-blue-500 text-white rounded-full p-3 mr-4">
                <i class="fas fa-gift"></i>
              </span>
              <h3 class="text-xl font-bold">Free Gift Wrapping</h3>
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
