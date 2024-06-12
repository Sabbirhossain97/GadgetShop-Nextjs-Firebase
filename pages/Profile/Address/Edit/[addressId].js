import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../../../context'
import Navbar from '../../../../components/Navigation/Navbar'
import Subnavbar from '../../../../components/Navigation/Subnavbar'
import Footer from '../../../../components/Footer/Footer'
import { AiFillHome } from "react-icons/ai";
import { useRouter } from 'next/router'
import Link from 'next/link';
import useBreadCrumbNavigation from '../../../../helpers/hooks/useBreadCrumbNavigation';
import Spinner from '../../../../components/Animation/Spinner';
import { getAddressInfo } from '../../../../services/address/getAddressInfo';
import editAddress from '../../../../services/address/editAddress'
import { updateExistingDefaultAddress } from '../../../../services/address/updateExistingDefaultAddress'

function AddressEdit() {
    const router = useRouter();
    const { pathname } = router;
    const getData = useContext(Context);
    const [user] = getData?.isAuth;
    const breadcrumbNav = useBreadCrumbNavigation(pathname);
    const [loading, setLoading] = useState(false);
    const addressId = router.query?.addressId?.split("=")[1]
    const [addressInfo, setAddressInfo] = useState(null)
    const [isDefault, setIsDefault] = useState(addressInfo?.isDefault || "no");

    useEffect(() => {
        setIsDefault(addressInfo?.isDefault || "no");
    }, [addressInfo]);

    const handleRadioChange = (event) => {
        setIsDefault(event.target.value);
    };

    useEffect(() => {
        getAddressInfo(user, setAddressInfo, addressId);
    }, [user, addressId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        const { username, address1, address2, city, country, postcode, defaultaddress } = formDataObj;

        const addressDetails = {
            id: addressId,
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
                editAddress(user, addressDetails, router);
                router.push('/Profile/Address')
                setLoading(false)
            }, 1000)
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
                                {index < breadcrumbNav.length - 2 ? (
                                    <Link href={route.href}>
                                        <p className="hover:text-blue-500">{route.name}
                                            {index < breadcrumbNav.length - 2 && (
                                                <span>&nbsp;/</span>
                                            )}
                                        </p>
                                    </Link>
                                ) : (
                                    <p className="hover:text-blue-500 cursor-pointer">{route.name}</p>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className={`w-full relative p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md border sm:p-8`}>
                    <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Edit Address
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
                                defaultValue={addressInfo?.username}
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
                                defaultValue={addressInfo?.address}
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
                                defaultValue={addressInfo?.city}
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
                                defaultValue={addressInfo?.postcode}
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
                                defaultValue={addressInfo?.country}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <p className="text-md mt-4 mb-4 font-semibold">Default Address</p>
                            <div className="flex items-center mb-4">
                                <input
                                    type="radio"
                                    value="yes"
                                    checked={isDefault === "yes"}
                                    onChange={handleRadioChange}
                                    required
                                    name="defaultaddress"
                                    id="radio-yes"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="radio-cash" className="ms-2 text-sm font-medium text-gray-900 ">Yes</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="no"
                                    checked={isDefault === "no"}
                                    onChange={handleRadioChange}
                                    required
                                    name="defaultaddress"
                                    id="radio-no"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="radio-online" className="ms-2 text-sm font-medium text-gray-900 ">No</label>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">{loading ? <p className="flex justify-center items-center"><Spinner /> Processing...</p> : "Update"}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddressEdit