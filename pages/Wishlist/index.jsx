import { useContext } from 'react';
import { Context } from '../../context';
import Navbar from '../../components/Navigation/Navbar';
import Subnavbar from '../../components/Navigation/Subnavbar';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer/Footer';
import { handleCartAction } from '../../helpers/addToCart';
import { handleDeleteItem } from '../../services/wishlist/deleteFromWishlist';

function Wishlist() {
    const router = useRouter()
    const getData = useContext(Context);
    const [wishlist] = getData?.wishlistData
    const [user] = getData?.isAuth;
    const [, dispatch] = getData?.cartReducer;

    const handleSignIn = () => {
        router.push('/Signin')
    }

    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen max-w-[1500px] mx-auto py-10 xl:py-10 px-10 mt-24'>
                <div>
                    <h1 className={`text-3xl font-semibold py-2 ${wishlist.length === 0 && 'border-b-2'} `}>My Wishlist</h1>
                    <div className='pt-5 relative'>
                        <div className='w-full overflow-auto'>
                            {
                                wishlist.length === 0 ?
                                    <>
                                        <div className='flex justify-center'>
                                            <img src="/assets/wishlist.png" />
                                        </div>
                                        <div className='text-center text-xl'>
                                            <h1>You haven't saved anything yet.</h1>
                                        </div>
                                        <div className='flex justify-center'>
                                            <button
                                                onClick={handleSignIn}
                                                className="w-[150px] rounded-md mt-4 bg-slate-800 hover:bg-slate-700 px-4 transition duration-300 text-white font-bold py-2 "
                                            >
                                                <p className="text-lg flex flex-row justify-around">
                                                    <span className='whitespace-nowrap'>Sign in</span>
                                                </p>
                                            </button>
                                        </div>
                                    </>

                                    :
                                    <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-900 uppercase border">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Product Image
                                                </th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Product Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Unit Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Stock
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='border text-black'>
                                            {wishlist && wishlist.map((item, index) => (
                                                <tr key={index} className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4">
                                                        <img src={item.image} className='w-20 h-20' />
                                                    </th>
                                                    <td className="px-6 py-4 whitespace-nowrap ">
                                                        {item.title}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        ${item.price}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-green-500">
                                                        In Stock
                                                    </td>
                                                    <td className="px-6 py-4 flex justify-center gap-4">
                                                        <button
                                                            onClick={(e) => { handleCartAction(user, item.id, router, dispatch) }}
                                                            className="w-[120px] mt-4 bg-slate-800 hover:bg-slate-700 px-2 transition duration-300 text-white font-semibold py-2 rounded-md"
                                                        >
                                                            <p className="text-sm flex flex-row justify-around">
                                                                <span className='whitespace-nowrap'>Add to cart </span>
                                                            </p>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(user, item.id)}
                                                            className="w-[100px] mt-4 bg-red-600 hover:bg-red-700 px-2 transition duration-300 text-white font-semibold py-2 rounded-md"
                                                        >
                                                            <p className="text-sm flex flex-row justify-around">
                                                                <span className='whitespace-nowrap'>Delete </span>
                                                            </p>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Wishlist;