import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import { Context } from '../../context'
import Subnavbar from '../../components/Navigation/Subnavbar'
import Footer from '../../components/Footer/Footer'
import { FaAddressBook } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from 'next/link';
import { useRouter } from 'next/router'
import { AiFillHome } from "react-icons/ai";
import useBreadCrumbNavigation from '../../helpers/hooks/useBreadCrumbNavigation'
import { getUserProvider } from '../../helpers/auth/authHelpers'
import { deleteUserData } from '../../services/profile/deleteUser'
import { Modal } from 'antd'
import { reauthenticateWithPopup, EmailAuthProvider, reauthenticateWithCredential, deleteUser, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import Spinner from '../../components/Animation/Spinner'
import { RxAvatar } from "react-icons/rx";
import { getAuth } from 'firebase/auth';

function index() {
    const getData = useContext(Context);
    const [user] = getData?.isAuth;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { pathname } = router;
    const [loading, setLoading] = useState(false);
    const breadcrumbNav = useBreadCrumbNavigation(pathname)
    const [provider, setProvider] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchProvider = async () => {
            const providerId = await getUserProvider();
            setProvider(providerId);
        };
        fetchProvider();
    }, []);

    const isEmailProvider = provider === 'password';

    async function deleteAccount() {
        setLoading(true)
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setLoading(false);
            return;
        }

        if (user) {
            const userId = user.uid;
            try {
                if (provider === EmailAuthProvider.PROVIDER_ID) {
                    const credential = EmailAuthProvider.credential(email, password);
                    await reauthenticateWithCredential(user, credential);
                } else if (provider === GoogleAuthProvider.PROVIDER_ID) {
                    const googleProvider = new GoogleAuthProvider();
                    await reauthenticateWithPopup(user, googleProvider);
                } else if (provider === FacebookAuthProvider.PROVIDER_ID) {
                    const facebookProvider = new FacebookAuthProvider();
                    await reauthenticateWithPopup(user, facebookProvider);
                } else {
                    throw new Error('Unsupported authentication provider');
                }
                await deleteUserData(userId);
                await deleteUser(user)
                router.push("/")
            } catch (error) {
                console.error('Error deleting account: ', error);
            } finally {
                setLoading(false);

            }
        } else {
            console.log('No user is currently signed in');
        }
    }

    const handleDeleteAccount = () => {
        if (provider === "password") {
            setIsModalOpen(true)
        } else {
            deleteAccount()
        }
    }

    console.log(user)

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
                                        {index < breadcrumbNav.length - 2 && (
                                            <span>&nbsp;/</span>
                                        )}
                                    </p>
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        {user && <div className="flex gap-4 items-center text-left w-full mb-5">
                            {user.photoURL ?
                                <img
                                    className="h-20 w-20 rounded-full border object-cover"
                                    src={user.photoURL}
                                    alt="avatar"
                                /> :
                                <RxAvatar className='text-7xl' />}
                            <h1 className="text-xl font-semibold title-font text-gray-900">Hello, <br /> {user.displayName}</h1>
                        </div>
                        }
                        <div className="flex flex-wrap -m-4 text-center">
                            <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                <Link href="/Profile/Orders">
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
                                <Link href="/Profile/Wishlist">
                                    <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                        <FaRegHeart className='w-10 h-10 mb-3 inline-block text-blue-700' />
                                        <h2 className="title-font font-medium text-lg text-gray-900">Wishlists</h2>
                                    </div>
                                </Link>
                            </div>
                            {isEmailProvider && (
                                <>
                                    <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                        <Link href="/Profile/Password">
                                            <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                                <RiLockPasswordFill className="w-10 h-10 mb-3 inline-block text-blue-700" />
                                                <h2 className="title-font font-medium text-lg text-gray-900">Change Password</h2>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                        <Link href="/Profile/Edit">
                                            <div className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                                <RxAvatar className="w-10 h-10 mb-3 inline-block text-blue-700" />
                                                <h2 className="title-font font-medium text-lg text-gray-900">Edit Profile</h2>
                                            </div>
                                        </Link>
                                    </div>
                                </>
                            )}
                            <div className="p-4 sm:w-1/2 md:w-1/3 xl:w-1/4 w-full">
                                <div onClick={handleDeleteAccount} className="cursor-pointer border border-gray-300 hover:border-blue-700 hover:shadow-lg transition duration-300 px-4 py-10 rounded-lg">
                                    <MdDelete className='w-10 h-10 mb-3 inline-block text-blue-700' />
                                    <h2 className="title-font font-medium text-lg text-gray-900">Delete Account</h2>
                                </div>
                            </div>
                            <Modal
                                open={isModalOpen}
                                onCancel={() => setIsModalOpen(false)}
                                footer={null}
                            >
                                <div className={`w-full relative p-6 bg-white rounded-lg md:mt-0 sm:max-w-md sm:p-8`}>
                                    <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                        Delete your account
                                    </h2>
                                    <form className="max-w-sm mx-auto py-6" >
                                        <div className="mb-5 mt-4">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                        </div>

                                        <button type="button" onClick={deleteAccount} className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">{loading ? <p className="flex justify-center items-center"><Spinner /> Processing...</p> : "Delete Account"}</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default index