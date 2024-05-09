import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { specialDeals } from '../helpers/helpers';
import { DateRange } from '../components/SvgComponents/SVG';
import Subnavbar from '../components/Subnavbar';

function SpecialDeals() {
    console.log(specialDeals.map((deal) => {
        return {
            image: deal.img
        }
    }))
    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen max-w-[1500px] mx-auto py-20'>
                <div className={`py-20 relative gap-x-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-y-8 col-span-3`}>

                    {specialDeals.map((deal, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg drop-shadow-lg">
                            <div className="relative ">
                                <img className="w-full  object-cover h-[200px]" src={`/assets/specialDeals/${deal.img}.png`} alt="Product Image" />
                            </div>
                            <div className="p-4 ">
                                <h3 className="text-lg text-center font-medium mb-2">{deal.title}</h3>
                                <p className="flex justify-center items-center gap-2 font-medium mb-2 py-2"><DateRange />{deal.timeline}</p>
                                <div className="flex items-center justify-center py-2">
                                    <button className="text-white transition duration-300 bg-gradient-to-r bg-slate-800 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-10 py-2.5 text-center me-2 mb-2">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SpecialDeals