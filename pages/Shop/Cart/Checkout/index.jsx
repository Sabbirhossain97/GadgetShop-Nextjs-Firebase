import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../../../components/Navigation/Navbar";
import Subnavbar from "../../../../components/Navigation/Subnavbar";
import Footer from "../../../../components/Footer/Footer";
import { Context } from "../../../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { sponsors } from "../../../../helpers/static/static";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment/moment";
import addOrder from "../../../../services/orders/addOrder";
import { message } from 'antd'
import Spinner from "../../../../components/Animation/Spinner";
import withAuth from "../../../../helpers/ProtectedRoutes/withAuth";
import useBreadCrumbNavigation from "../../../../helpers/hooks/useBreadCrumbNavigation";
import { CgSpinner } from "react-icons/cg";
import getAddressData from "../../../../services/address/getAddress";
import { db } from "../../../../services/firebase";
import { FaAddressBook } from "react-icons/fa";
import { Modal } from "antd";
import { clearCart } from "../../../../services/cart/deleteAllCartItems";

function Checkout() {
    const { cartData, isAuth } = useContext(Context);
    const [cartItems] = cartData
    const [user] = isAuth;
    const [paymentMethod, setPaymentMethod] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("")
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false)
    const [addressData, setAddressData] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
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
            totalAmount: cartItems?.reduce((acc, currentElm) => acc + (currentElm.quantity * currentElm.price), 0) + (deliveryMethod === "home" ? 2 : 0),
            currency: "USD",
            items: cartItems?.map((product) => {
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
                clearCart(user)
                message.success("Order placed successfully!")
                setLoading(false)
            }, 2000)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAddressData(db, user, setAddressData);
    }, [user]);


    const getUserDefaultAddress = () => {
        const getDefaultAddress = addressData.find((item) => item.isDefault === "yes");
        setDefaultAddress(getDefaultAddress)
    }

    useEffect(() => {
        if (addressData && addressData.length > 0) {
            setFormLoading(true)
            setTimeout(() => {
                getUserDefaultAddress();
                setFormLoading(false)
            }, 1500)
        }
    }, [addressData])

    const handleAddressSelect = (addressId) => {
        setSelectedAddressId(addressId)
    }

    const saveSelectedAddress = () => {
        setFormLoading(true)
        setIsModalOpen(!isModalOpen)
        setTimeout(() => {
            const selectedAddress = addressData.find((item) => item.id === selectedAddressId);
            setDefaultAddress(selectedAddress)
            message.success('Address changed successfully!')
            setFormLoading(false)
        }, 1500)
    }

    return (
        <div>
            <Navbar />
            <Subnavbar />
            {loading && <div className="fixed inset-0 bg-opacity-75 bg-white z-50">
                <CgSpinner className="text-4xl animate-spin text-blue-500 top-1/2 left-1/2 absolute" />
            </div>}
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

                            <form onSubmit={handleOrderConfirm} className={`${formLoading && "opacity-50"} relative mt-4 border-t border-l border-b border-r border-gray-200 w-full p-8 bg-white rounded-xl`}>
                                {formLoading && <CgSpinner className="text-4xl animate-spin text-blue-400 top-1/2 left-1/2 absolute" />}
                                <p className="text-gray-800 font-bold text-xl">
                                    Customer Information
                                </p>
                                <div className="mt-4">
                                    <label
                                        className="font-semibold block text-sm text-gray-00"
                                        htmlFor="username"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="placeholder:text-sm mt-2 w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        id="username"
                                        name="username"
                                        type="text"
                                        defaultValue={defaultAddress?.username}
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
                                        className="placeholder:text-sm mt-2 w-full px-3  py-2 text-gray-700 bg-gray-200 rounded"
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={user?.email}
                                        required
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center justify-between">
                                        <label
                                            className="font-semibold block text-sm text-gray-600"
                                            htmlFor="address"
                                        >
                                            Address
                                        </label>
                                        <button type="button" onClick={() => setIsModalOpen(!isModalOpen)} className="group font-semibold items-center text-sm text-gray-600 flex gap-1">
                                            <FaAddressBook className="text-blue-500" />
                                            <span className="group-hover:text-blue-500">Change Address</span>
                                        </button>

                                    </div>
                                    <input
                                        className="placeholder:text-sm mt-2 w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        id="address"
                                        type="text"
                                        name="address"
                                        defaultValue={defaultAddress?.address}
                                        required
                                        placeholder="Address Line 1"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="font-semibold block text-sm text-gray-600"
                                        htmlFor="city"
                                    >
                                        City
                                    </label>
                                    <input
                                        className="placeholder:text-sm w-full mt-2 px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        id="city"
                                        type="text"
                                        name="city"
                                        defaultValue={defaultAddress?.city}
                                        placeholder="City"
                                        required
                                    />
                                </div>
                                <div className="inline-block mt-4 w-full md:w-1/2 pr-1">
                                    <label
                                        className="font-semibold block text-sm text-gray-600"
                                        htmlFor="country"
                                    >
                                        Country
                                    </label>
                                    <input
                                        className="placeholder:text-sm w-full mt-2 px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        id="country"
                                        type="text"
                                        name="country"
                                        defaultValue={defaultAddress?.country}
                                        placeholder="Country"
                                        required
                                    />
                                </div>
                                <div className="inline-block mt-4 md:mt-2 -mx-0.5 pl-1 w-full md:w-1/2">
                                    <label
                                        className="font-semibold block text-sm text-gray-600"
                                        htmlFor="zip"
                                    >
                                        Zip/Postcode
                                    </label>
                                    <input
                                        className="placeholder:text-sm w-full mt-2 px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        id="zip"
                                        type="text"
                                        name="zip"
                                        defaultValue={defaultAddress?.postcode}
                                        placeholder="Zip/Postcode"
                                        required
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

                        <Modal
                            open={isModalOpen}
                            onCancel={() => {
                                setIsModalOpen(!isModalOpen)
                                setSelectedAddressId(null);
                            }
                            }
                            footer={null}
                        >
                            {addressData && addressData.length > 0 ?
                                <>
                                    <div className="mt-10 min-h-[350px] overflow-y-auto">
                                        <p className="font-inter font-semibold block text-md text-gray-600">Select an address to continue</p>
                                        <ul className='flex flex-col gap-6 pt-4'>
                                            {addressData && addressData.map((addressInfo, index) => (
                                                <li key={index} onClick={() => handleAddressSelect(addressInfo.id)} className={`cursor-pointer text-black border ${selectedAddressId === addressInfo.id ? 'border-blue-400' : 'border-gray-200'} py-4 rounded-md shadow-sm hover:shadow-md transition duration-300 flex justify-between`}>
                                                    <div>
                                                        <p className='pl-8'>
                                                            {addressInfo.username}, {addressInfo.address}, {addressInfo.city} - {addressInfo.postcode}, {addressInfo.country}
                                                            {addressInfo.isDefault === "yes" &&
                                                                <span className='ml-2 leading-8 border py-1 px-2 bg-green-500 text-sm text-white rounded-md'>Default</span>
                                                            }
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-4 flex justify-end">
                                        <button
                                            onClick={() => {
                                                setSelectedAddressId(null);
                                                setIsModalOpen(!isModalOpen)
                                            }}
                                            className="text-sm ml-4 font-semibold px-6 py-2 text-white bg-red-600 hover:bg-red-500 rounded-md"
                                        >
                                            <span>Cancel</span>
                                        </button>
                                        <button
                                            onClick={saveSelectedAddress}
                                            className="text-sm ml-4 font-semibold px-8 py-2 text-white bg-slate-800 hover:bg-slate-700 rounded-md"
                                        >
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </>
                                :
                                <div className="py-10 flex gap-6 flex-col items-center">
                                    <p className="text-xl"> You have no saved address!</p>
                                    <Link href="/Profile/Address/Add">
                                        <button
                                            className="text-sm ml-4 font-semibold px-8 py-2 text-white bg-slate-800 hover:bg-slate-700 rounded-md"
                                        >
                                            <span>Add New Address</span>
                                        </button>
                                    </Link>
                                </div>}
                        </Modal>

                        {/*order summary section */}

                        <div className="border w-full xl:w-1/3  bg-white border-gray-200 min-h-[610px] rounded-xl xl:ml-24 ml-0 mt-8">
                            <h1 className="py-4 border-b-2 text-xl text-gray-600 px-10 ">
                                Order Summary
                            </h1>
                            <div className="h-[340px] overflow-y-auto">
                                <ul className=" py-16  space-y-6 px-8  ">
                                    {cartItems
                                        ? cartItems.map((item, key) => (
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
                                        {cartItems
                                            ? cartItems
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
                                    {cartItems
                                        ? cartItems
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