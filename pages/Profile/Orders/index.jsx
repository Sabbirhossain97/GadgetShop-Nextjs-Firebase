import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../../components/Navigation/Navbar'
import { Context } from '../../../context'
import Subnavbar from '../../../components/Navigation/Subnavbar'
import Footer from '../../../components/Footer/Footer'
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import Link from 'next/link'
import useBreadCrumbNavigation from '../../../helpers/hooks/useBreadCrumbNavigation'
import withAuth from '../../../helpers/ProtectedRoutes/withAuth'
import { getOrderData } from '../../../services/orders/getOrderList'

function Orders() {
    const { isAuth } = useContext(Context);
    const [user] = isAuth;
    const router = useRouter();
    const { pathname } = router;
    const [orderList, setOrderList] = useState(null)
    const breadcrumbNav = useBreadCrumbNavigation(pathname)

    useEffect(() => {
        getOrderData(user, setOrderList);
    }, [user]);

    const goToOrderInfo = (id) => {
        router.push(`/Profile/Orders/info/order_id=${id}`);
    };

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
                {orderList && <div>
                    <h1 className={`text-2xl font-semibold py-2 ${orderList.length === 0 && 'border-b-2'} `}>Order History</h1>
                    <div className='pt-5 relative'>
                        <div className='w-full overflow-auto'>
                            {
                                orderList.length === 0 ?
                                    <>
                                        <div className='flex justify-center'>
                                            <img src="/assets/wishlist/wishlist.png" />
                                        </div>
                                        <div className='text-center text-xl'>
                                            <h1>You haven't ordered anything yet.</h1>
                                        </div>
                                        <div className='flex justify-center'>
                                            <Link href="/">
                                                <button
                                                    className="w-[150px] rounded-md mt-4 bg-slate-800 hover:bg-slate-700 px-4 transition duration-300 text-white font-bold py-2 "
                                                >
                                                    <p className="text-lg flex flex-row justify-around">
                                                        <span className='whitespace-nowrap'>Shop</span>
                                                    </p>
                                                </button>
                                            </Link>
                                        </div>
                                    </>
                                    :
                                    <table className="max-h-screen overflow-y-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-md text-gray-900 uppercase border">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Order Number
                                                </th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Order Date
                                                </th>
                                                <th scope="col" className="px-6 text-center py-3 whitespace-nowrap">
                                                    Products
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='border text-black overflow-y-auto'>
                                            {orderList.map(order => (
                                                <React.Fragment key={order.orderId}>
                                                    <tr className='border'>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {order.orderId}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {order.orderDate}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="max-h-40 overflow-y-auto">
                                                                <table className="min-w-full">
                                                                    <thead className="text-xs text-gray-900 uppercase">
                                                                        <tr>
                                                                            <th className="px-6 py-3 whitespace-nowrap">Product Image</th>
                                                                            <th className="px-6 py-3 whitespace-nowrap">Product Name</th>
                                                                            <th className="px-6 py-3 whitespace-nowrap">Price</th>
                                                                            <th className="px-6 py-3 text-center whitespace-nowrap">Quantity</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {order.items.map(item => (
                                                                            <tr key={item.productId} className="border-t">
                                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                                    <img src={item.productImage} alt={item.productName} className="w-20 h-20" />
                                                                                </td>
                                                                                <td className="px-6 py-4 whitespace-nowrap">{item.productName}</td>
                                                                                <td className="px-6 py-4 font-semibold whitespace-nowrap">${item.price}</td>
                                                                                <td className="px-6 py-4 text-center whitespace-nowrap">{item.quantity}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap capitalize">{order.status}</td>
                                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                                            <button
                                                                onClick={() => goToOrderInfo(order.orderId)}
                                                                className="w-[80px] mt-4 bg-slate-800 hover:bg-slate-700 px-2 transition duration-300 text-white font-semibold py-2 rounded-md"
                                                            >
                                                                <p className="text-sm flex flex-row justify-around">
                                                                    <span className='whitespace-nowrap'>View</span>
                                                                </p>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default withAuth(Orders)