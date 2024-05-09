import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { Context } from "../../context";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import EmptyCart from "../../components/EmptyCart";
import Subnavbar from "../../components/Subnavbar";

export default function Cart() {
  const getData = useContext(Context);
  const [totalQauntity, setTotalQuantity] = getData?.cartTotal;
  const [state, dispatch] = getData?.cartReducer;
  const [subtotal, setSubtotal] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let totalValue = state.items.reduce(
      (acm, currentElm) => acm + currentElm.price * currentElm.quantity,
      0
    );
    setSubtotal(totalValue);
    setTotalQuantity(
      state.items.reduce((acm, currentElm) => acm + currentElm.quantity, 0)
    );
  }, [state]);
  return (
    <div>
      <Navbar />
      <Subnavbar/>
      <div className="min-h-screen bg-gray-100/50 py-40 px-10 md:px-20 lg:px-0 ">
        {state.items ? (
          state.items.length === 0 ? (
            <div>
              {" "}
              <EmptyCart />{" "}
            </div>
          ) : (
            <h1 className="mt-4 mb-10 text-center text-4xl font-bold">
              Shopping Cart{" "}
            </h1>
          )
        ) : (
          ""
        )}

        <div className="max-w-5xl mx-auto relative ">
          {state.items ? (
            state.items.length > 0 ? (
              <div className="flex flex-row rounded-md text-xl font-medium text-black ">
                <Link href="/">
                  <AiFillHome className="mt-0.5 text-slate-800 hover:text-blue-500 cursor-pointer" />
                </Link>
                <span className="text-gray-400">
                  &nbsp;{router?.pathname.slice(0, 1)}
                </span>{" "}
                <span className="text-lg hover:text-blue-500 cursor-pointer">
                  &nbsp;Cart
                </span>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <div className="mt-4 border flex flex-wrap lg:flex-nowrap  relative mx-auto max-w-5xl justify-center md:space-x-0 xl:px-0   ">
            <div className="relative overflow-y-auto max-h-[640px]  ">
              {state.items
                ? state.items.map((item, key) => (
                    <div
                      key={key}
                      className="bg-white border relative justify-between p-4 border-b md:grid md:grid-cols-4 gap-x-4 md:grid-rows-none grid grid-cols-3 grid-rows-3   "
                    >
                      <div className=" md:col-span-1 col-span-2 ">
                        <img
                          src={item.image}
                          alt="product-image"
                          className="ml-8 rounded-lg w-24 h-24 border border-gray-200 p-2 object-fill object-center"
                        />
                      </div>

                      <div className="border w-3/5 flex flex-col justify-center text-left md:col-span-2 col-span-2">
                        <h2 className="text-lg font-bold text-left text-gray-900">
                          {item.title}
                        </h2>
                        <h2>
                          <p className="text-lg mt-2">$ {item.price} </p>
                        </h2>
                        {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                      </div>
                      <div className="relative w-2/5 border flex flex-row items-center justify-between col-span-2 md:col-span-1 ">
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
                          className="border absolute"
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

            {state.items ? (
              state.items.length > 0 ? (
                <div className="relative mt-6 bg-gray-200/50 border-r p-6  md:mt-0 md:w-1/3 h-[640px]">
                  <p className="text-gray-700 text-3xl font-semibold border-b border-gray-300 py-4">
                    Summary
                  </p>

                  <div className="mt-8 mb-2 flex justify-between ">
                    <p className="text-gray-700 font-semibold">Subtotal</p>
                    <p className="text-gray-700 font-semibold">
                      ${subtotal ? subtotal : ""}
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
                        {state.items
                          .reduce(
                            (acm, currentElm) =>
                              acm + currentElm.price * currentElm.quantity,
                            0
                          )
                          }
                      </p>
                      <p className="text-sm text-gray-700 font-semibold">
                        including VAT
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 font-semibold">Promo Code</div>
                  <input
                    type="text"
                    className="w-full mt-4 py-1.5 rounded-md focus:outline-none px-2"
                  />
                  <button
                    onClick={() => dispatch({ type: "CLEAR_ALL" })}
                    className=" bottom-8 mt-12 w-full  mx-auto rounded-md bg-red-600 py-1.5 font-medium text-blue-50 hover:bg-red-700"
                  >
                    Clear All<span className="ml-2"></span>
                  </button>
                  <button className=" bottom-8 mt-4 w-full  mx-auto rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700">
                    <Link href="/Shop/Checkout">
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
