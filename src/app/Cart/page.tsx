"use client";
import { getFavs, getinCart } from "@/utils/addTo";
import {useAppSelector, useAppDispatch} from "@/Hooks/reduxHooks";
import { getProductsByIds } from "@/data/reducers/ProductReducers";
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";

function page() {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products.selectedProductsState);
  const favs = getFavs();
  // const incart = getinCart();
  const [Cart, setCart] = useState<number[]>(getinCart());

  useEffect(() => {
    dispatch(getProductsByIds(Cart));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByIds(Cart)); // even if empty
  }, [dispatch, Cart]);


  let content;
  
  if (status === 'loading') {
    content = (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        <p className="text-center text-xl text-gray-700 mt-4">Loading your favorites...</p>
      </div>
    );
  } else if (status === 'failed') {
    content = (
      <div className="flex flex-col items-center justify-center p-10 rounded-lg border border-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-center text-xl text-red-700 mt-4 font-semibold">An error occurred</p>
        <p className="text-center text-sm text-red-500 mt-2">{error}</p>
      </div>
    );
  } else if (products.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center p-10 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H18.6L22 13M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m0-4h18" />
        </svg>
        <p className="text-center text-xl text-gray-500 mt-4 font-semibold">Your cart is empty</p>
        <p className="text-center text-sm text-gray-400 mt-2">Time to find something you love!</p>
      </div>
    );
  } else {
    content = (
      <div className="p-10 flex flex-row flex-wrap gap-4 justify-center max-w-7xl mx-auto">
        {products.map((product) => (
          <Card 
            key={product.id}
            product = {product}
            height={380}
            width={250}
            isFav={favs? favs.includes(product.id) : false}
            inCart={Cart.includes(product.id)}
            onInCartToggle={() => setCart(getinCart())}
          />
        ))}
      </div>    
    );
  }

  return (
    <div className="container mx-auto">
      {content}
    </div>
  );
}

export default page;