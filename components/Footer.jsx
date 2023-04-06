import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 ">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Company</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Categories</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-white">
                Electronics
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Clothing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Books
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Help & Support</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-white">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2023 My E-commerce Site. All rights reserved.</p>
      </div>
    </footer>
  );
}
