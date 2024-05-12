import { useEffect, useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Context } from "../context";
import products from "../products.json";
import { useRouter } from "next/router";
import Link from "next/link";
import { message } from "antd";

export default function Products() {
  const getData = useContext(Context);
  const [_, setTotalQuantity] = getData?.cartTotal;
  const [isLoggedIn] = getData?.isAuth;
  const [state, dispatch] = getData?.cartReducer;
  const router = useRouter();

  const handleCartAction = (id) => {
    if (!isLoggedIn) {
      message.warning("Please Sign in!")
      setTimeout(() => {
        router.push("/Signin");
      }, 2000);
    } else {
      message.success("Product added to cart")
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
                className="cursor-pointer relative mx-auto p-4 group border rounded-lg shadow-lg md:w-11/12 w-3/4 h-96 hover:shadow-xl transition duration-300 flex flex-col items-center justify-center"
              >
                <div
                 
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="absolute left-0 top-4 border bg-slate-800">
                    <h1 className="text-white ml-2 pr-2">Save: ${(item.price + item.discount) - item.price}</h1>
                  </div>
                  <div className=" overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={item.image}
                      alt="error"
                      className="h-32 w-full object-contain object-center group-hover:opacity-75"
                    />
                  </div>
                  <hr className="mt-4 bg-gray-300 w-full"></hr>
                  <h3 className="mt-4 text-sm font-semibold text-gray-900 text-center">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg  text-gray-500">${item.price} <span className="ml-4 line-through text-gray-400">${item.price + item.discount}</span></p>
                </div>
                <div className="flex flex-row w-[150px] relative ">
                  <button
                    onClick={() => handleCartAction(item.id)}
                    className="w-full mt-4 bg-slate-800 hover:bg-slate-700 px-2  text-white font-bold py-2 rounded-md"
                  >
                    <p className="text-sm flex flex-row justify-around">
                      <span>Add to cart </span>
                      <span>
                        <AiOutlineShoppingCart className="mt-1 absolute right-4" />
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
