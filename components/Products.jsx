import React, { useEffect, useReducer, useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { Context } from "../context";
import products from "../products.json";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const getData = useContext(Context);
  const [items, setItems] = getData?.cart;
  const [totalItems, setTotalItems] = getData?.cartTotal;
  const [isLoggedIn, setIsLoggedIn] = getData?.auth;
  const router = useRouter();
  const initialState = {
    items: [],
    total: totalItems,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        let addedProduct = products.filter((currentElm) => {
          if (currentElm.id === action.id) {
            return { currentElm };
          }
        });
        let [selectedProduct] = addedProduct;

        return {
          ...state,
          items: [...state.items, selectedProduct],
          total: setTotalItems(totalItems + 1),
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setItems(state.items);
  }, [state]);

  const handleCartAction = (id) => {
    if (!isLoggedIn) {
      router.push("/Signin");
    } else {
      dispatch({ type: "ADD_PRODUCT", id: id });
    }
  };

  return (
    <div class="container mx-auto w-1/2 py-12">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold"> Products</h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products
          ? products.map((item, key) => (
              <div
                key={key}
                className="p-6 group border rounded-lg shadow-md scale-98 hover:scale-100 hover:shadow-xl transition duration-300 flex flex-col items-center justify-center"
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
                  <button className="w-1/2 text-sm mt-4 border border-blue-500 text-blue-500 hover:bg-gray-100 py-2 px-1 hover:text-blue-700 font-semibold  rounded-lg">
                    <Link href={`/SingleProduct/${item.id}`}> Details</Link>
                  </button>
                  <button
                    onClick={() => handleCartAction(item.id)}
                    className="flex justify-center mt-4 ml-4 bg-blue-500 hover:bg-blue-700 px-2 w-1/3 text-white font-bold py-2   rounded-lg"
                  >
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
