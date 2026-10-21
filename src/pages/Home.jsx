import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import Category from "./ShowCategories"
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import BASE_URL from "../ApiService/Baseurl";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button
} from "reactstrap";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {

  const { addToCart } = useCart();
  const [sections, setSections] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
   
  

    // sections
    axios
      .get("https://localhost:7017/api/Section/GetSectionWithProducts")
      .then((res) => {

        console.log("SECTION DATA:", res.data);

        const sectionData = JSON.parse(res.data.sections);
        const productData = JSON.parse(res.data.products);

        const groupedSections = sectionData.map((section) => ({
          ...section,

          products: productData.filter(
            (product) => product.SectionId === section.SectionId
          )
        }));

        console.log("GROUPED SECTIONS:", groupedSections);

        setSections(groupedSections);
      })
      .catch((err) => {
        console.log(err);
      });



    axios
      .get("https://localhost:7058/api/ProductApi/GetBanners")
      .then((res) => {
        setBanners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div className="overflow-x-hidden">
      <Header />

      {/* Swiper Banner Responsive container */}
      <div className="w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-48 sm:h-72 md:h-96 lg:h-[450px]"
        >
          {banners.map((banner, index) => (

            <SwiperSlide key={index} className="w-full h-full flex items-center justify-center">

              <img
                src={`https://localhost:7058${banner}`}
                className="w-full h-full object-cover"
                alt={`Banner ${index + 1}`}
              />

            </SwiperSlide>

          ))}
        </Swiper>
      </div>


  
<Category />


    {sections
  .filter((section) => section.IsActive)
  .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
  .map((section) => (
    <div key={section.SectionId} className="text-center w-full max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="my-4 text-left text-xl sm:text-2xl font-bold text-gray-800 ml-2 sm:ml-4">
        {section.SectionName}
      </h2>

      <div className="flex flex-nowrap overflow-x-auto my-5 px-2 sm:px-3 space-x-4 sm:space-x-6 scrollbar-thin pb-4">
        {section.products?.map((product) => (
          <div
            key={product.ProductId}
            className="group relative w-[260px] sm:w-[310px] flex-shrink-0 bg-[#eceeee] hover:bg-[#e0f2fe] border-2 border-transparent hover:border-blue-500 rounded-[20px] p-3 sm:p-4 text-left transition-all duration-300 ease-in-out hover:-translate-y-1 shadow-sm"
          >
            {/* Image Container with Hover Swap */}
           <Link to={`/product/${product.ProductId}`}>
  <div className="relative h-[180px] w-full overflow-hidden rounded-2xl bg-white">
    {/* Product Image */}
    <img
      src={`${BASE_URL}${product.ProductImage}`}
      alt={product.ProductName}
      className="h-full w-full object-contain"
    />
  </div>
</Link>

            {/* Product Body */}
            <div className="pt-3 pb-0">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate">
                {product.ProductName}
              </h3>

              {/* Price Row */}
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  ₹{product.DiscountPrice || product.Price}
                </span>
                {product.DiscountPrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ₹{product.Price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500  line-clamp-2">
                {product.ProductDescription}
              </p>

              {/* Add To Cart Button with Shine Effect */}
              <button
                onClick={() => addToCart(product)}
                className="relative w-full overflow-hidden rounded-full bg-gray-900 py-2 sm:py-2.5 px-4 font-semibold text-white transition-colors duration-300 hover:bg-black flex items-center justify-center space-x-2 group/btn text-sm sm:text-base"
              >
                {/* Left-to-Right Shine Element */}
                <span className="absolute -top-1/2 -left-[75%] h-[200%] w-[50%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 ease-in-out group-hover/btn:left-[125%]" />

                {/* Cart Icon Bubble */}
                <span className="flex items-center justify-center rounded-full bg-white/15 p-1 text-xs">
                  🛒
                </span>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}








      <div className="mx-auto w-[92%] sm:w-[90%] my-8 bg-gray-100 rounded-2xl sm:rounded-full px-4 sm:px-6 py-6 md:px-12 md:py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center text-center sm:text-left">

          {/* Badge 1 */}

          <div className="flex items-center gap-4 justify-center sm:justify-start">

            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-xl flex-shrink-0">
              👤
            </div>

            <p className="text-sm">

              <span className="font-semibold">
                #1 Multivitamin brand
              </span>

              <br />

              in the world

            </p>

          </div>


          {/* Badge 2 */}

          <div className="flex items-center gap-4 justify-center sm:justify-start">

            <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white text-xl flex-shrink-0">
              ✨
            </div>

            <p className="text-sm">

              Sold in{" "}

              <span className="font-semibold">
                65+ countries
              </span>

            </p>

          </div>


          {/* Badge 3 */}

          <div className="flex items-center gap-4 justify-center sm:justify-start">

            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl flex-shrink-0">
              🧠
            </div>

            <p className="text-sm">

              Backed by{" "}

              <span className="font-semibold">
                40 years
              </span>

              <br />

              of nutritional science

            </p>

          </div>


          {/* Badge 4 */}

          <div className="flex items-center gap-4 justify-center sm:justify-start">

            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl flex-shrink-0">
              🍎
            </div>

            <p className="text-sm">

              Made in India{" "}

              <span className="font-semibold">

                customised

                <br />

                for the Indian RDA

              </span>

            </p>

          </div>

        </div>

      </div>



      <Footer />

    </div>
  );
}