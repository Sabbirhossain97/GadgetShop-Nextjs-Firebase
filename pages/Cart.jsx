import React, { useContext, useReducer, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Context } from "../context";

export default function Cart() {
  const getData = useContext(Context);
  const [items, setItems] = getData?.cart;
  const [totalQauntity, setTotalQuantity] = getData?.cartTotal;
  const [subtotal, setSubtotal] = useState(null);

  const initialState = {
    items: items,
    total: totalQauntity,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT_QUANTITY":
        let incrementQuantity = state.items.map((currentElm) => {
          if (currentElm.id === action.id) {
            return { ...currentElm, quantity: currentElm.quantity + 1 };
          }
          return currentElm;
        });

        return {
          ...state,
          items: incrementQuantity,
        };
      case "DECREMENT_QUANTITY":
        let decrementQuantity = state.items.map((currentElm) => {
          if (currentElm.id === action.id) {
            if (currentElm.quantity > 1) {
              return { ...currentElm, quantity: currentElm.quantity - 1 };
            }
          }
          return currentElm;
        });
        return {
          ...state,
          items: decrementQuantity,
        };

      case "REMOVE_PRODUCT":
        let deleteProduct = state.items.filter((item) => {
          if (item.id !== action.id) {
            return item;
          }
        });
        return {
          items: deleteProduct,
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setItems(state.items);
  }, [state]);

  useEffect(() => {
    let totalValue = state.items.reduce(
      (acm, currentElm) => acm + currentElm.price * currentElm.quantity,
      0
    );
    setSubtotal(totalValue);
  }, [state]);
  useEffect(() => {
    setTotalQuantity(
      state.items.reduce((acm, currentElm) => acm + currentElm.quantity, 0)
    );
  }, [state]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-20 ">
        <h1 className="mt-20 mb-10 text-center text-2xl font-bold">
          {items
            ? items.length === 0
              ? "Your Cart is Empty!"
              : "Shopping Cart"
            : ""}
        </h1>
        <div className="mt-20 mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {items
              ? items.map((item, key) => (
                  <div
                    key={key}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={item.image}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-24 border border-gray-200 p-2"
                    />
                    <div className="relative sm:ml-4 sm:flex sm:w-full sm:justify-between flex items-center">
                      <div className="ml-4 text-left mt-12 sm:mt-0 w-1/2">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.title}
                        </h2>
                        <h2>
                          <p className="text-lg mt-2">$ {item.price} </p>
                        </h2>
                        {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                      </div>
                      <div className=" mt-8 absolute right-20 flex flex-row items-center sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            onClick={() =>
                              dispatch({
                                type: "DECREMENT_QUANTITY",
                                id: item.id,
                              })
                            }
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={item.quantity}
                            min="1"
                          />
                          <span
                            onClick={() =>
                              dispatch({
                                type: "INCREMENT_QUANTITY",
                                id: item.id,
                              })
                            }
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          dispatch({ type: "REMOVE_PRODUCT", id: item.id })
                        }
                        className="absolute right-4  "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          {items ? (
            items.length > 0 ? (
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">
                    ${subtotal ? subtotal.toFixed(2) : ""}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">Free</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold ml-10">
                      $
                      {items
                        .reduce(
                          (acm, currentElm) =>
                            acm + currentElm.price * currentElm.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-700 ml-4">including VAT</p>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                  <Link href="/Checkout">Check out</Link>
                </button>

                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                  <Link href="/">Continue Shopping</Link>
                </button>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
