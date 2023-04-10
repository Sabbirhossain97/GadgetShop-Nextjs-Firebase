import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import products from "../../products.json";
import { useEffect, useState, useReducer, useContext } from "react";
import { Context } from "../../context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState([]);
  const router = useRouter();
  const getData = useContext(Context);
  const pid = router.query?.productId;
  const [items, setItems] = getData?.cart;
  const [totalQauntity, setTotalQuantity] = getData?.cartTotal;

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
    setTotalQuantity(
      state.items.reduce((acm, currentElm) => acm + currentElm.quantity, 0)
    );
  }, [state]);

  return (
    <div className="">
      <Navbar />

      {singleProduct
        ? singleProduct.map((item, key) => (
            <section
              key={key}
              className="text-gray-600 body-font overflow-hidden p-24"
            >
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-3/5 lg:h-3/5 mx-auto flex flex-wrap ">
                  <img
                    alt="ecommerce"
                    className="border border-gray-200 p-12 lg:w-1/2 w-full lg:h-auto h-24 object-contain rounded-md"
                    src={item.image}
                  />
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-12 p-4 ">
                   
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      {item.title}
                    </h1>
                    <div className="flex mb-4">
                      <span className="flex items-center">
                        <span className="text-blue-500 text-xl">
                          {item.category}
                        </span>
                      </span>
                    </div>
                    <p className="leading-relaxed">{item.description}</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                      <div className="flex ml-6 items-center">
                        <div className="relative">
                          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        ${item.price}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({ type: "ADD_PRODUCT", id: item.id })
                        }
                        className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        : ""}

      <Footer />
    </div>
  );
};

export default SingleProduct;
