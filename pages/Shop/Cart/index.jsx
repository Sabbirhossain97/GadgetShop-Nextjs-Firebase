import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/Navigation/Navbar";
import Footer from "../../../components/Footer/Footer";
import Link from "next/link";
import { Context } from "../../../context";
import EmptyCart from "../../../components/Empty/EmptyCart";
import Subnavbar from "../../../components/Navigation/Subnavbar";
import { useRouter } from "next/router";
import Spinner from "../../../components/Animation/Spinner";
import useBreadCrumbNavigation from "../../../helpers/hooks/useBreadCrumbNavigation";
import { AiFillHome } from "react-icons/ai";
import { increaseQuantity } from "../../../services/cart/increaseQuantity";
import { decreaseQuantity } from "../../../services/cart/decreaseQuantity";
import { deleteCartItem } from "../../../services/cart/deleteFromCart";
import { clearCart } from "../../../services/cart/deleteAllCartItems";

export default function Cart() {
  const { cartData, isAuth } = useContext(Context);
  const [cartItems] = cartData;
  const [user] = isAuth;
  const [subtotal, setSubtotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const breadcrumbNav = useBreadCrumbNavigation(pathname)

  useEffect(() => {
    let totalValue = cartItems.reduce(
      (acm, currentElm) => acm + currentElm.price * currentElm.quantity,
      0
    );
    setSubtotal(totalValue);
  }, [cartItems]);

  const handleClearAll = () => {
    setLoading(true)
    setTimeout(() => {
      clearCart(user)
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <Navbar />
      <Subnavbar />
      <div className="min-h-screen bg-gray-100/50 py-40 px-10 md:px-20 lg:px-0 ">
        <div className='flex items-center justify-center py-4'>
          <Link href="/">
            <AiFillHome className='hover:text-blue-500 cursor-pointer' />
          </Link>
          <span>&nbsp;/&nbsp;</span>
          <div className='flex space-x-1'>
            {breadcrumbNav.slice(0, 3).map((route, index) => (
              <React.Fragment key={route.href}>
                {index > 0 && <Link href={route.href}>
                  <p className="hover:text-blue-500">{route.name}
                    {index < breadcrumbNav.length - 1 && (
                      <span>&nbsp;/</span>
                    )}
                  </p>
                </Link>}
              </React.Fragment>
            ))}
          </div>
        </div>
        {cartItems ? (
          cartItems.length === 0 ? (
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
        <div className="max-w-5xl flex flex-col lg:flex-row mx-auto relative mt-2">
          <div className="relative overflow-y-auto max-h-[640px] w-full lg:w-2/3 flex flex-col ">
            {cartItems ?
              cartItems.map((item, key) => (
                <div
                  key={key}
                  className="bg-white relative py-4 border-b flex min-w-[570px]"
                >
                  <div className="flex w-full md:w-1/2 gap-2">
                    <img
                      src={item.image}
                      alt="product-image"
                      className="ml-8 rounded-lg w-24 h-24 p-2 object-fill object-center"
                    />
                    <div className="flex flex-col justify-center text-left ">
                      <h2 className="text-lg font-bold text-left text-gray-900 whitespace-wrap md:whitespace-nowrap ">
                        {item.title}
                      </h2>
                      <h2 className="flex gap-8">
                        <p className="text-lg mt-2 whitespace-nowrap">${item.price} </p>
                        <p className="text-md mt-2 whitespace-nowrap">Stock: <span className="text-blue-500 font-semibold">{item.rating.stock} </span></p>
                      </h2>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 relative flex flex-row items-center justify-end">
                    <div className="flex items-center border-gray-100 ">
                      <span
                        onClick={() =>
                          decreaseQuantity(user, item.id)
                        }
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        -{" "}
                      </span>
                      <input
                        className="h-8 w-10 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={item.quantity}
                        min={item.quantity}
                        max={item.rating.stock}
                      />
                      <span
                        onClick={() =>
                          increaseQuantity(user, item.id)
                        }
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        deleteCartItem(user, item.id)
                      }
                      className="px-4 "
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

          {cartItems ? (
            cartItems.length > 0 ? (
              <div className="relative mt-6 bg-gray-200/50 border-r p-6  md:mt-0 w-full lg:w-1/3 h-[640px]">
                <p className="text-gray-700 text-3xl font-semibold border-b border-gray-300 py-4">
                  Summary
                </p>

                <div className="mt-8 mb-2 flex justify-between ">
                  <p className="text-gray-700 font-semibold">Subtotal</p>
                  <p className="text-gray-700 font-semibold">
                    ${subtotal ? subtotal : ""}
                  </p>
                </div>
                <div className="mt-8 flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold ml-10">
                      $
                      {cartItems
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
                <button className="flex justify-center bottom-8 mt-12 w-full  mx-auto rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700">
                  <Link href="/Shop/Cart/Checkout">
                    Checkout<span className="ml-2">&rarr;</span>
                  </Link>
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex justify-center bottom-8 mt-4 w-full mx-auto rounded-md bg-red-600 py-1.5 font-medium text-blue-50 hover:bg-red-700"
                >
                  {loading ? <div className="flex items-center"><Spinner />Processing...</div> : "Clear All"}
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
