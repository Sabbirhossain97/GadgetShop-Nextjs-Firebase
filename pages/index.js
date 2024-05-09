import React from "react";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Carousel from "../components/Carousel";
import Shop from "../pages/Shop";
import FeaturedCategories from "../components/FeaturedCategories";
import Hero from "../components/Hero";
import Subnavbar from "../components/Subnavbar";

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
          <div className="mt-16 mx-auto">
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

