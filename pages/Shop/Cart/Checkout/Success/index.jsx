import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../../../../components/Navigation/Navbar';
import Subnavbar from '../../../../../components/Navigation/Subnavbar';
import Footer from '../../../../../components/Footer/Footer';
import { Context } from '../../../../../context';
import { db } from '../../../../../services/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import withAuth from '../../../../../helpers/ProtectedRoutes/withAuth';
import { AiFillHome } from "react-icons/ai";
import useBreadCrumbNavigation from '../../../../../helpers/hooks/useBreadCrumbNavigation';
import { useRouter } from "next/router";

function Success() {
    const getData = useContext(Context);
    const [user] = getData?.isAuth;
    const [orderList, setOrderList] = useState(null);
    const router = useRouter();
    const { pathname } = router;
    const breadcrumbNav = useBreadCrumbNavigation(pathname)

    useEffect(() => {
        const getOrderData = async () => {
            if (!user) {
                setOrderList([])
                return
            }
            try {
                if (!db) {
                    console.error('Firestore is not initialized.');
                    return;
                }
                const orderRef = collection(db, 'orders');
                if (!orderRef) {
                    console.error('Order does not exist.');
                    return;
                }
                const q = query(orderRef, where('userId', '==', user.uid));
                onSnapshot(q, (snapshot) => {
                    const orderData = [];
                    snapshot.forEach((doc) => {
                        orderData.push({ id: doc.id, ...doc.data() });
                    });
                    if (orderData.length > 0) {
                        const { orders } = orderData?.[0];
                        setOrderList(orders?.[orders.length - 1]);
                    } else {
                        setOrderList([]);
                    }
                });
            } catch (error) {
                console.error('Error fetching Orders:', error);
            }
        };
        getOrderData();
    }, [user]);

    console.log(breadcrumbNav)

    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen max-w-[1500px] mx-auto py-10 xl:py-10 px-10 mt-24'>
                <div className='flex items-center justify-center py-4'>
                    <Link href="/">
                        <AiFillHome className='hover:text-blue-500 cursor-pointer' />
                    </Link>
                    <span>&nbsp;/&nbsp;</span>
                    <div className='flex space-x-1'>
                        {breadcrumbNav.slice(0, 4).map((route, index) => (
                            <React.Fragment key={route.href}>
                                {index > 0 && <Link href={route.href}>
                                    <p className="hover:text-blue-500">{route.name}
                                        {index < breadcrumbNav.length - 1 && (
                                            <span>&nbsp;/</span>
                                        )}
                                    </p>
                                </Link>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                {orderList &&
                    <section className="bg-white py-8 antialiased md:py-16 flex flex-wrap lg:flex-nowrap gap-8">
                        <div className="mx-auto w-full lg:w-1/2 px-0 2xl:px-0 ">
                            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl mb-2">Thanks for your order!</h2>
                            <p className="text-gray-900 mb-6 md:mb-8">Your order <a href="#" className="font-bold text-gray-900">#{orderList?.orderId}</a> will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
                            <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-300 bg-gray-50 p-6 mb-6 md:mb-8">
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Date</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderList?.orderDate}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Payment Method</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderList?.paymentInfo?.method}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Name</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderList?.shippingAddress?.name}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Address</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderList?.shippingAddress?.address}, {orderList?.shippingAddress?.city}, {orderList?.shippingAddress?.country}</dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Email</dt>
                                    <dd className="font-medium text-gray-900 sm:text-end">{orderList?.shippingAddress?.email}</dd>
                                </dl>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href="/">
                                    <button className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-gray-800 hover:bg-gray-700 transition duration-300 rounded-lg border border-gray-200 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Return to shopping</button>
                                </Link>
                            </div>
                        </div>
                        {/* order summary section */}
                        <div className="border w-full lg:w-1/2 bg-white border-gray-200 min-h-[610px] rounded-xl ml-0">
                            <h1 className="py-4 border-b-2 text-xl text-gray-600 px-10 ">
                                Order Summary
                            </h1>
                            <div className="h-[340px] overflow-y-auto">
                                <ul className=" py-16  space-y-6 px-8  ">
                                    {orderList?.items
                                        ? orderList?.items.map((item, key) => (
                                            <li
                                                key={key}
                                                className="grid grid-cols-6 gap-2 border-b-1"
                                            >
                                                <div className="col-span-1">
                                                    <img
                                                        src={item.productImage}
                                                        alt="Product"
                                                        className="rounded w-full   "
                                                    />
                                                </div>
                                                <div className="flex flex-col col-span-3 pt-2 ml-0">
                                                    <span className="text-gray-600 text-sm md:text-md font-semi-bold">
                                                        {item.productName}
                                                    </span>
                                                </div>
                                                <div className="col-span-2 pt-3">
                                                    <div className="flex items-center space-x-2 text-sm justify-between">
                                                        <span className="text-gray-400">
                                                            {item.quantity} x ${item.price}
                                                        </span>
                                                        <span className=" font-semibold inline-block">
                                                            ${item.subtotal}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                        : ""}
                                </ul>
                            </div>
                            <div className="px-8 border-b border-t border-gray-200 py-4">
                                <div className="flex justify-between py-4 text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold ">
                                        $
                                        {orderList?.items
                                            ? orderList?.items
                                                .reduce(
                                                    (acm, currentElm) =>
                                                        acm + currentElm.price * currentElm.quantity,
                                                    0
                                                )

                                            : ""}
                                    </span>
                                </div>
                                {orderList?.deliveryMethod === "home" ? <div className="flex justify-between py-4 text-gray-600">
                                    <span>Home Delivery </span>
                                    <span className="font-semibold ">
                                        ${2}
                                    </span>
                                </div>
                                    :
                                    <div className="flex justify-between py-4 text-gray-600">
                                        <span>Store Pickup </span>
                                        <span className="font-semibold ">
                                            ${0}
                                        </span>
                                    </div>}

                            </div>
                            <div className="font-semibold text-xl px-8 flex justify-between py-4 text-gray-600">
                                <span>Total</span>
                                <span>
                                    $
                                    {orderList?.totalAmount}
                                </span>
                            </div>
                        </div>
                    </section>}
            </div>
            <Footer />
        </div>
    )
}

export default withAuth(Success)