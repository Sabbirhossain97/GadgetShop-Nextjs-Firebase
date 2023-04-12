import React from "react";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Head from "next/head";
import Cookies from "js-cookie";

export default function Home({ cookie }) {
  return (
    <div>
      <Head>
        <title>Ecommerce</title>
        <meta property="og:title" content="Ecommerce" key="title" />
        <link type="image/png" rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-inter">
        <div className="bg-white ">
          <header>
            <div>
              <Navbar />
            </div>
          </header>
         
          <div className="mt-44">
            <Products />
            <Features />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const getCookie= 5
  return {
    props: { cookie: getCookie },
  };
}
