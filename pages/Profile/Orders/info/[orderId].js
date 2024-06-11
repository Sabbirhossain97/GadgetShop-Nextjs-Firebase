import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../../../context'
import Navbar from '../../../../components/Navigation/Navbar'
import Footer from '../../../../components/Footer/Footer'
import Subnavbar from '../../../../components/Navigation/Subnavbar'
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import Link from 'next/link'
import useBreadCrumbNavigation from '../../../../helpers/hooks/useBreadCrumbNavigation'
import withAuth from '../../../../helpers/ProtectedRoutes/withAuth'
import { getOrderInfo } from '../../../../services/orders/getOrderInfo'

function OrderInfo() {
    const router = useRouter();
    const { pathname } = router;
    const getData = useContext(Context);
    const [user] = getData?.isAuth;
    const [orderInfo, setOrderInfo] = useState(null)
    const oid = router.query?.orderId?.split("=")[1]
    const breadcrumbNav = useBreadCrumbNavigation(pathname)

    useEffect(() => {
        getOrderInfo(user, setOrderInfo, oid);
    }, [user, oid]);

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
                {orderInfo &&
                    <section className="bg-white py-8 antialiased md:py-16 flex flex-wrap lg:flex-nowrap gap-8">
                        <div className="mx-auto w-full lg:w-1/2 px-0 2xl:px-0 border border-gray-300 bg-gray-50 rounded-lg">
                            <h2 className="border-b text-2xl p-6 font-semibold text-gray-900 mb-2">Order Information #{orderInfo.orderId}</h2>
                            <div className="space-y-4 sm:space-y-2 mt-2 rounded-lg px-6 mb-6 md:mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 border-b py-4">Shipping Address</h3>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Payment Method</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.paymentInfo?.method}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Name</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.shippingAddress?.name}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Address</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.shippingAddress?.address}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">City</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.shippingAddress?.city}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Country</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.shippingAddress?.country}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Email</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.shippingAddress?.email}</dd>
                                </dl>
                                <h3 className="text-xl font-semibold text-gray-900 border-b py-4">Order Summary</h3>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Order Date</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.orderDate}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Sub-Total</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.items?.reduce((acc, currentElm) => acc + currentElm.subtotal, 0)}</dd>
                                </dl>
                                {orderInfo?.deliveryMethod === "home" ?
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Home Delivery</dt>
                                        <dd className="font-medium text-gray-900 sm:text-end">${2}</dd>
                                    </dl> :
                                    <dl className="sm:flex items-center justify-between gap-4">
                                        <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Store Pickup</dt>
                                        <dd className="font-medium text-gray-900 sm:text-end">${0}</dd>
                                    </dl>
                                }
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Total</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderInfo?.totalAmount}</dd>
                                </dl>
                            </div>
                        </div>
                        {/* order history section */}
                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
                                <h3 className="text-xl font-semibold text-gray-900 border-b py-2">Order history</h3>
                                <ol className="relative ms-3 border-s border-gray-200 ">
                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500 flex flex-col justify-center">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-blue-500">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold">{orderInfo?.orderDate}</h4>
                                        <p className="text-sm">Products delivered to the courier - DHL Express</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500 flex flex-col justify-center">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-blue-500">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 font-semibold">{orderInfo?.orderDate}</h4>
                                        <p className="text-sm">Payment accepted - {orderInfo?.paymentInfo?.method}</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500 flex flex-col justify-center">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-blue-500">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h4 className="mb-0.5 font-semibold">{orderInfo?.orderDate}</h4>
                                            <a href="#" className="text-sm font-medium hover:underline">Order placed - Receipt #{orderInfo?.orderId}</a>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </section>
                }
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Products</h2>
                <div className="max-h-[500px] overflow-y-auto mt-8">
                    <table className="min-w-full border">
                        <thead className="text-md text-gray-900 uppercase">
                            <tr>
                                <th className="px-6 py-3 text-left whitespace-nowrap">Product Image</th>
                                <th className="px-6 py-3 text-left whitespace-nowrap">Product Name</th>
                                <th className="px-6 py-3 text-center whitespace-nowrap">Quantity</th>
                                <th className="px-6 py-3 text-left whitespace-nowrap">Price</th>
                                <th className="px-6 py-3 text-left whitespace-nowrap">Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orderInfo?.items.map(item => (
                                <tr key={item.productId} className="border-t">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={item.productImage} alt={item.productName} className="w-20 h-20" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.productName}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">{item.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                                    <td className="px-6 py-4 font-semibold whitespace-nowrap">${item.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default withAuth(OrderInfo)