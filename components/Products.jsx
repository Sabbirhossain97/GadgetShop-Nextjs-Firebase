import React from "react";

export default function Products() {
  return (
    <div class="container mx-auto w-1/2 py-12">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold">Products</h2>
        <p class="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
        <div class="bg-white rounded-lg shadow-lg">
          <img
            class="w-full h-48 object-cover rounded-t-lg"
            src="https://via.placeholder.com/400x250"
            alt="Product Image"
          />
          <div class="px-4 py-4">
            <h3 class="text-gray-800 font-bold text-lg mb-2">Product Title</h3>
            <p class="text-gray-600 text-sm">Product Description goes here</p>
            <div class="mt-4">
              <p class="text-gray-800 font-bold text-lg">$49.99</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg">
          <img
            class="w-full h-48 object-cover rounded-t-lg"
            src="https://via.placeholder.com/400x250"
            alt="Product Image"
          />
          <div class="px-4 py-4">
            <h3 class="text-gray-800 font-bold text-lg mb-2">Product Title</h3>
            <p class="text-gray-600 text-sm">Product Description goes here</p>
            <div class="mt-4">
              <p class="text-gray-800 font-bold text-lg">$99.99</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg">
          <img
            class="w-full h-48 object-cover rounded-t-lg"
            src="https://via.placeholder.com/400x250"
            alt="Product Image"
          />
          <div class="px-4 py-4">
            <h3 class="text-gray-800 font-bold text-lg mb-2">Product Title</h3>
            <p class="text-gray-600 text-sm">Product Description goes here</p>
            <div class="mt-4">
              <p class="text-gray-800 font-bold text-lg">$149.99</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-lg">
          <img
            class="w-full h-48 object-cover rounded-t-lg"
            src="https://via.placeholder.com/400x250"
            alt="Product Image"
          />
          <div class="px-4 py-4">
            <h3 class="text-gray-800 font-bold text-lg mb-2">Product Title</h3>
            <p class="text-gray-600 text-sm">Product Description goes here</p>
            <div class="mt-4">
              <p class="text-gray-800 font-bold text-lg">$99.99</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-lg">
          <img
            class="w-full h-48 object-cover rounded-t-lg"
            src="https://via.placeholder.com/400x250"
            alt="Product Image"
          />
          <div class="px-4 py-4">
            <h3 class="text-gray-800 font-bold text-lg mb-2">Product Title</h3>
            <p class="text-gray-600 text-sm">Product Description goes here</p>
            <div class="mt-4">
              <p class="text-gray-800 font-bold text-lg">$99.99</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-lg">
          <img
            class="w-full h-48 object-cover rounded-t-lg"
            src="https://via.placeholder.com/400x250"
            alt="Product Image"
          />
          <div class="px-4 py-4">
            <h3 class="text-gray-800 font-bold text-lg mb-2">Product Title</h3>
            <p class="text-gray-600 text-sm">Product Description goes here</p>
            <div class="mt-4">
              <p class="text-gray-800 font-bold text-lg">$99.99</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
