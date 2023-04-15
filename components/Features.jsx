import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { AiFillGift } from "react-icons/ai";
import { IoMdPricetags } from "react-icons/io";

export default function Features() {
  return (
    <div className="bg-gray-100 py-24 sm:py-32 mt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Features
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <MdLocalShipping className="text-2xl text-gray-100" />
                </div>
                Free Shipping
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Enjoy free shipping on all orders!.Get your items delivered to
                your doorstep for free.Shop now and take advantage of our free
                shipping offer
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <BiSupport className="text-2xl text-gray-100" />
                </div>
                24/7 Customer Support
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Get help anytime, anywhere with our 24/7 support!.Have a
                question? Our support team is always available to help.We're
                here for you 24 hours a day, 7 days a week!.Get the assistance
                you need, whenever you need it
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <AiFillGift className="text-2xl text-gray-100" />
                </div>
                Free Gift Wrapping
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Make your gift extra special with our free gift wrapping
                service!.We'll wrap your purchases for free, so you can spend
                more time enjoying the moment.Surprise your loved ones with
                beautifully wrapped gifts from our store!
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <IoMdPricetags className="text-2xl text-gray-100" />
                </div>
                Affordable Prices
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Get the products you love at prices you can afford!.We believe
                in offering high-quality products at affordable prices.Shop with
                us and enjoy affordable prices without compromising on quality
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
