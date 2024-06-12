import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../context';
import Navbar from '../../../components/Navigation/Navbar';
import Subnavbar from '../../../components/Navigation/Subnavbar';
import { useRouter } from 'next/router';
import Footer from '../../../components/Footer/Footer';
import { handleCartAction } from '../../../helpers/addToCart';
import { handleDeleteItem } from '../../../services/wishlist/deleteFromWishlist';
import useBreadCrumbNavigation from '../../../helpers/hooks/useBreadCrumbNavigation';
import { AiFillHome } from "react-icons/ai";
import Link from 'next/link';

function Wishlist() {
    const router = useRouter()
    const { wishlistData, isAuth, sidebar, cartReducer } = useContext(Context);
    const [wishlist] = wishlistData
    const [user] = isAuth;
    const [, setIsCartSidebarOpen] = sidebar;
    const [, dispatch] = cartReducer;
    const { pathname } = router;
    const breadcrumbNav = useBreadCrumbNavigation(pathname)

    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen max-w-[1500px] mx-auto py-10 xl:py-10 px-10 mt-10 xl:mt-24'>
                <div className='flex items-center justify-center py-4'>
                    <Link href="/">
                        <AiFillHome className='hover:text-blue-500 cursor-pointer' />
                    </Link>
                    <span>&nbsp;/&nbsp;</span>
                    <div className='flex space-x-1'>
                        {breadcrumbNav.slice(0, 3).map((route, index) => (
                            <React.Fragment key={route.href}>
                                <Link href={route.href}>
                                    <p className="hover:text-blue-500">{route.name}
                                        {index < breadcrumbNav.length - 1 && (
                                            <span>&nbsp;/</span>
                                        )}
                                    </p>

                                </Link>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className={`text-2xl font-semibold py-2 ${wishlist.length === 0 && 'border-b-2'} `}>My Wishlist</h1>
                    <div className='pt-5 relative'>
                        <div className='w-full overflow-auto'>
                            {
                                wishlist.length === 0 ?
                                    <>
                                        <div className='flex justify-center'>
                                            <img src="/assets/wishlist.png" />
                                        </div>
                                        <div className='text-center text-xl'>
                                            <h1>You haven't saved anything yet.</h1>
                                        </div>
                                        <div className='flex justify-center'>
                                            <Link href="/">
                                                <button
                                                    className="w-[200px] rounded-md mt-4 bg-slate-800 hover:bg-slate-700 px-4 transition duration-300 text-white font-bold py-2 "
                                                >
                                                    <p className="text-lg flex flex-row justify-around">
                                                        <span className='whitespace-nowrap'>Return to Shop</span>
                                                    </p>
                                                </button>
                                            </Link>
                                        </div>
                                    </>

                                    :
                                    <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-900 uppercase border">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Product Image
                                                </th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Product Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Unit Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Stock
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='border text-black'>
                                            {wishlist && wishlist.map((item, index) => (
                                                <tr key={index} className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4">
                                                        <img src={item.image} className='w-20 h-20' />
                                                    </th>
                                                    <td className="px-6 py-4 whitespace-nowrap ">
                                                        {item.title}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        ${item.price}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-green-500">
                                                        In Stock
                                                    </td>
                                                    <td className="px-6 py-4 flex justify-center gap-4">
                                                        <button
                                                            onClick={(e) => {
                                                                setIsCartSidebarOpen(true);
                                                                handleCartAction(user, item.id, router, dispatch)
                                                            }}
                                                            className="w-[120px] mt-4 bg-slate-800 hover:bg-slate-700 px-2 transition duration-300 text-white font-semibold py-2 rounded-md"
                                                        >
                                                            <p className="text-sm flex flex-row justify-around">
                                                                <span className='whitespace-nowrap'>Add to cart </span>
                                                            </p>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(user, item.id)}
                                                            className="w-[100px] mt-4 bg-red-600 hover:bg-red-700 px-2 transition duration-300 text-white font-semibold py-2 rounded-md"
                                                        >
                                                            <p className="text-sm flex flex-row justify-around">
                                                                <span className='whitespace-nowrap'>Delete </span>
                                                            </p>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Wishlist;