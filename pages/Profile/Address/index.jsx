import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../../context'
import Navbar from '../../../components/Navigation/Navbar'
import Subnavbar from '../../../components/Navigation/Subnavbar'
import Footer from '../../../components/Footer/Footer'
import useBreadCrumbNavigation from '../../../helpers/hooks/useBreadCrumbNavigation'
import { useRouter } from 'next/router'
import { AiFillHome } from "react-icons/ai";
import Link from 'next/link';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import getAddressData from '../../../services/address/getAddress'
import { db } from '../../../services/firebase'
import { handleDeleteAddress } from '../../../services/address/deleteAddress'
import { CgSpinner } from "react-icons/cg";
import withAuth from '../../../helpers/ProtectedRoutes/withAuth'

function Address() {
    const { isAuth } = useContext(Context);
    const [user] = isAuth;
    const router = useRouter();
    const { pathname } = router;
    const breadcrumbNav = useBreadCrumbNavigation(pathname);
    const [addressData, setAddressData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getAddressData(db, user, setAddressData);
            setLoading(false)
        }, 1000)
    }, [user]);

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
                <div className='mt-8 '>
                    {loading ? <div className='flex justify-center h-44 items-center'>
                        <CgSpinner className='animate-spin text-3xl text-blue-500' />
                    </div> :
                        <ul className='flex flex-col gap-6'>
                            {addressData && addressData.map((addressInfo, index) => (
                                <li key={index} className='cursor-pointer text-black border border-gray-200 py-4 rounded-md shadow-sm hover:shadow-md transition duration-300 flex justify-between'>
                                    <div>
                                        <p className='pl-8'>
                                            {addressInfo.username}, {addressInfo.address}, {addressInfo.city} - {addressInfo.postcode}, {addressInfo.country}
                                            {addressInfo.isDefault === "yes" &&
                                                <span className='ml-2 leading-8 border py-1 px-2 bg-green-500 text-sm text-white rounded-md'>Default</span>
                                            }
                                        </p>
                                    </div>
                                    <div className='flex gap-4 pr-8'>
                                        <Link href={`/Profile/Address/Edit/address_id=${addressInfo.id}`}>
                                            <span>
                                                <MdEdit className='text-xl hover:text-blue-500 transition duration-300' />
                                            </span>
                                        </Link>
                                        <span onClick={() => handleDeleteAddress(user, addressInfo.id)}>
                                            <MdDelete className='text-xl hover:text-red-500 transition duration-300' />
                                        </span>
                                    </div>
                                </li>
                            ))}

                            <Link href="/Profile/Address/Add">
                                <li className='cursor-pointer group flex justify-center text-black border border-gray-200 py-4 rounded-md shadow-sm hover:shadow-md transition duration-300'>
                                    <p className='pl-8 flex items-center gap-2 '>
                                        <IoMdAdd className='text-xl group-hover:text-blue-500 transition duration-300' />
                                        <span className='group-hover:text-blue-500 transition duration-300'>Add New Address</span>
                                    </p>
                                </li>
                            </Link>
                        </ul>}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default withAuth(Address)