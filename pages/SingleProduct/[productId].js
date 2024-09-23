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
import { countStars } from "../../helpers/ProductDetails/countStars";
import { message } from "antd";
import addToCart from "../../services/cart/addToCart";
import { increaseQuantity } from "../../services/cart/increaseQuantity";
import { decreaseQuantity } from "../../services/cart/decreaseQuantity";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState([]);
  const router = useRouter();
  const { cartData, isAuth, sidebar } = useContext(Context);
  const [_, setIsCartSidebarOpen] = sidebar
  const [cartItems] = cartData
  const pid = router.query?.productId;
  const [user] = isAuth;
  const [userRating, setUserRating] = useState(null)

  function getSingleProduct() {
    let filteredProduct = products.filter((item) => {
      if (item.id === parseInt(pid)) {
        return { item };
      }
    });
    const [product] = filteredProduct
    setSingleProduct(product);
    return filteredProduct;
  }
  useEffect(() => {
    getSingleProduct();
  }, [pid]);


  useEffect(() => {
    setUserRating(countStars(singleProduct))
  }, [singleProduct])

  const handleCartAdd = () => {
    addToCart(setIsCartSidebarOpen, user, singleProduct, router);
  }

  const handleDecrement = () => {
    let itemId = parseInt(pid)
    decreaseQuantity(user, itemId)
  }

  const handleIncrement = () => {
    let itemId = parseInt(pid)
    const isProductExist = cartItems.find(
      (product) => product.id === parseInt(pid)
    );
    if (!isProductExist) {
      message.error("Add the product to cart first!")
    } else {
      increaseQuantity(user, itemId)
    }
  }

  return (
    <div className="">
      <Navbar />
      <div className="h-screen">
        <section className="mt-16 text-gray-600  min-h-screen">
          {singleProduct && <div className="relative container px-5 py-24 mx-auto">
            <div className="flex flex-row text-xl mx-auto lg:w-full xl:w-3/4 ">
              <Link href="/">
                <span className="text-blue-500 hover:text-blue-600">
                  <AiFillHome className="mt-1 text-slate-800 hover:text-slate-700" />
                </span>
              </Link>
              &nbsp;{"/"}
              <p className="text-slate-900">&nbsp;{singleProduct.category}</p>
            </div>
            <div className="mt-4 lg:w-full xl:w-3/4 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="border border-gray-200 lg:w-1/2 w-full lg:h-auto h-54 object-contain px-24 py-2 rounded-md"
                src={singleProduct.image}
              />
              <div className=" lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 py-8">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  PRODUCT NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-2">
                  {singleProduct.title}
                </h1>
                <div className="flex flex-col mb-4">
                  <span className="flex items-center mt-2">
                    {userRating && userRating.fullStars && userRating?.fullStars?.map((star, index) => (
                      <span key={`full-star-${index}`} className="text-yellow-400">{star}</span>
                    ))}
                    {userRating && userRating.emptyStarsArr && userRating?.emptyStarsArr?.map((star, index) => (
                      <span key={`full-star-${index}`} className="text-gray-500">{star}</span>
                    ))}
                    <span className="text-blue-600 ml-3">
                      ( 42 )
                    </span>
                  </span>
                </div>
                <div className="w-[180px]">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${singleProduct.price}
                  </span>
                </div>
                <p className="leading-relaxed py-4">{singleProduct.description}</p>
                <div className="flex flex-row justify-between mt-12 items-center mb-5 ">
                  <div className="flex flex-col items-center">
                    <span className="border p-2 rounded-full bg-gray-100">
                      <MdLocalShipping className="text-3xl text-slate-800 " />
                    </span>
                    <p className="py-2 text-center">Free Delivery</p>
                  </div>
                  <div className="flex flex-col items-center ">
                    <span className="border p-2 rounded-full bg-gray-100">
                      <TbReplace className="text-3xl text-slate-800 " />
                    </span>
                    <p className="py-2 text-center">30 days replacement </p>
                  </div>
                  <div className="flex flex-col items-center ">
                    <span className="border p-2 rounded-full bg-gray-100">
                      <SiAdguard className="text-3xl text-slate-800 " />
                    </span>
                    <p className="py-2 text-center">2 years warranty</p>
                  </div>
                </div>
                <div className="h-[1px] mt-2 bg-gray-200"></div>
                <div className="mt-4">
                  <p>
                    Availability: <span className="font-bold text-blue-500">In Stock</span>
                  </p>
                  <span className="">
                    Category:{" "}
                    <span className="font-bold">{singleProduct.category}</span>
                  </span>
                  <p>
                    Stock: <span className="font-bold">{singleProduct.rating?.stock}</span>
                  </p>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap mt-4 border-t border-gray-200 py-4 ">
                  {/* quantity */}
                  <div class="relative flex items-center w-full sm:w-1/3">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="bg-white hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3  focus:ring-gray-100 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="bg-white border border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2"
                      value={cartItems.find(
                        (product) => product.id === parseInt(pid)
                      ) ? cartItems.find(
                        (product) => product.id === parseInt(pid)
                      )?.quantity : singleProduct?.quantity}
                      min={1}
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      onClick={handleIncrement}
                      className="bg-white hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                    >
                      <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* quantity */}
                  <div className="w-full flex flex-wrap mt-6 sm:mt-0 sm:flex-nowrap gap-4 justify-end">
                    <div className="w-full sm:w-[200px] lg:w-[150px]">
                      <button
                        onClick={() => addToWishlist(user, singleProduct, router)}
                        className="px-5 w-full flex justify-center text-black font-semibold border hover:bg-gray-200 py-2 rounded-md transition duration-300"
                      >
                        <p className="text-sm flex flex-row gap-2 items-center">
                          <span className="whitespace-nowrap">Add to wishlist </span>
                          <span>
                            <FaRegHeart className="text-md" />
                          </span>
                        </p>
                      </button>
                    </div>
                    <div className="w-full sm:w-[150px] lg:w-[120px]">
                      <button
                        onClick={handleCartAdd}
                        className="px-5 w-full flex justify-center text-white bg-slate-800 font-semibold border hover:bg-slate-700 py-2 rounded-md transition duration-300"
                      >
                        <p className="text-sm flex flex-row gap-2 items-center">
                          <span>Add to cart</span>
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default SingleProduct;
