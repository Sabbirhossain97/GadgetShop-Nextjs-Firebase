import { useState, useEffect } from 'react'
import products from "../products.json"
import Link from "next/link";

function Subnavbar() {
    const [categories, setCategories] = useState([]);

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
        <div className='py-4 shadow-lg fixed top-16 left-0 right-0 z-10 bg-white'>
            <ul class="flex flex-wrap items-center justify-center text-gray-900 font-semibold ">
                {categories.map((category) =>
                    <li>
                        <Link href="/Products">
                            <p className="me-4 cursor-pointer hover:text-blue-500 transition duration-300 md:me-6 ">{category}</p>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Subnavbar