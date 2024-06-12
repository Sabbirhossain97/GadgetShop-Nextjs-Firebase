import { useState, useEffect, useContext } from 'react'
import products from "../../products.json"
import Link from "next/link";
import { Context } from '../../context';

function Subnavbar() {
    const [categories, setCategories] = useState([]);
    const getData = useContext(Context);
    const [isCategorySidebarOpen, setIsCategorySidebarOpen] = getData?.categorySidebar;


    useEffect(() => {
        const allCategories = [];
        products.forEach(product => {
            if (!allCategories.includes(product.category)) {
                allCategories.push(product.category);
            }
        });
        setCategories(allCategories)
    }, [])

    return (
        <>
            <div className='hidden py-4 shadow-lg xl:block fixed top-16 left-0 right-0 z-10 bg-white'>
                <ul className="flex flex-wrap items-center justify-center text-gray-900 font-semibold ">
                    {categories.map((category, index) =>
                        <li key={index}>
                            <Link href="/Products">
                                <p className="me-4 cursor-pointer hover:text-blue-500 transition duration-300 md:me-6 ">{category}</p>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <div className={`${isCategorySidebarOpen ? "translate-x-0" : '-translate-x-full'} px-4 transiton duration-300 fixed left-0 top-0 bottom-0 z-20 bg-white shadow-2xl drop-shadow-2xl`}>
                <svg
                    className="h-8 w-8 absolute right-2 top-4 hover:bg-gray-200 transition duration-300 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    onClick={() => setIsCategorySidebarOpen(!isCategorySidebarOpen)}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>

                <ul className="flex flex-col justify-center px-2 py-4 text-gray-900 font-semibold mt-10">
                    {categories.map((category, index) =>
                        <li key={index} className='border-b border-gray-300 py-3'>
                            <Link href="/Products">
                                <p className="me-4 text-lg cursor-pointer hover:text-blue-500 transition duration-300 md:me-6 ">{category}</p>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default Subnavbar