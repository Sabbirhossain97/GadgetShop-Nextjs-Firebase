import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Context } from '../../context'
import Navbar from '../../components/Navigation/Navbar'
import Footer from '../../components/Footer/Footer'
import products from "../../products.json"
import addToWishlist from '../../services/wishlist/addToWishlist'
import { Pagination } from 'antd';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";
import { Spin, Slider } from 'antd';
import { IoFilterSharp } from "react-icons/io5";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { message } from 'antd'
import addToCart from '../../services/cart/addToCart'

function Products() {
    const { isAuth, sidebar } = useContext(Context);
    const [user] = isAuth;
    const [, setIsCartSidebarOpen] = sidebar;
    const [productList, setProductList] = useState(products);
    const [filters, setFilters] = useState({
        sortBy: "",
        category: [],
        priceRange: { min: 0, max: 5000 }
    })
    const [isFilterActive, setIsFilterActive] = useState(false)
    const [categories, setCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [loading, setLoading] = useState(false)
    const [localPriceRange, setLocalPriceRange] = useState([0, 5000]);
    const [sidebarFilter, setSidebarFilter] = useState(false)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);
    const router = useRouter();

    const onChange = (page) => {
        setLoading(true)
        setTimeout(() => {
            setCurrentPage(page);
            setLoading(false)
        }, 1500)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const priceRangeChange = (value) => {
        setLocalPriceRange(value)
        setFilters((prevFilters) => (
            {
                ...prevFilters,
                priceRange: {
                    min: value[0],
                    max: value[1]
                }
            }
        ))
    }

    useEffect(() => {
        setFilters((prevFilters) => (
            {
                ...prevFilters,
                priceRange: {
                    min: localPriceRange[0],
                    max: localPriceRange[1]
                }
            }
        ))
    }, [localPriceRange]);

    const handleInputChange = (index, event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            const newPriceRange = [...localPriceRange];
            newPriceRange[index] = newValue;
            if (index === 0 && newValue <= localPriceRange[1]) {
                setLocalPriceRange(newPriceRange);
                setFilters((prevFilters) => (
                    {
                        ...prevFilters,
                        priceRange: {
                            min: newValue,
                            max: localPriceRange[1]
                        }
                    }
                ))
            } else if (index === 1 && newValue >= localPriceRange[0]) {
                setLocalPriceRange(newPriceRange);
                setFilters((prevFilters) => (
                    {
                        ...prevFilters,
                        priceRange: {
                            min: localPriceRange[0],
                            max: newValue
                        }
                    }
                ))
            }
        }
    };

    useEffect(() => {
        const allCategories = [];
        products.forEach(product => {
            if (!allCategories.includes(product.category)) {
                allCategories.push(product.category);
            }
        });
        setCategories(allCategories)
    }, [])

    const handleCategory = (e) => {
        if (e.target.checked) {
            setFilters({ ...filters, category: [...filters.category, e.target.value] })
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                category: prevFilters.category.filter(category => category !== e.target.value)
            }))
        }
    }

    const handleSort = (e) => {
        setFilters((prevFilters) => (
            {
                ...prevFilters,
                sortBy: e.target.value
            }
        ))
    }

    const applyFilters = useCallback(() => {
        let filtered = products;

        filtered = filtered.filter(product =>
            product.price >= localPriceRange[0] && product.price <= localPriceRange[1]
        );

        if (filters.category.length > 0) {
            filtered = filtered.filter(product =>
                filters.category.includes(product.category)
            );
        }

        if (filters.sortBy === "asc") {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === "desc") {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }

        setProductList(filtered)

    }, [products, filters, localPriceRange])

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            applyFilters();
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [filters, applyFilters]);

    const handleCartAdd = (e, user, item, router) => {
        e.stopPropagation();
        addToCart(setIsCartSidebarOpen, user, item, router);
    }

    const clearFilters = () => {
        setTimeout(() => {
            setFilters({
                sortBy: "",
                category: [],
                priceRange: { min: 0, max: 5000 }
            })
            setLocalPriceRange([0, 5000])
            setProductList(products)
            message.success("All filters cleared!")
        }, 1500)
    }

    const goToSingleProduct = (id) => {
        router.push(`/SingleProduct/${id}`);
    };

    useEffect(() => {
        if (filters.sortBy === "" && filters.category.length === 0 && filters.priceRange.min === 0 && filters.priceRange.max === 5000) {
            setIsFilterActive(false)
        } else {
            setIsFilterActive(true)
        }
    }, [filters])

    return (
        <div>
            <Navbar />
            <div className="min-h-screen">
                <div className="bg-white">
                    <div>
                        {/* mobile screen filter */}
                        {sidebarFilter && <div className={`fixed inset-0 z-20 opacity-25`}></div>}
                        <div className={`${sidebarFilter ? "translate-x-0" : "translate-x-full"} fixed top-0 bottom-0 right-0 z-40 transition duration-300 h-full overflow-y-auto bg-white py-4 pb-12 shadow-xl`}>
                            <div className='w-[300px] '>
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button onClick={() => setSidebarFilter(!sidebarFilter)} type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:text-blue-500">
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-4 border-t border-gray-200">
                                    {/* price range section */}
                                    <div className="border-b border-gray-200 py-6 px-4">
                                        <h3 className="-my-3 flow-root">
                                            <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                <span className="font-medium text-gray-900">Price Range</span>
                                            </button>
                                        </h3>
                                        <div className="pt-2" >
                                            <div className="space-y-4">
                                                <Slider
                                                    range
                                                    min={0}
                                                    max={5000}
                                                    defaultValue={[0, 5000]}
                                                    value={localPriceRange}
                                                    styles={{
                                                        track: {
                                                            background: "rgb(59,130,246)"
                                                        }
                                                    }}
                                                    onChange={priceRangeChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-between py-4'>
                                            <input
                                                min={0}
                                                max={5000}
                                                value={localPriceRange[0]}
                                                onChange={(event) => handleInputChange(0, event)}
                                                className='w-[100px] border border-gray-200 rounded-md text-center py-1' />
                                            <input
                                                min={0}
                                                max={5000}
                                                value={localPriceRange[1]}
                                                onChange={(event) => handleInputChange(1, event)}
                                                className='w-[100px] border border-gray-200 rounded-md text-center py-1' />
                                        </div>
                                    </div>

                                    {/* category section */}
                                    <div className="border-b border-gray-200 py-6 px-4">
                                        <h3 className="-my-3 flow-root">
                                            <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                <span className="font-medium text-gray-900">Category</span>
                                            </button>
                                        </h3>
                                        <div className="pt-6" id="filter-section-1">
                                            <div className="space-y-4">
                                                {categories.map((category, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <input onChange={(e) => handleCategory(e)} id={`filter-category-${index}`} name="category" value={category} checked={filters.category.includes(category)} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for={`filter-category-${index}`} className="ml-3 text-sm text-gray-600">{category}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-200 py-6 px-4">
                                        <h3 className="-my-3 flow-root">
                                            <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                <span className="font-medium text-gray-900">Sort By</span>
                                            </button>
                                        </h3>
                                        <div className="pt-6" id="filter-section-1">
                                            <div className="space-y-4">
                                                <div className="flex items-center">
                                                    <input onChange={(e) => handleSort(e)} id="filter-category-asc" name="sortBy" value="asc" type="radio" checked={filters.sortBy === 'asc'} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label for="filter-category-asc" className="ml-3 text-sm text-gray-600">Price: Low to High</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input onChange={(e) => handleSort(e)} id="filter-category-desc" name="sortBy" value="desc" type="radio" checked={filters.sortBy === 'desc'} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label for="filter-category-desc" className="ml-3 text-sm text-gray-600">Price: High to Low</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {isFilterActive && <div className='py-6 px-4'>
                                        <button onClick={clearFilters} className="w-full mt-4 bg-red-500 hover:bg-red-700 px-2 transition duration-300 text-white font-semibold py-2 rounded-md">
                                            Clear all filters
                                        </button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        {/* mobile screen filter end */}
                        <main className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
                            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">All Products</h1>
                                <button onClick={() => setSidebarFilter(!sidebarFilter)} className='hover:text-blue-500 transition duration-300'>
                                    <h1 className='text-xl lg:hidden flex items-center gap-2'>Filters <IoFilterSharp /></h1>
                                </button>
                            </div>
                            <section className="pb-24 pt-6 ">
                                <h2 id="products-heading" className="sr-only">Products</h2>
                                <div className=" grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
                                    <div className="hidden lg:block">
                                        <h3 className="sr-only">Categories</h3>
                                        <div className="border-b border-gray-200 py-6 ">
                                            <h3 className="-my-3 flow-root">
                                                <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                    <span className="font-medium text-gray-900">Price Range</span>
                                                </button>
                                            </h3>
                                            <div className="pt-2" id="filter-section-1">
                                                <div className="space-y-4">
                                                    <Slider
                                                        range
                                                        min={0}
                                                        max={5000}
                                                        defaultValue={[0, 5000]}
                                                        value={localPriceRange}
                                                        styles={{
                                                            track: {
                                                                background: "rgb(59,130,246)"
                                                            }
                                                        }}
                                                        onChange={priceRangeChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-between py-4'>
                                                <input
                                                    min={0}
                                                    max={5000}
                                                    value={localPriceRange[0]}
                                                    onChange={(event) => handleInputChange(0, event)}
                                                    className='w-[100px] border border-gray-200 rounded-md text-center py-1' />
                                                <input
                                                    min={0}
                                                    max={5000}
                                                    value={localPriceRange[1]}
                                                    onChange={(event) => handleInputChange(1, event)}
                                                    className='w-[100px] border border-gray-200 rounded-md text-center py-1' />
                                            </div>
                                        </div>

                                        <div className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                    <span className="font-medium text-gray-900">Category</span>
                                                </button>
                                            </h3>
                                            <div className="pt-6" id="filter-section-1">
                                                <div className="space-y-4">
                                                    {categories.map((category, index) => (
                                                        <div key={index} className="flex items-center">
                                                            <input onChange={(e) => handleCategory(e)} id={`filter-category-${index}`} name="category" value={category} checked={filters.category.includes(category)} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                            <label for={`filter-category-${index}`} className="ml-3 text-sm text-gray-600">{category}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                    <span className="font-medium text-gray-900">Sort By</span>
                                                </button>
                                            </h3>
                                            <div className="pt-6" id="filter-section-1">
                                                <div className="space-y-4">
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => handleSort(e)} id="filter-category-asc" name="sortBy" value="asc" type="radio" checked={filters.sortBy === 'asc'} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-category-asc" className="ml-3 text-sm text-gray-600">Price: Low to High</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => handleSort(e)} id="filter-category-desc" name="sortBy" value="desc" type="radio" checked={filters.sortBy === 'desc'} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="filter-category-desc" className="ml-3 text-sm text-gray-600">Price: High to Low</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {isFilterActive && <div className='py-6'>
                                            <button onClick={clearFilters} className="w-full mt-4 bg-red-500 hover:bg-red-700 px-2 transition duration-300 text-white font-semibold py-2 rounded-md">
                                                Clear all filters
                                            </button>
                                        </div>}
                                    </div>

                                    <div className={`${loading && "opacity-75"} relative grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-y-8 gap-x-2 col-span-3`}>
                                        {loading ? <div className='absolute top-1/2 left-1/2 '>
                                            <Spin size='large' />
                                        </div> : ""}
                                        {currentItems.length > 0
                                            ? currentItems.map((item, key) => (
                                                <div
                                                    key={key}
                                                    onClick={() => goToSingleProduct(item.id)}
                                                    className="cursor-pointer relative mx-auto p-4 group border rounded-lg shadow-lg md:w-11/12 w-3/4 h-96 hover:shadow-xl transition duration-300 flex flex-col items-center justify-center"
                                                >
                                                    <div
                                                        className="flex flex-col items-center justify-center"
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
                                                    <div className="flex flex-col w-[150px] relative ">
                                                        <button
                                                            onClick={(e) => handleCartAdd(e, user, item, router)}
                                                            className="w-full mt-4 bg-slate-800 hover:bg-slate-700 px-2  text-white font-bold py-2 rounded-md"
                                                        >
                                                            <p className="text-sm flex flex-row justify-around">
                                                                <span>Add to cart </span>
                                                                <span>
                                                                    <AiOutlineShoppingCart className="mt-1 absolute right-4" />
                                                                </span>
                                                            </p>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addToWishlist(user, item, router);
                                                            }}
                                                            className="w-full mt-4 px-2  text-black font-semibold border hover:bg-gray-200 py-2 rounded-md transition duration-300"
                                                        >
                                                            <p className="text-sm flex flex-row justify-around items-center">
                                                                <span>Add to wishlist </span>
                                                                <span>
                                                                    <FaRegHeart />
                                                                </span>
                                                            </p>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <div className=' col-span-full flex flex-col gap-4 justify-center items-center'>
                                                <BsFillEmojiFrownFill className='text-8xl' />
                                                <h1 className='text-xl'>No products found!</h1>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </section>
                            <div className='flex justify-center mb-20'>
                                <Pagination
                                    onChange={onChange}
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    total={productList.length}
                                />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Products