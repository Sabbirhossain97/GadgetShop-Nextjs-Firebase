import React from "react";
import Footer from "../components/Footer/Footer";
import Features from "../components/Features";
import Navbar from "../components/Navigation/Navbar";
import Head from "next/head";
import Carousel from "../components/Hero/Carousel";
import Shop from "../pages/Shop";
import FeaturedCategories from "../components/FeaturedCategories";
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
            <Shop />
            <Features />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

