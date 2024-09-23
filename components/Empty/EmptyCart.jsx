import React from "react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 items-center justify-center flex-col">
        <img
          className="lg:w-4/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="/assets/cart/emptycart.png"
        />
        <div className="-mt-16 text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold text-slate-900">
            Your cart is empty!
          </h1>

          <div className="mt-16 flex justify-center">
            <Link href="/">
              <button className="inline-flex text-white bg-slate-800 border-0 py-2 px-6 focus:outline-none hover:bg-slate-700 rounded-md text-lg">
                Return to shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
