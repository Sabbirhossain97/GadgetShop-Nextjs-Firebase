import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import products from "../products.json"

function getCategories(products) {
    const categories = [];
    products.forEach(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    return categories;
}

function Products() {

    const [productList, setProductList] = useState(products);
    const [filters, setFilters] = useState({
        category: [],
        sort: ""
    })
    const categories = getCategories(products);
    const [isSortOpen, setIsSortOpen] = useState(false)

    const handleCategory = (e) => {
        if (!filters.category.includes(e.target.value)) {
            setFilters({ ...filters, category: [...filters.category, e.target.value] })
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                category: prevFilters.category.filter(category => category !== e.target.value)
            }))
        }
    }

    useEffect(() => {
        if (filters.category.length > 0) {
            const filteredProductCategory = products.map((product) => {
                if (filters.category.includes(product.category)) {
                    return product
                }
            })
            setProductList(filteredProductCategory.filter((item) => item !== undefined))
        } else if (filters.category.length === 0) {
            setProductList(products)
        }
        if (filters.sort === "Price: Low to High") {
            const productsAsc = productList.sort((a, b) => a.price - b.price);
            setProductList(productsAsc)
        }
        if (filters.sort === "Price: High to Low") {
            const productsAsc = productList.sort((a, b) => b.price - a.price);
            setProductList(productsAsc)
        }
    }, [filters.category, filters.sort])

    console.log(filters)

    return (
        <div>
            <Navbar />
            <div className="h-screen">
                <div class="bg-white">
                    <div>
                        {/* mobile section */}
                        {/* <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
                            <div class="fixed inset-0 bg-black bg-opacity-25"></div>
                            <div class="fixed inset-0 z-40 flex">
                                <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div class="flex items-center justify-between px-4">
                                        <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                                        <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                                            <span class="sr-only">Close menu</span>
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <form class="mt-4 border-t border-gray-200">
                                        <h3 class="sr-only">Categories</h3>
                                        <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                                            <li>
                                                <a href="#" class="block px-2 py-3">Totes</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block px-2 py-3">Backpacks</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block px-2 py-3">Travel Bags</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block px-2 py-3">Hip Bags</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block px-2 py-3">Laptop Sleeves</a>
                                            </li>
                                        </ul>

                                        <div class="border-t border-gray-200 px-4 py-6">
                                            <h3 class="-mx-2 -my-3 flow-root">
                                                <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                                                    <span class="font-medium text-gray-900">Color</span>
                                                    <span class="ml-6 flex items-center">
                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                        </svg>
                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </h3>
                                            <div class="pt-6" id="filter-section-mobile-0">
                                                <div class="space-y-6">
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-color-0" class="ml-3 min-w-0 flex-1 text-gray-500">White</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-color-1" class="ml-3 min-w-0 flex-1 text-gray-500">Beige</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-color-2" class="ml-3 min-w-0 flex-1 text-gray-500">Blue</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-color-3" class="ml-3 min-w-0 flex-1 text-gray-500">Brown</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-color-4" class="ml-3 min-w-0 flex-1 text-gray-500">Green</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-color-5" class="ml-3 min-w-0 flex-1 text-gray-500">Purple</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="border-t border-gray-200 px-4 py-6">
                                            <h3 class="-mx-2 -my-3 flow-root">
                                                <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
                                                    <span class="font-medium text-gray-900">Category</span>
                                                    <span class="ml-6 flex items-center">
                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                        </svg>
                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </h3>
                                            <div class="pt-6" id="filter-section-mobile-1">
                                                <div class="space-y-6">
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-category-0" name="category[]" value="new-arrivals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-category-0" class="ml-3 min-w-0 flex-1 text-gray-500">New Arrivals</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-category-1" name="category[]" value="sale" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-category-1" class="ml-3 min-w-0 flex-1 text-gray-500">Sale</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-category-2" name="category[]" value="travel" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-category-2" class="ml-3 min-w-0 flex-1 text-gray-500">Travel</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-category-3" name="category[]" value="organization" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-category-3" class="ml-3 min-w-0 flex-1 text-gray-500">Organization</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="filter-mobile-category-4" name="category[]" value="accessories" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-mobile-category-4" class="ml-3 min-w-0 flex-1 text-gray-500">Accessories</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                    
                                    </form>
                                </div>
                            </div>
                        </div> */}
                        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                                <h1 class="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
                                <div class="flex items-center">
                                </div>
                            </div>
                            <section aria-labelledby="products-heading" class="pb-24 pt-6 ">
                                <h2 id="products-heading" class="sr-only">Products</h2>
                                <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
                                    <form class="hidden lg:block">
                                        <h3 class="sr-only">Categories</h3>

                                        <div class="border-b border-gray-200 py-6">
                                            <h3 class="-my-3 flow-root">
                                                <button type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                    <span class="font-medium text-gray-900">Category</span>
                                                </button>
                                            </h3>
                                            <div class="pt-6" id="filter-section-1">
                                                <div class="space-y-4">
                                                    {categories.map((category) => (
                                                        <div class="flex items-center">
                                                            <input onChange={(e) => handleCategory(e)} id="filter-category-0" name="category" value={category} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                            <label for="filter-category-0" className="ml-3 text-sm text-gray-600">{category}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="border-b border-gray-200 py-6">
                                            <h3 class="-my-3 flow-root">
                                                <button type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                    <span class="font-medium text-gray-900">Sort By</span>
                                                </button>
                                            </h3>
                                            <div class="pt-6" id="filter-section-1">
                                                <div class="space-y-4">
                                                    <div class="flex items-center">
                                                        <input onChange={(e) => setFilters({ ...filters, sort: e.target.value })} id="filter-category-0" name="category" value="Price: Low to High" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-category-0" className="ml-3 text-sm text-gray-600">Price: Low to High</label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input onChange={(e) => setFilters({ ...filters, sort: e.target.value })} id="filter-category-0" name="category" value="Price: High to Low" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-category-0" className="ml-3 text-sm text-gray-600">Price: High to Low</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="grid grid-cols-4 gap-y-8 gap-x-2 col-span-3">
                                        {productList
                                            ? productList.map((item, key) => (
                                                <div
                                                    key={key}
                                                    className="relative mx-auto p-4 group border rounded-lg shadow-lg md:w-11/12 w-3/4 h-96 hover:shadow-xl transition duration-300 flex flex-col items-center justify-center"
                                                >
                                                    <div
                                                        className="cursor-pointer flex flex-col items-center justify-center"
                                                    >
                                                        <div className=" overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
                                                            <img
                                                                src={item.image}
                                                                alt="error"
                                                                className="h-32 w-full object-contain object-center group-hover:opacity-75"
                                                            />
                                                        </div>
                                                        <hr className="mt-4 bg-gray-300 w-full"></hr>
                                                        <h3 className="mt-4 text-sm font-semibold text-gray-900 text-center">
                                                            {item.title}
                                                        </h3>
                                                        <p className="mt-4 text-lg  text-gray-500">${item.price}</p>
                                                    </div>
                                                    <div className="flex flex-row w-[150px] relative ">
                                                        <button
                                                            className="w-full mt-4 bg-slate-800 hover:bg-slate-700 px-2  text-white font-bold py-2 rounded-md"
                                                        >
                                                            <p className="text-sm flex flex-row justify-around">
                                                                <span>Add to cart </span>
                                                                <span>
                                                                    {/* <AiOutlineShoppingCart className="mt-1 absolute right-4" /> */}
                                                                </span>
                                                            </p>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                            : ""}
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Products