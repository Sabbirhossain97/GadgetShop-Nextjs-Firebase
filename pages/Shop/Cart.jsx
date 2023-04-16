import React, { useContext, useReducer, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { Context } from "../../context";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";

export default function Cart() {
  const getData = useContext(Context);
  const [items, setItems] = getData?.cart;
  const [totalQauntity, setTotalQuantity] = getData?.cartTotal;
  const [subtotal, setSubtotal] = useState(null);
  const router = useRouter();
  const pathName= router.pathname
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
      <div className="min-h-screen bg-gray-100/50 p-20 ">
        <h1 className="mt-8 mb-10 text-center text-4xl font-bold">
          {items
            ? items.length === 0
              ? "Your Cart is Empty!"
              : "Shopping Cart"
            : ""}
        </h1>
        <div className="max-w-5xl mx-auto relative ">
          {items ? (
            items.length > 0 ? (
              <div className="flex flex-row rounded-md text-xl font-medium text-black ">
                <Link href="/">
                  <AiFillHome className="mt-0.5 text-slate-800 hover:text-blue-500 cursor-pointer" />
                </Link>
                <span className="text-gray-400">
                  &nbsp;{router?.pathname.slice(0, 1)}
                </span>{" "}
                <span className="text-lg hover:text-blue-500 cursor-pointer">
                  &nbsp;{router?.pathname.slice(1)}
                </span>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <div className="mt-4 relative mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-0 xl:px-0   ">
            <div className="relative md:w-4/5 overflow-y-auto max-h-[640px]  ">
              {items
                ? items.map((item, key) => (
                    <div
                      key={key}
                      className="bg-white  relative justify-between p-4 border-b md:grid md:grid-cols-4 md:grid-rows-none grid grid-cols-2 grid-rows-3   "
                    >
                      <div className=" md:col-span-1 col-span-2 ">
                        <img
                          src={item.image}
                          alt="product-image"
                          className="ml-8 rounded-lg w-24 h-32 border border-gray-200 p-2 object-fit"
                        />
                      </div>

                      <div className=" w-3/4 flex flex-col justify-center text-left md:col-span-2 col-span-2">
                        <h2 className="text-lg font-bold text-left text-gray-900">
                          {item.title}
                        </h2>
                        <h2>
                          <p className="text-lg mt-2">$ {item.price} </p>
                        </h2>
                        {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                      </div>
                      <div className="relative  flex flex-row items-center justify-between col-span-2 md:col-span-1 ">
                        <div className="flex items-center border-gray-100 w-1/2  absolute ">
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
                        <div
                          onClick={() =>
                            dispatch({ type: "REMOVE_PRODUCT", id: item.id })
                          }
                          className=" flex justify-center items-center absolute right-0  h-8 w-8"
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
                <div className="relative mt-6 bg-gray-200/50 border-r p-6  md:mt-0 md:w-1/3 h-[640px]">
                  <p className="text-gray-700 text-3xl font-semibold border-b border-gray-300 py-4">
                    Summary
                  </p>

                  <div className="mt-8 mb-2 flex justify-between ">
                    <p className="text-gray-700 font-semibold">Subtotal</p>
                    <p className="text-gray-700 font-semibold">
                      ${subtotal ? subtotal.toFixed(2) : ""}
                    </p>
                  </div>
                  <div className="py-6 flex justify-between border-b border-gray-300">
                    <p className="text-gray-700 font-semibold">Shipping</p>
                    <p className="text-gray-700 font-semibold">Free</p>
                  </div>
                  <div className="mt-8 flex justify-between">
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
                      <p className="text-sm text-gray-700 ml-4 font-semibold">
                        including VAT
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 font-semibold">Promo Code</div>
                  <input
                    type="text"
                    className="w-full mt-4 py-1.5 rounded-md focus:outline-none px-2"
                  />
                  <button className=" bottom-8 mt-12 w-full  mx-auto rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700">
                    <Link
                      href={{
                        pathname: "/Checkout",
                        query: { name: pathName },
                      }}
                    >
                      Checkout<span className="ml-2">&rarr;</span>
                    </Link>
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
      </div>
      <Footer />
    </div>
  );
}
