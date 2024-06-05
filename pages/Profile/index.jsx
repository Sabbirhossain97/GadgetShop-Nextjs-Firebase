import React, { useContext } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import { Context } from '../../context'
import Subnavbar from '../../components/Navigation/Subnavbar'
import Footer from '../../components/Footer/Footer'
import { FaAddressBook } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from 'next/link';

function index() {
    const getData = useContext(Context);
    const [user] = getData?.isAuth;

    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen max-w-[1500px] mx-auto py-10 xl:py-10 px-10 mt-24'>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        {user && <div className="flex gap-4 items-center text-left w-full mb-5">
                            <img
                                className="h-20 w-20 rounded-full border"
                                src={user.photoURL}
                                alt=""
                            />
                            <h1 className="text-xl font-semibold title-font text-gray-900">Hello, <br /> {user.displayName}</h1>
                        </div>
                        }
                        <div className="flex flex-wrap -m-4 text-center">
                            <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                <Link href="/Orders">
                                    <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                        <AiOutlineShoppingCart className='w-10 h-10 mb-3 inline-block text-blue-700' />
                                        <h2 className="title-font font-medium text-lg text-gray-900">Orders</h2>
                                    </div>
                                </Link>
                            </div>
                            <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                    <FaAddressBook className='w-10 h-10 mb-3 inline-block text-blue-700' />
                                    <h2 className="title-font font-medium text-lg text-gray-900">Addresses</h2>
                                </div>
                            </div>
                            <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                <Link href="/Wishlist">
                                    <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                        <FaRegHeart className='w-10 h-10 mb-3 inline-block text-blue-700' />
                                        <h2 className="title-font font-medium text-lg text-gray-900">Wishlists</h2>
                                    </div>
                                </Link>
                            </div>
                            <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                <Link href="/Profile/Password">
                                    <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                        <RiLockPasswordFill className='w-10 h-10 mb-3 inline-block text-blue-700' />
                                        <h2 className="title-font font-medium text-lg text-gray-900">Change Password</h2>
                                    </div>
                                </Link>
                            </div>
                            <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                    <RxAvatar className='w-10 h-10 mb-3 inline-block text-blue-700' />
                                    <h2 className="title-font font-medium text-lg text-gray-900">Edit Profile</h2>
                                </div>
                            </div>
                            <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                    <MdDelete className='w-10 h-10 mb-3 inline-block text-blue-700' />
                                    <h2 className="title-font font-medium text-lg text-gray-900">Delete Account</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default index