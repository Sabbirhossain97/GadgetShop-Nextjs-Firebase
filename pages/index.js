import React from "react";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Carousel from "../components/Carousel";
import Shop from "../pages/Shop";
import FeaturedCategories from "../components/FeaturedCategories";
import Hero from "../components/Hero";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Ecommerce</title>
        <meta property="og:title" content="Ecommerce" key="title" />
        <link type="image/png" rel="icon" href="/favicon.ico" />
      </Head>
      <div >
        <div className="bg-white ">
          <header>
            <div>
              <Navbar />
            </div>
          </header>

          <div className=" mx-auto">
            <Carousel />
            <FeaturedCategories />
            <Shop />
            <Features />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

