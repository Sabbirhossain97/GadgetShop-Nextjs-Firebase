import { useRouter } from "next/router";
import Navbar from "../../components/Navigation/Navbar";
import Footer from "../../components/Footer/Footer";
import products from "../../products.json";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import { TbReplace } from "react-icons/tb";
import { SiAdguard } from "react-icons/si";
import { MdLocalShipping } from "react-icons/md";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import addToWishlist from "../../services/wishlist/addToWishlist";
import { handleCartAction } from "../../helpers/addToCart";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState([]);
  const router = useRouter();
  const getData = useContext(Context);
  const pid = router.query?.productId;
  const [_, setTotalQuantity] = getData?.cartTotal;
  const [user] = getData?.isAuth;
  const [state, dispatch] = getData?.cartReducer;

  function getSingleProduct() {
    let filteredProduct = products.filter((item) => {
      if (item.id === parseInt(pid)) {
        return { item };
      }
    });
    setSingleProduct(filteredProduct);
    return filteredProduct;
  }
  useEffect(() => {
    getSingleProduct();
  }, [pid]);

  useEffect(() => {
    setTotalQuantity(
      state.items.reduce((acm, currentElm) => acm + currentElm.quantity, 0)
    );
  }, [state]);

  return (
    <div className="">
      <Navbar />
      <div className="h-screen">
        {singleProduct.length > 0
          ? singleProduct.map((item, key) => (
            <section key={key} className="mt-16 text-gray-600  min-h-screen">
              <div className="relative container px-5 py-24 mx-auto ">
                <div className="flex flex-row text-xl absolute md:top-24 md:left-52 ">
                  <Link href="/">
                    <span className="text-blue-500 hover:text-blue-600">
                      <AiFillHome className="mt-1 text-slate-800 hover:text-slate-700" />
                    </span>
                  </Link>
                  &nbsp;{"/"}
                  <p className="text-slate-900">&nbsp;{item.category}</p>
                </div>
                <div className="mt-10 lg:w-3/4 mx-auto flex flex-wrap ">
                  <img
                    alt="ecommerce"
                    className="border border-gray-200 lg:w-1/2 w-full lg:h-auto h-54 object-contain px-24 py-2 rounded-md"
                    src={item.image}
                  />
                  <div className=" lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 py-8">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      PRODUCT NAME
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-2">
                      {item.title}
                    </h1>
                    <div className="flex flex-col mb-4 mt-4">
                      <span className="flex items-center mt-4">
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-yellow-400"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-yellow-400"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-yellow-400"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-yellow-400"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-gray-400"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span className="text-blue-600 ml-3">
                          {"( 42 Reviews )"}
                        </span>
                      </span>
                    </div>
                    <p className="leading-relaxed">{item.description}</p>
                    <div className="flex flex-row justify-between mt-12 items-center mb-5 ">
                      <div className="flex flex-col items-center ">
                        <span className="border p-2 rounded-full bg-gray-100">
                          <MdLocalShipping className="text-3xl text-slate-800 " />
                        </span>
                        <p>Free Delivery</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="border p-2 rounded-full bg-gray-100">
                          <TbReplace className="text-3xl text-slate-800 " />
                        </span>
                        <p>30 days replacement </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="border p-2 rounded-full bg-gray-100">
                          <SiAdguard className="text-3xl text-slate-800 " />
                        </span>
                        <p>2 years warranty</p>
                      </div>
                    </div>
                    <div className="h-[1px] mt-2 bg-gray-200"></div>
                    <div className="mt-4">
                      <p>
                        Availability: <span className="font-bold">In Stock</span>
                      </p>
                      <span className="mt-4">
                        Category:{" "}
                        <span className="text-blue-500">{item.category}</span>
                      </span>
                    </div>
                    <div className="flex mt-12 border-t border-gray-200 py-4 ">
                      <div className="w-1/3">
                        <span className="title-font font-medium text-2xl text-gray-900">
                          ${item.price}
                        </span>
                      </div>
                      <div className="w-2/3  flex justify-between">
                        <button
                          onClick={() => addToWishlist(user, item, router)}
                          className=" px-8 flex justify-center  text-black font-semibold border hover:bg-gray-200 py-2 rounded-md transition duration-300"
                        >
                          <p className="text-sm flex flex-row gap-2 items-center">
                            <span>Add to wishlist </span>
                            <span>
                              <FaRegHeart className="" />
                            </span>
                          </p>
                        </button>
                        <button
                          onClick={() =>
                            handleCartAction(user, item.id, router, dispatch)
                          }
                          className="whitespace-nowrap flex text-white bg-slate-800 border-0 py-2 px-6 focus:outline-none hover:bg-slate-700 rounded"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
          :
          <section className="mt-16 text-gray-600  min-h-screen">
            <h1 className=" text-4xl font-bold min-h-screen flex items-center justify-center"> There are no products that matches your criteria!</h1>
          </section>
        }

        <Footer />
      </div>
    </div>
  );
};

export default SingleProduct;
