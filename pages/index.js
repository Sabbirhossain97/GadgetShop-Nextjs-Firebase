import React from "react";
import Footer from "../components/Footer/Footer";
import Features from "../components/Features/Features";
import Navbar from "../components/Navigation/Navbar";
import Head from "next/head";
import Carousel from "../components/Hero/Carousel";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import FeaturedCategories from "../components/FeaturedCategories/FeaturedCategories";
import Subnavbar from "../components/Navigation/Subnavbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>GadgetShop</title>
        <meta property="og:title" content="Ecommerce" key="title" />
        <link type="image/png" rel="icon" href="/favicon.ico" />
      </Head>
      <div >
        <div>
          <Navbar />
          <Subnavbar />
          <div className="mx-auto">
            <Carousel />
            <FeaturedCategories />
            <FeaturedProducts />
            <Features />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

