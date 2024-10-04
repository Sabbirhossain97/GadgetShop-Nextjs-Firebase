import React from "react";
import { sponsors } from "../../helpers/static/static";
import { TwitterIcon, FacebookIcon, InstagramIcon, GithubIcon } from "../SvgComponents/SVG";

export default function Footer() {
  return (
    <section className="py-12 bg-slate-800 sm:pt-16 lg:pt-12 xl:mb-0">
      <div className="px-4 mx-auto sm:px-6 lg:px-2 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8 ">
            <div>
              <img src="/assets/logo.png" alt="logo" />
            </div>
          </div>

          <div className="flex flex-col justify-end xs:pl-10 sm:pl-10 md:pl-0 ">
            <p className="text-sm font-semibold tracking-widest text-white uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base text-gray-100/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  About Us{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base text-gray-100/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Features{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base text-gray-100/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Contact Us{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base text-gray-100/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Refund Policy{" "}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-sm font-semibold tracking-widest text-white uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base whitespace-nowrap text-gray-100/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Customer Support{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base text-gray-100/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Delivery Details{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base whitespace-nowrap text-gray-100/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Terms & Conditions{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base  text-gray-100/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8 flex justify-center">
            <ul className="flex items-center space-x-3 mt-9">
              <li>
                <a
                  href="#"
                  title=""
                  className="p-1 flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-10 h-10 hover:bg-blue-600 focus:bg-blue-600"
                >
                  <TwitterIcon />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="p-1 flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-10 h-10 hover:bg-blue-600 focus:bg-blue-600"
                >
                  <FacebookIcon />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="p-1 flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-10 h-10 hover:bg-blue-600 focus:bg-blue-600"
                >
                  <InstagramIcon />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="p-1 flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-10 h-10 hover:bg-blue-600 focus:bg-blue-600"
                >
                  <GithubIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='w-full mx-auto flex gap-3 py-6 justify-center lg:justify-end items-center'>
          {sponsors.map((item, index) => (
            <div key={index}>
              <img src={`/assets/sponsors/${item}.png`} className='cursor-pointer h-full w-full' />
            </div>
          ))}
        </div>

        <hr className="mt-16 mb-10 border-gray-100/20" />
        <p className="text-sm text-center text-white">
          © Gadget Shop 2024, All Rights Reserved
        </p>
      </div>
    </section>
  );
}
