import Header from "../components/Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../ApiService/Baseurl";

import { useCart } from "../context/CartContext";

import {
  ChevronLeft,
  ChevronRight,
  Check,
  Truck,
  ShieldCheck,
  Zap,
  X,
  ShoppingCart,
} from "lucide-react";
import React from "react";


export default function Product() {
  const { addToCart } = useCart();

  const { id } = useParams();
const [product, setProduct] = useState(null);
useEffect(() => {
  axios
    .get(`https://localhost:7058/api/ProductApi/GetProductById/${id}`)
    .then((res) => {
      setProduct(res.data);
    })
    .catch((err) => console.log(err));
}, [id]);


if (!product) {
  return (
    <>
      <Header />
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
      <Footer />
    </>
  );
}
  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}

          <div>

            {/* Main Image */}

            <div className="relative bg-white rounded-3xl h-[560px] flex justify-center items-center">

              <button className="absolute left-0 lg:-left-8 bg-white shadow-md w-12 h-12 rounded-full flex justify-center items-center">
                <ChevronLeft size={22} />
              </button>

              <img
                src={`${BASE_URL}${product.productImage}`}
                alt={product.productName}
                className="h-[470px] object-contain"
              />

              <button className="absolute right-0 lg:-right-8 bg-white shadow-md w-12 h-12 rounded-full flex justify-center items-center">
                <ChevronRight size={22} />
              </button>

            </div>

            {/* Thumbnail */}

            <div className="flex justify-center gap-4 mt-8">

              {[1,2,3,4,5,6].map((item)=>(
                <div
                  key={item}
                  className="w-20 h-20 rounded-xl border bg-white flex items-center justify-center cursor-pointer hover:border-black"
                >
                  <img
                     src={`${BASE_URL}${product.productImage}`}
                alt={product.productName}
                    className="h-14"
                  />
                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <h1 className="text-4xl font-bold">
             {product.productName}
            </h1>

            <div className="flex items-center gap-4 mt-5">

              <span className="text-4xl font-bold">
               ₹{product.discountPrice}
              </span>

              <span className="line-through text-xl text-gray-400">
                ₹{product.price}
              </span>

            </div>

            {/* Size */}

            <div className="mt-10">

              <p className="uppercase tracking-wider text-sm">
                Select Size
              </p>

              <div className="flex gap-4 mt-5">

                <button className="border rounded-full px-8 py-3">
                  15 Tabs
                </button>

                <button className="rounded-full px-8 py-3 bg-yellow-100 border border-yellow-500">
                  30 Tabs
                </button>

              </div>

            </div>

            {/* Features */}

            <div className="mt-10 space-y-5 text-lg">

              {[
                "Supports Overall Health",
                "Strong Muscles & Bones",
                "Heart Health & Immunity",
                "Helps Reduce Tiredness & Fatigue",
              ].map((item)=>(
                <div className="flex gap-4 items-center" key={item}>
                  <Check className="text-black" size={20}/>
                  <span>{item}</span>
                </div>
              ))}

            </div>

            {/* Services */}

            <div className="grid grid-cols-4 mt-12 text-center gap-5">

              <div>
                <Truck className="mx-auto mb-2"/>
                <p className="text-sm">
                  Free Delivery
                </p>
              </div>

              <div>
                <ShieldCheck className="mx-auto mb-2"/>
                <p className="text-sm">
                  Secure Payment
                </p>
              </div>

              <div>
                <Zap className="mx-auto mb-2"/>
                <p className="text-sm">
                  Fast Delivery
                </p>
              </div>

              <div>
                <X className="mx-auto mb-2"/>
                <p className="text-sm">
                  Non Returnable
                </p>
              </div>

            </div>

            {/* Button */}

            <button className="mt-12 w-full bg-black hover:bg-gray-900 transition text-white  rounded-full flex justify-center items-center gap-3 text-lg"
            onClick={() => addToCart(product)}
            >

              <ShoppingCart size={22}/>
              Add to Cart
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}