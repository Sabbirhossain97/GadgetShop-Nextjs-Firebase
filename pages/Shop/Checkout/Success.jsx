import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../../components/Navigation/Navbar';
import Subnavbar from '../../../components/Navigation/Subnavbar';
import Footer from '../../../components/Footer/Footer';
import { Context } from '../../../context';
import { db } from '../../../services/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

function Success() {
    const getData = useContext(Context);
    const [user] = getData?.isAuth;
    const [orderList, setOrderList] = useState(null)

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
                        setOrderList(orders?.[0]);
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

    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen max-w-[1500px] mx-auto py-10 xl:py-10 px-10 mt-24'>
                <section className="bg-white py-8 antialiased md:py-16">
                    <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl mb-2">Thanks for your order!</h2>
                        <p className="text-gray-900 mb-6 md:mb-8">Your order <a href="#" className="font-bold text-gray-900">#{orderList.orderId}</a> will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
                        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-300 bg-gray-50 p-6 mb-6 md:mb-8">
                            <dl className="sm:flex items-center justify-between gap-4">
                                <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Date</dt>
                                <dd className="font-medium text-gray-900 sm:text-end">{orderList.orderDate}</dd>
                            </dl>
                            <dl className="sm:flex items-center justify-between gap-4">
                                <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Payment Method</dt>
                                <dd className="font-medium text-gray-900 sm:text-end">{orderList.paymentInfo.method}</dd>
                            </dl>
                            <dl className="sm:flex items-center justify-between gap-4">
                                <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Name</dt>
                                <dd className="font-medium text-gray-900 sm:text-end">{orderList.shippingAddress.name}</dd>
                            </dl>
                            <dl className="sm:flex items-center justify-between gap-4">
                                <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Address</dt>
                                <dd className="font-medium text-gray-900 sm:text-end">{orderList.shippingAddress.address}, {orderList.shippingAddress.city}, {orderList.shippingAddress.country}</dd>
                            </dl>
                            <dl className="sm:flex items-center justify-between gap-4">
                                <dt className="font-semibold mb-1 sm:mb-0 text-gray-900">Phone</dt>
                                <dd className="font-medium text-gray-900 sm:text-end">+(123) 456 7890</dd>
                            </dl>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="bg-gray-800 text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Track your order</a>
                            <a href="#" className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-gray-800 rounded-lg border border-gray-200 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Return to shopping</a>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Success