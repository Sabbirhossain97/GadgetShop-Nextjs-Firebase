import React from "react";

export default function Cart() {
  return (
    <div class="bg-white shadow-md rounded-lg px-4 py-6">
      <h2 class="text-2xl font-bold mb-4">Your Cart</h2>

      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <img
              src="product-image.jpg"
              alt="Product Image"
              class="w-20 rounded-lg"
            />
            <div>
              <h3 class="font-bold text-lg">Product Name</h3>
              <p class="text-gray-700 text-base">Product Description</p>
              <p class="text-gray-500 text-sm">Quantity: 1</p>
            </div>
          </div>
          <p class="font-bold text-xl">$99.99</p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <img
              src="product-image.jpg"
              alt="Product Image"
              class="w-20 rounded-lg"
            />
            <div>
              <h3 class="font-bold text-lg">Product Name</h3>
              <p class="text-gray-700 text-base">Product Description</p>
              <p class="text-gray-500 text-sm">Quantity: 2</p>
            </div>
          </div>
          <p class="font-bold text-xl">$199.98</p>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <p class="text-lg font-bold">Total:</p>
        <p class="text-xl font-bold">$299.97</p>
      </div>

      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6">
        Checkout
      </button>
    </div>
  );
}
