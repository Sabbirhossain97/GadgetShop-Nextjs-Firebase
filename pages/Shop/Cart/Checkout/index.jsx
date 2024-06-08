import React, { useContext, useState } from "react";
import Navbar from "../../../../components/Navigation/Navbar";
import Subnavbar from "../../../../components/Navigation/Subnavbar";
import Footer from "../../../../components/Footer/Footer";
import { Context } from "../../../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { sponsors } from "../../../../helpers/helpers";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment/moment";
import addOrder from "../../../../services/orders/addOrder";
import { message } from 'antd'
import Spinner from "../../../../components/Animation/Spinner";
import withAuth from "../../../../helpers/ProtectedRoutes/withAuth";
import useBreadCrumbNavigation from "../../../../helpers/hooks/useBreadCrumbNavigation";

function Checkout() {
    const getData = useContext(Context);
    const [state, dispatch] = getData?.cartReducer;
    const [user] = getData?.isAuth;
    const [paymentMethod, setPaymentMethod] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("")
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { pathname } = router;
    const breadcrumbNav = useBreadCrumbNavigation(pathname)
    const currentDate = moment().format("MMMM Do YYYY")

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleDeliveryCharge = (event) => {
        if (event.target.value === "home") {
            setDeliveryMethod("home")
        } else {
            setDeliveryMethod("store")
        }
    };

    const handleOrderConfirm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        const { username, email, address, city, country, zip, cardHolderName, cardNumber, expiryDate, cvv, notes } = formDataObj;

        const payload = {
            orderId: uuidv4().replace(/\D/g, '').slice(0, 8),
            status: "pending",
            orderDate: currentDate,
            totalAmount: state?.items?.reduce((acc, currentElm) => acc + (currentElm.quantity * currentElm.price), 0) + (deliveryMethod === "home" ? 2 : 0),
            currency: "USD",
            items: state?.items?.map((product) => {
                return {
                    productId: product.id,
                    productName: product.title,
                    productImage: product.image,
                    quantity: product.quantity,
                    price: product.price,
                    subtotal: product.price * product.quantity
                }
            }),
            shippingAddress: {
                name: username,
                email: email,
                address: address,
                city: city,
                country: country,
                postalCode: zip,
            },
            paymentInfo: paymentMethod === "cash" ? { method: 'Cash on delivery' } : {
                method: paymentMethod,
                transactionId: `txn-${uuidv4().replace(/\D/g, '').slice(0, 6)}`,
                holderName: cardHolderName,
                cardNumber: cardNumber.slice(12),
                expiry: expiryDate,
                CVV: cvv
            },
            deliveryMethod: deliveryMethod,
            notes: notes,
        }
        try {
            setLoading(true)
            setTimeout(() => {
                addOrder(user, payload)
                router.push("/Shop/Cart/Checkout/Success")
                dispatch({ type: "CLEAR_ALL" })
                message.success("Order placed successfully!")
                setLoading(false)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className="min-h-screen bg-white py-40 px-10 md:px-20 lg:px-0 ">
                <div className='flex items-center justify-center py-4'>
                    <Link href="/">
                        <AiFillHome className='hover:text-blue-500 cursor-pointer' />
                    </Link>
                    <span>&nbsp;/&nbsp;</span>
                    <div className='flex space-x-1'>
                        {breadcrumbNav.slice(0, 3).map((route, index) => (
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
                <div >
                    <div className="relative flex flex-col xl:flex-row md:items-start md:justify-center flex-wrap ">
                        {/* form section */}
                        <div className="w-full xl:w-2/5 ml-0 md:mt-4">
                         
                            <form onSubmit={handleOrderConfirm} className="mt-4 border-t border-l border-b border-r border-gray-200 w-full  p-8 bg-white rounded-xl ">
                                <p className="text-gray-800 font-bold text-xl">
                                    Customer information
                                </p>
                                <div className="mt-4">
                                    <label
                                        className="font-semibold block text-sm text-gray-00"
                                        htmlFor="username"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="placeholder:text-sm mt-2 w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="mt-6">
                                    <label
                                        className="font-semibold block text-sm text-gray-600"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="placeholder:text-sm mt-2 w-full px-3  py-1 text-gray-700 bg-gray-200 rounded"
                                        id="email"
                                        name="email"
                                        type="text"
                                        required
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div className="mt-6">
                                    <label
                                        className="font-semibold  block text-sm text-gray-600"
                                        htmlFor="address"
                                    >
                                        Address
                                    </label>
                                    <input
                                        className="placeholder:text-sm mt-2 w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        id="address"
                                        type="text"
                                        name="address"
                                        required
                                        placeholder="Address Line 1"
                                    />
                                </div>
                                <div className="mt-4">
                                    <input
                                        className="placeholder:text-sm w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="inline-block mt-4 w-1/2 pr-1">
                                    <input
                                        className="placeholder:text-sm w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                    />
                                </div>
                                <div className="inline-block mt-2 -mx-0.5 pl-1 w-1/2">
                                    <input
                                        className="placeholder:text-sm w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        type="text"
                                        name="zip"
                                        placeholder="Zip"
                                    />
                                </div>
                                <div>
                                    <p className="pt-8 pb-2 text-gray-800 font-bold text-xl border-b border-gray-200">
                                        Payment Method
                                    </p>
                                    <p className="text-md mt-4 font-semibold">Select a payment method</p>
                                    <div className="pt-4">
                                        <div className="flex items-center mb-4">
                                            <input type="radio" required value="cash" name="payment" id="radio-cash" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" onChange={handlePaymentChange} />
                                            <label htmlFor="radio-cash" required className="ms-2 text-sm font-medium text-gray-900 ">Cash on delivery</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" value="online" name="payment" id="radio-online" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" onChange={handlePaymentChange} />
                                            <label htmlFor="radio-online" className="ms-2 text-sm font-medium text-gray-900 ">Online payment</label>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <p className="font-semibold">We Accept</p>
                                        <div className="flex pt-2">
                                            {sponsors.slice(0, 2).map((item, index) => (
                                                <div key={index}>
                                                    <img src={`/assets/sponsors/${item}.png`} className='cursor-pointer h-8 w-12' />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {paymentMethod === 'online' && (
                                    <div className="mt-4 flex flex-wrap gap-4">
                                        <div className="w-full flex flex-wrap md:flex-nowrap gap-4 ">
                                            <div className="mt-2 w-full md:w-1/2">
                                                <label className="block text-sm font-medium text-gray-700">Cardholder's Name</label>
                                                <input
                                                    type="text"
                                                    name="cardHolderName"
                                                    required
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                    placeholder="Cardholder's Name"
                                                />
                                            </div>
                                            <div className="mt-2 w-full md:w-1/2">
                                                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    minLength={16}
                                                    maxLength={16}
                                                    required
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                    placeholder="Card Number"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-wrap md:flex-nowrap gap-4">
                                            <div className="mt-2 w-full md:w-1/2">
                                                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    required
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div className="mt-2 w-full md:w-1/2">
                                                <label className="block text-sm font-medium text-gray-700">CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    required
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                    placeholder="CVV"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="pt-8 pb-2 text-gray-800 font-bold text-xl border-b border-gray-200">
                                        Delivery Method
                                    </p>
                                    <p className="text-md mt-4 font-semibold">Select a delivery method</p>
                                    <div className="pt-4">
                                        <div className="flex items-center mb-4">
                                            <input type="radio" required value="home" name="delivery" id="radio-home" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" onChange={handleDeliveryCharge} />
                                            <label htmlFor="radio-home" className="ms-2 text-sm font-medium text-gray-900 ">Home delivery</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" required value="store" name="delivery" id="radio-store" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" onChange={handleDeliveryCharge} />
                                            <label htmlFor="radio-store" className="ms-2 text-sm font-medium text-gray-900 ">Store pickup</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-6 w-full">
                                        <p className="text-md mt-4 font-semibold">Notes <span className="font-normal">(Optional)</span></p>
                                        <textarea
                                            type="text"
                                            name="notes"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 flex">
                                    <button
                                        className="text-sm flex items-center font-semibold px-4 py-2 text-white  bg-slate-800 hover:bg-slate-700 rounded-md"
                                        type="submit"
                                    >
                                        {loading ? <><Spinner />Processing...</> : "Confirm Payment"}
                                    </button>
                                    <Link href="/">
                                        <button
                                            className="text-sm ml-4 font-semibold px-4 py-2 text-white  bg-slate-800 hover:bg-slate-700 rounded-md"
                                            type="submit"
                                        >
                                            Cancel
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>

                        {/*order summary section */}

                        <div className="border w-full xl:w-1/3  bg-white border-gray-200 min-h-[610px] rounded-xl xl:ml-24 ml-0 mt-8">
                            <h1 className="py-4 border-b-2 text-xl text-gray-600 px-10 ">
                                Order Summary
                            </h1>
                            <div className="h-[340px] overflow-y-auto">
                                <ul className=" py-16  space-y-6 px-8  ">
                                    {state.items
                                        ? state.items.map((item, key) => (
                                            <li
                                                key={key}
                                                className="grid grid-cols-6 gap-2 border-b-1"
                                            >
                                                <div className="col-span-1 ">
                                                    <img
                                                        src={item.image}
                                                        alt="Product"
                                                        className="rounded w-full   "
                                                    />
                                                </div>
                                                <div className="flex flex-col col-span-3 pt-2 ml-4">
                                                    <span className="text-gray-600 text-md font-semi-bold">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-gray-400 text-sm inline-block pt-2">
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <div className="col-span-2 pt-3">
                                                    <div className="flex items-center space-x-2 text-sm justify-between">
                                                        <span className="text-gray-400">
                                                            {item.quantity} x ${item.price}
                                                        </span>
                                                        <span className=" font-semibold inline-block">
                                                            ${(item.quantity * item.price)}
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
                                        {state.items
                                            ? state.items
                                                .reduce(
                                                    (acm, currentElm) =>
                                                        acm + currentElm.price * currentElm.quantity,
                                                    0
                                                )

                                            : ""}
                                    </span>
                                </div>
                                {deliveryMethod === "home" ? <div className="flex justify-between py-4 text-gray-600">
                                    <span>Home Delivery </span>
                                    <span className="font-semibold ">
                                        ${2}
                                    </span>
                                </div> :
                                    <div className="flex justify-between py-4 text-gray-600">
                                        <span>Store Pickup </span>
                                        <span className="font-semibold ">
                                            ${0}
                                        </span>
                                    </div>
                                }

                            </div>
                            <div className="font-semibold text-xl px-8 flex justify-between py-4 text-gray-600">
                                <span>Total</span>
                                <span>
                                    $
                                    {state.items
                                        ? state.items
                                            .reduce(
                                                (acm, currentElm) =>
                                                    acm + currentElm.price * currentElm.quantity,
                                                0
                                            ) + (deliveryMethod === "home" ? 2 : 0)
                                        : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default withAuth(Checkout)