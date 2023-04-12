import React, { useContext, useReducer, useEffect, useState } from "react";
import { Context } from "../context";
import { MdDelete } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import Link from "next/link";

export default function CartSideBar({ setOpenSideBar, openSideBar }) {
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
  console.log(items);
  return (
    <div className="relative z-10 ">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-200 ease-in-out"></div>

      <div className="fixed inset-0 overflow-hidden ease-in-out duration-300 translate-x-0">
        <div className="absolute inset-0 overflow-hidden translate-x-0">
          <div
            className={` fixed inset-y-0 right-0 flex transition pl-10 ease-in-out duration-300 
            `}
          >
            <div className="pointer-events-auto w-screen max-w-md">
              <div
                className={`flex h-full flex-col bg-white shadow-xl ease-in-out duration-300 `}
              >
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
                  <div className="flex items-start justify-between border-b p-2 border-gray-200">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpenSideBar(false)}
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="red"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 relative ">
                    <div className="flow-root ">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200 overflow-y-auto"
                      >
                        {items
                          ? items.map((item) => (
                              <li className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.image}
                                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                    className="h-full w-full object-fit "
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p>{item.title}</p>
                                      </h3>
                                      <p className="ml-4">
                                        $ {item.quantity} x $
                                        {item.price.toFixed(2)}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Price: ${item.price}
                                    </p>
                                  </div>
                                  <div className="mt-4 flex flex-1 items-end justify-between text-sm">
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
                                        &minus;
                                      </span>
                                      <input
                                        className="h-7 w-8 border bg-white text-center text-xs outline-none"
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
                                        &#43;
                                      </span>
                                    </div>
                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                          dispatch({
                                            type: "REMOVE_PRODUCT",
                                            id: item.id,
                                          })
                                        }
                                      >
                                        <MdDelete className="cursor-pointer hover:bg-gray-100 rounded-md text-2xl text-red-500" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          : ""}
                      </ul>
                    </div>

                    {state.items.length === 0 ? (
                      <div className="absolute top-[200px] left-1/3">
                        <BsCartX className=" text-9xl" />
                        <p className="text-xl mt-6 ml-2">Cart is Empty!</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  {state.items.length === 0 ? (
                    ""
                  ) : (
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal ? subtotal.toFixed(2) : ""}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link href="/Checkout">
                          <p className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                            <span className="ml-2 text-lg"> &rarr;</span>
                          </p>
                        </Link>
                      </div>
                    </div>
                  )}
                  <Link href="/">
                    <p className="mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      <span className=" text-lg"> &larr;</span>
                      <span className="ml-2">Continue Shopping </span>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
