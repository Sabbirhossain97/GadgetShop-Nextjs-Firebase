import { useEffect, useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Context } from "../context";
import products from "../products.json";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tooltip } from "antd";
import { FaRegHeart } from "react-icons/fa";
import addToWishlist from "../services/wishlist/addToWishlist";
import { handleCartAction } from "../helpers/addToCart";

export default function Products() {
  const getData = useContext(Context);
  const [_, setTotalQuantity] = getData?.cartTotal;
  const [user] = getData?.isAuth;
  const [state, dispatch] = getData?.cartReducer;
  const router = useRouter();

  const goToSingleProduct = (id) => {
    router.push(`/SingleProduct/${id}`);
  };
  
  useEffect(() => {
    setTotalQuantity(
      state.items.reduce((acm, currentElm) => acm + currentElm.quantity, 0)
    );
  }, [state]);

  return (
    <>
      <div className="container mx-auto w-3/4 py-2 mt-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
          {products
            ? products.slice(0, 15).map((item, key) => (
              <div
                key={key}
                onClick={() => goToSingleProduct(item.id)}
                className="cursor-pointer relative mx-auto p-4 group border rounded-lg shadow-lg md:w-11/12 w-3/4 h-96 hover:shadow-xl hover:opacity-90 transition duration-300 flex flex-col items-center justify-center"
              >
                <div className="cursor-pointer flex flex-col items-center justify-center">
                  <div className="absolute left-0 top-4 border bg-slate-800">
                    <h1 className="text-white ml-2 pr-2">Save: ${(item.price + item.discount) - item.price}</h1>
                  </div>
                  <div className=" overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={item.image}
                      alt="error"
                      className="h-32 w-full object-contain object-center"
                    />
                  </div>
                  <hr className="mt-4 bg-gray-300 w-full"></hr>
                  <Tooltip placement="top" title={item.title}>
                    <h3 className="mt-4 text-sm font-semibold text-gray-900 max-w-[170px] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.title}
                    </h3>
                  </Tooltip>
                  <p className="mt-4 text-lg  text-gray-500">${item.price} <span className="ml-4 line-through text-gray-400">${item.price + item.discount}</span></p>
                </div>
                <div className="flex flex-col w-[150px] relative ">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCartAction(user, item.id, router, dispatch);
                    }}
                    className="w-full mt-4 bg-slate-800 hover:bg-slate-700 px-2 transition duration-300 text-white font-bold py-2 rounded-md"
                  >
                    <p className="text-sm flex flex-row justify-around">
                      <span>Add to cart </span>
                      <span>
                        <AiOutlineShoppingCart className="mt-1 absolute right-4" />
                      </span>
                    </p>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(user, item, router);
                    }}
                    className="w-full mt-4 px-2  text-black font-semibold border hover:bg-gray-200 py-2 rounded-md transition duration-300"
                  >
                    <p className="text-sm flex flex-row justify-around items-center">
                      <span>Add to wishlist </span>
                      <span>
                        <FaRegHeart />
                      </span>
                    </p>
                  </button>
                </div>
              </div>
            ))
            : ""}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Link href="/Products">
          <button
            className="w-[200px] mt-4 bg-slate-800 hover:bg-slate-700 px-2  text-white font-bold py-4 rounded-md"
          >
            <p className="text-md flex flex-row justify-around">
              <span>Browse All Products</span>
            </p>
          </button>
        </Link>
      </div>
    </>
  );
}
