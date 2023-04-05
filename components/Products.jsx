import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

export default function Products() {

  const [lists, setLists] = useState(null);

  const getApidata = async () => {
    try {
      const response = await axios
        .get(`https://fakestoreapi.com/products`)
        .catch((err) => console.log(err));
      setLists(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApidata();
  }, []);
  return (
    <div class="container mx-auto w-1/2 py-12">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold">Products</h2>
        <p class="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {lists
          ? lists.map((item, key) => (
              <div
                key={key}
                className="p-6 group border rounded-lg shadow-md scale-95 hover:scale-100 hover:shadow-xl transition duration-300 flex flex-col items-center justify-center"
              >
                <div className=" aspect-w-1 aspect-h-1 w-1/2 h-1/2  overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={item.image}
                    alt="error"
                    className="h-full w-full object-contain object-center group-hover:opacity-75"
                  />
                </div>
                <hr className="mt-4 bg-gray-300 w-full"></hr>
                <h3 className="mt-4 text-sm text-gray-700 text-center">
                  {item.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${item.price}
                </p>
                <div className="flex flex-row justify-center w-full">
                  {" "}
                  <button className="w-1/2 text-sm mt-4 border border-blue-500 text-blue-500 hover:bg-gray-100 py-2 px-1 hover:text-blue-700 font-semibold  rounded-lg">
                    <Link href={`/SingleProduct/${item.id}`}> Details</Link>
                  </button>
                  <button className="flex justify-center mt-4 ml-4 bg-blue-500 hover:bg-blue-700 px-2 w-1/3 text-white font-bold py-2   rounded-lg">
                    <AiOutlineShoppingCart className="mt-0.5" />
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
