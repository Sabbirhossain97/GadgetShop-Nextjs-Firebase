// import React, { useEffect, useReducer, useContext, useState } from "react";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { Context } from "../context";
// import products from "../products.json";
// import { useRouter } from "next/router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Products() {
//   const getData = useContext(Context);
//   const [items, setItems] = getData?.cart;
//   const [totalQauntity, setTotalQuantity] = getData?.cartTotal;
//   const [isLoggedIn, setIsLoggedIn] = getData?.auth;
//   const router = useRouter();
//   const initialState = {
//     items: [],
//   };
//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "ADD_PRODUCT":
//         let existingProduct = state.items.find((currentElm) => {
//           if (currentElm.id === action.id) {
//             toast.error("Item already in the cart!", {
//               position: "top-center",
//               toastId: "error1",
//             });
//             return currentElm;
//           }
//         });

//         if (existingProduct) {
//           let updatedCart = state.items.map((currentElm) => {
//             if (currentElm.id === action.id) {
//               let newAmount = currentElm.quantity + 1;
//               return {
//                 ...currentElm,
//                 quantity: newAmount,
//               };
//             } else {
//               return currentElm;
//             }
//           });
//           return {
//             ...state,
//             items: updatedCart,
//           };
//         } else {
//           let addedProduct = products.filter((currentElm) => {
//             if (currentElm.id === action.id) {
//               return { currentElm };
//             }
//           });
//           let [selectedProduct] = addedProduct;

//           return {
//             ...state,
//             items: [...state.items, selectedProduct],
//           };
//         }
//     }
//   };
//   const [state, dispatch] = useReducer(reducer, initialState);
//   useEffect(() => {
//     setItems(state.items);
//   }, [state]);
//   const handleCartAction = (id) => {
//     if (!isLoggedIn) {
//       toast.warn("Please Sign in!", {
//         position: "top-center",
//         toastId: "warn1",
//       });
//       setTimeout(() => {
//         router.push("/Signin");
//       }, 2000);
//     } else {
//       dispatch({ type: "ADD_PRODUCT", id: id });
//     }
//   };
//   const goToSingleProduct = (id) => {
//     if (isLoggedIn) {
//       router.push(`/SingleProduct/${id}`);
//     } else {
//       router.push(`/Signin`);
//     }
//   };

//   useEffect(() => {
//     setTotalQuantity(
//       state.items.reduce((acm, currentElm) => acm + currentElm.quantity, 0)
//     );
//   }, [state]);

//   return (
//     <div className="container mx-auto w-3/4 py-2 mt-24">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold">Products</h2>
//       </div>
//       <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
//         {products
//           ? products.map((item, key) => (
//               <div
//                 key={key}
//                 className="p-4 group border rounded-lg shadow-md scale-98 w-full  hover:scale-100 hover:shadow-xl transition duration-300 flex flex-col items-center justify-center"
//               >
//                 <div className=" aspect-w-1 aspect-h-1 w-1/2 h-1/2  overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
//                   <img
//                     src={item.image}
//                     alt="error"
//                     className="h-32 w-full object-contain object-center group-hover:opacity-75"
//                   />
//                 </div>
//                 <hr className="mt-4 bg-gray-300 w-full"></hr>
//                 <h3 className="mt-4 text-sm text-gray-700 text-center">
//                   {item.title}
//                 </h3>
//                 <p className="mt-1 text-lg font-medium text-gray-900">
//                   ${item.price}
//                 </p>
//                 <div className="flex flex-row justify-center w-full">
//                   <button
//                     onClick={() => goToSingleProduct(item.id)}
//                     className="w-1/2 text-sm mt-4 border border-blue-500 text-blue-500 hover:bg-gray-100 py-2 px-1 hover:text-blue-700 font-semibold  rounded-lg"
//                   >
//                     {/* <Link href={`/SingleProduct/${item.id}`}> Details</Link> */}
//                     Details
//                   </button>
//                   <button
//                     onClick={() => handleCartAction(item.id)}
//                     className="flex justify-center mt-4 ml-4 bg-blue-500 hover:bg-blue-700 px-2 w-1/3 text-white font-bold py-2   rounded-lg"
//                   >
//                     <AiOutlineShoppingCart className="mt-0.5" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           : ""}
//       </div>
//     </div>
//   );
// }
