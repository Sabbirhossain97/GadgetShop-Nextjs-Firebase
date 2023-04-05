import React from "react";
import Navbar from "../../components/Navbar";
import DashboardLogo from "../../public/assets/DashboardLogo";
import CustomersLogo from "../../public/assets/CustomersLogo";
import ProductsLogo from "../../public/assets/ProductsLogo";
export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="mt-24 w-full h-screen bg-white sm:flex sm:flex-col md:flex md:flex-row ">
        {/* section 1 */}
        <div className="md:w-1/4 sm:w-full  ">
          <div className="flex flex-col justify-center items-center  ">
            <div className="ml-10 mt-10 flex flex-row ">
              {/* <Logo /> */}
              {/* <p className="mt-1 ml-2 w-[98.06px] h-[36.82px]  text-[28px] font-bold text-left text-[#4e5d78]">
                Stack
              </p> */}
            </div>

            <div className="px-5 mt-10">
              <div className=" flex flex-col mt-4">
                <div className="py-5 px-5 flex flex-row hover:bg-gray-200 rounded-lg cursor-pointer">
                  <DashboardLogo />
                  <p className="ml-4 text-sm font-medium text-left text-[#a7afbc]">
                    Dashboard
                  </p>
                </div>

                <div className="bg-gray-200 px-5 py-5 flex flex-row hover:bg-gray-200 rounded-lg cursor-pointer mt-2">
                  <CustomersLogo />
                  <p className="ml-4 text-sm font-medium text-left text-[#a7afbc]">
                    Customers
                  </p>
                </div>
                <div className="mt-2 px-5 py-5 flex flex-row hover:bg-gray-200 rounded-lg cursor-pointer">
                  {/* <ProductsLogo/> */}
                  <p className="ml-4 text-sm font-medium text-left text-[#a7afbc]">
                    Products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1px] bg-gray-200"></div>
        {/* section 2 */}
        <div className="relative w-full  ">
          <div className="relative flex flex-row h-32 justify-between">
            <div className="relative sm:w-3/4 md:w-2/5 ml-16 h-16 mt-8">
              <input
                type="text"
                className=" w-full placeholder:text-[#b0b7c3] bg-[#f0f5fa] text-base font-medium text-left text-[#b0b7c3] focus:ring-blue-500 focus:border-blue-500 block pl-5 p-4 rounded-2xl  border border-[#f3f3f3]"
                placeholder="Search"
              />
              {/* <SearchLogo /> */}
            </div>
            <div className="mr-28 flex flex-row items-center justify-center">
              {/* <Notification /> */}
              <img
                alt="error"
                className="cursor-pointer ml-10 w-[47px] h-[47px] object-cover rounded-[15px]"
              />
            </div>
          </div>
          <div className=" border-gray-200 border-l-[1px] relative  sm:overflow-auto md:overflow-hidden">
            <div className="relative md:ml-16 sm:ml-0 ">
              <p className=" text-[23px] font-semibold text-center md:text-left text-[#323b4b]">
                Customers List
              </p>
              <div className="flex flex-row py-5 rounded-xl bg-[#fafbfc] mt-8 w-11/12">
                <p className="ml-16 w-1/12  text-sm font-semibold text-left text-[#4e5d78]">
                  #ID
                </p>
                <p className="w-2/5  text-sm font-semibold text-left text-[#4e5d78]">
                  USER
                </p>
                <p className="w-2/5  text-sm font-semibold text-left text-[#4e5d78]">
                  EMAIL
                </p>
                <p className="w-1/12  text-sm font-semibold text-left text-[#4e5d78]">
                  OPTIONS
                </p>
              </div>
              {/* users list */}

              <div className=" flex flex-row items-center py-2 rounded-xl md:w-11/12 sm:w-full ">
                <div className="ml-16 w-1/12  text-sm font-semibold text-left text-[#4e5d78]">
                  {""}
                </div>
                <div className="w-2/5 flex flex-row items-center text-sm font-semibold text-left text-[#4e5d78]">
                  <img
                    alt="error"
                    src={""}
                    className="border border-gray-200 w-[60px] h-[60px]  rounded-[15px] object-cover"
                  />
                  <p className="ml-4 text-sm font-semibold text-left text-[#4e5d78]">
                    {""} {""}
                  </p>
                </div>
                <div className="w-2/5  text-sm font-semibold text-left text-[#4e5d78]">
                  {""}
                </div>
                <div className="w-1/12  text-sm font-semibold text-left text-[#4e5d78]">
                  {/* <OptionsLogo /> */}
                </div>
              </div>
            </div>
          </div>
          {/* pagination */}
          <div className="sm:mt-8 md:mt-16 ml-16 flex justify-start items-start gap-[5px]">
            <div className="cursor-pointer flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-8 w-8 relative gap-2.5 p-2.5 rounded-lg bg-white border border-[#f1f1f1] hover:bg-[#2f80ed] hover:text-white">
              <span>{/* <DoubleArrow1 /> */}</span>
            </div>

            <div className="bg-[#2f80ed] cursor-pointer hover:text-white text-white flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-8 w-8 relative gap-2.5 p-2.5 rounded-lg hover:bg-[#2f80ed] border border-[#f1f1f1]">
              <p className="flex-grow-0 flex-shrink-0 text-[13px] font-semibold text-left ">
                {""}
              </p>
            </div>

            <div className="cursor-pointer hover:bg-[#2f80ed] flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-8 w-8 relative gap-2.5 p-2.5 rounded-lg bg-white border border-[#f1f1f1]">
              {/* <DoubleArrow2 /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
