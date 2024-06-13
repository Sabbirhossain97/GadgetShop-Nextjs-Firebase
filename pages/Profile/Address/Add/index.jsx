import React, { useState, useContext } from 'react'
import { Context } from '../../../../context'
import Navbar from '../../../../components/Navigation/Navbar'
import Subnavbar from '../../../../components/Navigation/Subnavbar'
import Footer from '../../../../components/Footer/Footer'
import useBreadCrumbNavigation from '../../../../helpers/hooks/useBreadCrumbNavigation'
import { useRouter } from 'next/router'
import { AiFillHome } from "react-icons/ai";
import Link from 'next/link';
import addNewAddress from '../../../../services/address/addAddress'
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../../../../components/Animation/Spinner'
import { updateExistingDefaultAddress } from '../../../../services/address/updateExistingDefaultAddress'
import withAuth from '../../../../helpers/ProtectedRoutes/withAuth'

function Add() {
    const { isAuth } = useContext(Context);
    const [user] = isAuth;
    const router = useRouter();
    const { pathname } = router;
    const breadcrumbNav = useBreadCrumbNavigation(pathname);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        const { username, address1, address2, city, country, postcode, defaultaddress } = formDataObj;
        const addressDetails = {
            id: uuidv4().replace(/\D/g, '').slice(0, 6),
            username: username,
            address: address2 ? address1 + ", " + address2 : address1,
            city: city,
            country: country,
            postcode: postcode,
            isDefault: defaultaddress
        }

        if (defaultaddress === "yes") {
            await updateExistingDefaultAddress(user.uid);
        }

        try {
            setLoading(true)
            setTimeout(() => {
                addNewAddress(user, addressDetails, router);
                router.push('/Profile/Address')
                setLoading(false)
            }, 2000)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen flex flex-col items-center gap-6 max-w-[1500px] mx-auto py-10 xl:py-10 px-10 mt-10 xl:mt-24'>
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
                <div className={`w-full relative p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md border sm:p-8`}>
                    <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Add Address
                    </h2>
                    <form className="max-w-sm mx-auto py-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-5 mt-4">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="address1" className="block mb-2 text-sm font-medium text-gray-900">Address Line 1</label>
                            <input
                                type="text"
                                id="address1"
                                name="address1"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="address2" className="block mb-2 text-sm font-medium text-gray-900">Address Line 2 (Optional)</label>
                            <input
                                type="text"
                                id="address2"
                                name="address2"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                            <input
                                type="city"
                                id="city"
                                name='city'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="postcode" className="block mb-2 text-sm font-medium text-gray-900">Post Code</label>
                            <input
                                type="text"
                                id="postcode"
                                name="postcode"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <p className="text-md mt-4 mb-4 font-semibold">Default Address</p>
                            <div className="flex items-center mb-4">
                                <input type="radio" value="yes" required name="defaultaddress" id="radio-yes" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="radio-cash" className="ms-2 text-sm font-medium text-gray-900 ">Yes</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" value="no" required name="defaultaddress" id="radio-no" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="radio-online" className="ms-2 text-sm font-medium text-gray-900 ">No</label>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">{loading ? <p className="flex justify-center items-center"><Spinner /> Processing...</p> : "Submit"}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default withAuth(Add)