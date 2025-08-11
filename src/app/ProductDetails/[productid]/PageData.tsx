"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Hooks/reduxHooks";
import { getProductById } from "@/data/reducers/ProductReducers";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

export default function PageData({ productid }: { productid: Number }) {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.selectedProductState.product);


  useEffect(() => {
    dispatch(getProductById(Number(productid)));
  }, [dispatch, productid]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 lg:p-12 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group h-full">
          <Image
            src={product.imagePath}
            alt={product.title}
            fill
            className="rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 object-cover"
          />
        </div>
        <div className="flex flex-col justify-between min-h-100">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{product.title}</h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-2xl md:text-3xl font-semibold text-indigo-600">${product.price}</p>
              <p className="text-sm md:text-base text-gray-500 mt-2 sm:mt-0">
                Category: <span className="font-medium">{product.category}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isFavorited
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? "fill-red-600 text-red-600" : "text-gray-500"}`}
              />
              {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <button
              onClick={() => setInCart(!inCart)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                inCart
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <ShoppingCart
                className={`w-5 h-5 ${inCart ? "fill-blue-600 text-blue-600" : "text-white"}`}
              />
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}