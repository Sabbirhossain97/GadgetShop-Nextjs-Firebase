import React from "react";

export default function FeaturedCategories() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-16 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-3xl font-bold title-font text-gray-900">
              Featured Categories
            </h1>
          </div>
          <div className="flex flex-wrap -m-4 text-center">
            {[
              "TV",
              "Monitors",
              "Motherboard",
              "Processor",
              "Ram",
              "Storage",
              "GPU",
              "Headphones",
              "Console",
              "Phone",
            ].map((item, key) => (
              <div key={key} className="p-4 md:w-1/5 w-1/2 ">
                <div className="border-2 border-gray-200 px-3 py-3 rounded-lg">
                  <img src={`assets/categories/${item}.png`} />
                  <h2 className="title-font font-medium text-md text-gray-900">
                    {item}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
