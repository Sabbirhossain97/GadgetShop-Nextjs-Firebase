import React, { useEffect, useReducer, useContext, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Context } from "../context";
import products from "../products.json";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillHome } from "react-icons/ai";

export default function Products() {
  const getData = useContext(Context);
  const [items, setItems] = getData?.cart;
  const [totalQauntity, setTotalQuantity] = getData?.cartTotal;
  const [isLoggedIn, setIsLoggedIn] = getData?.auth;
  const router = useRouter();
  const initialState = {
    items: [],
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        let existingProduct = state.items.find((currentElm) => {
          if (currentElm.id === action.id) {
            toast.error("Item already in the cart!", {
              position: "top-center",
              toastId: "error1",
            });
            return currentElm;
          }
        });

        if (existingProduct) {
          let updatedCart = state.items.map((currentElm) => {
            if (currentElm.id === action.id) {
              let newAmount = currentElm.quantity + 1;
              return {
                ...currentElm,
                quantity: newAmount,
              };
            } else {
              return currentElm;
            }
          });
          return {
            ...state,
            items: updatedCart,
          };
        } else {
          let addedProduct = products.filter((currentElm) => {
            if (currentElm.id === action.id) {
              return { currentElm };
            }
          });
          let [selectedProduct] = addedProduct;

          return {
            ...state,
            items: [...state.items, selectedProduct],
          };
        }
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    setItems(state.items);
  }, [state]);
  const handleCartAction = (id) => {
    if (!isLoggedIn) {
      toast.warn("Please Sign in!", {
        position: "top-center",
        toastId: "warn1",
      });
      setTimeout(() => {
        router.push("/Signin");
      }, 2000);
    } else {
      dispatch({ type: "ADD_PRODUCT", id: id });
    }
  };
  const goToSingleProduct = (id) => {
    if (isLoggedIn) {
      router.push(`/SingleProduct/${id}`);
    } else {
      router.push(`/Signin`);
    }
  };

  useEffect(() => {
    setTotalQuantity(
      state.items.reduce((acm, currentElm) => acm + currentElm.quantity, 0)
    );
  }, [state]);

  return (
    <div className="container mx-auto w-3/4 py-2 mt-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Products</h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
        {products
          ? products.map((item, key) => (
              <div
                key={key}
                className="relative mx-auto p-4 group border rounded-lg shadow-lg md:w-11/12 w-4/5 h-96 hover:shadow-xl transition duration-300 flex flex-col items-center justify-center"
              >
                <div
                  onClick={() => goToSingleProduct(item.id)}
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className=" overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={item.image}
                      alt="error"
                      className="h-32 w-full object-contain object-center group-hover:opacity-75"
                    />
                  </div>
                  <hr className="mt-4 bg-gray-300 w-full"></hr>
                  <h3 className="mt-4 text-sm text-gray-700 text-center">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${item.price}
                  </p>
                </div>
                <div className="flex flex-row w-4/5 absolute bottom-4 md:right-8">
                  <button
                    onClick={() => handleCartAction(item.id)}
                    className="w-full mt-4 ml-4 bg-slate-800 hover:bg-slate-700 px-2  text-white font-bold py-2  rounded-lg"
                  >
                    <p className=" flex flex-row justify-around">
                      <span>Add to cart </span>
                      <span>
                        <AiOutlineShoppingCart className="mt-1.5 absolute md:right-10 right-16" />
                      </span>
                    </p>
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
